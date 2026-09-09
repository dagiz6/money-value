import React from 'react';
import { Header } from '../components/header';
import { InflationCalculator } from '../components/inflation-calculator';
import { Methodology } from '../components/methodology';
import { Footer } from '../components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main id="main-content" className="flex-1 max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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
            <strong className="font-semibold text-white">US Dollars</strong> across decades of history.
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
