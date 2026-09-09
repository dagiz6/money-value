import React from 'react';
import aj, { getClientIp } from '../lib/arcjet';
import { request } from '@arcjet/next';
import { Header } from '../components/header';
import { InflationCalculator } from '../components/inflation-calculator';
import { Methodology } from '../components/methodology';
import { Footer } from '../components/footer';

export default async function Home() {
  // Protect root page with Arcjet rate limiting
  const req = await request();
  const clientIp = getClientIp(req.headers);
  const decision = await aj.protect(req, clientIp ? { ipSrc: clientIp } : undefined);

  if (decision.isDenied()) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#061513] text-slate-100 font-sans">
        <Header />

        <main className="flex-1 flex items-center justify-center p-6 my-12">
          <div className="max-w-md w-full rounded-2xl border border-amber-500/40 bg-[#09201d]/95 backdrop-blur-xl p-8 text-center space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <div className="space-y-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                HTTP 429 · Arcjet Rate Limit
              </span>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Rate Limit Exceeded
              </h1>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                You have exceeded the allowed limit of requests per minute for TrueWorth.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-200/90 text-xs leading-relaxed">
              Arcjet security has temporarily rate-limited your IP to prevent automated scraping and abuse.
            </div>

            <div className="pt-2 text-xs text-emerald-400/80 font-mono">
              Please wait about a minute before refreshing the page.
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main
        id="main-content"
        className="flex-1 max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
      >
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-5 pt-4">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider text-emerald-200/90 bg-emerald-950/60 border border-emerald-700/40 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span>VERIFIED CPI DATASETS · 1960 – 2025</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            What was your money
            <span className="block mt-1 bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              really worth?
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-emerald-100/70 max-w-xl mx-auto leading-relaxed">
            Measure how inflation eroded the purchasing power of{' '}
            <strong className="font-semibold text-white">Ethiopian Birr</strong> and{' '}
            <strong className="font-semibold text-white">US Dollars</strong> across
            decades of history.
          </p>

          {/* Centered Decorative Range Indicator */}
          <div className="flex items-center justify-center gap-4 pt-1 text-[11px] tracking-widest text-emerald-400/50 uppercase font-medium">
            <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-emerald-800/60" />
            <span>ETB • USD • 1960 – 2025</span>
            <span className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-emerald-800/60" />
          </div>
        </section>

        {/* Primary Interactive Calculator (Wide on Large Screens) */}
        <InflationCalculator />

        {/* Methodology & Authoritative Sourcing (Wide on Large Screens) */}
        <Methodology />
      </main>

      <Footer />
    </div>
  );
}
