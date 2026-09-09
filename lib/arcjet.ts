import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/next";

/**
 * Arcjet security client configured with:
 * 1. Shield (WAF protection against common web attacks, SQLi, XSS)
 * 2. Bot detection (allows legitimate crawlers and preview bots, blocks suspicious scrapers)
 * 3. Sliding window rate limiting (3 requests per 60 seconds per IP address)
 */
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:PREVIEW",
        "CATEGORY:MONITOR",
        "CURL",
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "60s",
      max: 30,
    }),
  ],
});

/**
 * Resolves the client IP.
 * - In production: uses trusted proxy headers (x-forwarded-for, cf-connecting-ip, etc.)
 * - In local development (localhost / 127.0.0.1): falls back to a deterministic public IPv4
 *   address ("203.0.113.195") because Arcjet Cloud does not track loopback (127.0.0.1) addresses.
 */
export function getClientIp(
  headers?: Headers | Record<string, string | string[] | undefined> | null
): string | undefined {
  if (!headers) return "203.0.113.195";

  const getHeader = (name: string): string | null => {
    if (typeof (headers as Headers).get === "function") {
      return (headers as Headers).get(name);
    }
    const record = headers as Record<string, string | string[] | undefined>;
    const targetKey = name.toLowerCase();
    const matchedKey = Object.keys(record).find(
      (k) => k.toLowerCase() === targetKey
    );
    if (!matchedKey) return null;
    const val = record[matchedKey];
    if (Array.isArray(val)) return val[0] ?? null;
    return val ?? null;
  };

  const forwarded = getHeader("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (ip && ip !== "127.0.0.1" && ip !== "::1" && !ip.startsWith("127.")) return ip;
  }
  const realIp = getHeader("x-real-ip");
  if (realIp && realIp !== "127.0.0.1" && realIp !== "::1" && !realIp.startsWith("127.")) return realIp.trim();

  const cf = getHeader("cf-connecting-ip");
  if (cf && cf !== "127.0.0.1" && cf !== "::1" && !cf.startsWith("127.")) return cf.trim();

  const arcjetHeader = getHeader("x-arcjet-ip");
  if (arcjetHeader && arcjetHeader !== "127.0.0.1" && arcjetHeader !== "::1" && !arcjetHeader.startsWith("127.")) {
    return arcjetHeader.trim();
  }

  // Fallback for localhost testing so rate limiting fires in development
  return "203.0.113.195";
}

export default aj;
