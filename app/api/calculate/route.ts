import { NextRequest, NextResponse } from "next/server";
import aj, { getClientIp } from "@/lib/arcjet";
import { calculateForYears } from "@/lib/inflation";
import { validateCalculationForm } from "@/lib/validation";
import { CurrencyCode } from "@/types/inflation";
import type { ArcjetDecision } from "@arcjet/next";

/**
 * Extracts rate limit headers from the Arcjet decision
 */
function getRateLimitHeaders(decision: ArcjetDecision): Headers {
  const headers = new Headers();
  const rlResult = decision.results.find((r) => r.reason.isRateLimit());
  if (rlResult && rlResult.reason.isRateLimit()) {
    headers.set("X-RateLimit-Limit", rlResult.reason.max.toString());
    headers.set("X-RateLimit-Remaining", rlResult.reason.remaining.toString());
    headers.set("X-RateLimit-Reset", rlResult.reason.reset.toString());
  }
  return headers;
}

export async function POST(req: NextRequest) {
  // Arcjet request protection & rate limiting with client IP resolution
  const clientIp = getClientIp(req.headers);
  const decision = await aj.protect(req, clientIp ? { ipSrc: clientIp } : undefined);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Too many calculation requests.",
          reason: "RATE_LIMIT",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            ...Object.fromEntries(getRateLimitHeaders(decision).entries()),
          },
        }
      );
    }

    return NextResponse.json(
      { error: "Access denied by security policy.", reason: "DENIED" },
      { status: 403 }
    );
  }

  if (decision.isErrored()) {
    // Fail-open: log error but do not block legitimate user traffic
    console.warn("Arcjet error:", decision.reason);
  }

  try {
    const body = await req.json();
    const { amount, fromYear, toYear, currency } = body;

    const validation = validateCalculationForm(
      amount,
      Number(fromYear),
      Number(toYear),
      currency as CurrencyCode
    );

    if (!validation.isValid || !validation.value) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400, headers: getRateLimitHeaders(decision) }
      );
    }

    const result = calculateForYears(
      validation.value.amount,
      validation.value.fromYear,
      validation.value.toYear,
      validation.value.currency
    );

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { headers: getRateLimitHeaders(decision) }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request payload" },
      { status: 400, headers: getRateLimitHeaders(decision) }
    );
  }
}

export async function GET(req: NextRequest) {
  // Arcjet request protection & rate limiting with client IP resolution
  const clientIp = getClientIp(req.headers);
  const decision = await aj.protect(req, clientIp ? { ipSrc: clientIp } : undefined);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Too many calculation requests.",
          reason: "RATE_LIMIT",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            ...Object.fromEntries(getRateLimitHeaders(decision).entries()),
          },
        }
      );
    }

    return NextResponse.json(
      { error: "Access denied by security policy.", reason: "DENIED" },
      { status: 403 }
    );
  }

  if (decision.isErrored()) {
    console.warn("Arcjet error:", decision.reason);
  }

  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount") || "10000";
  const fromYear = Number(searchParams.get("fromYear") || "2015");
  const toYear = Number(searchParams.get("toYear") || "2025");
  const currency = (searchParams.get("currency") || "ETB") as CurrencyCode;

  const validation = validateCalculationForm(amount, fromYear, toYear, currency);
  if (!validation.isValid || !validation.value) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.errors },
      { status: 400, headers: getRateLimitHeaders(decision) }
    );
  }

  const result = calculateForYears(
    validation.value.amount,
    validation.value.fromYear,
    validation.value.toYear,
    validation.value.currency
  );

  return NextResponse.json(
    {
      success: true,
      data: result,
      debug: {
        ip: decision.ip,
        results: decision.results,
        conclusion: decision.conclusion,
        reason: decision.reason,
      },
    },
    { headers: getRateLimitHeaders(decision) }
  );
}
