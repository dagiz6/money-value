import React from 'react';
import { Header } from '../components/header';
import { InflationCalculator } from '../components/inflation-calculator';
import { Methodology } from '../components/methodology';
import { Footer } from '../components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main id="main-content" className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100/70 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50 mb-1">
            <span>Verified CPI Datasets</span>
            <span>•</span>
            <span>1960 – 2025</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            What was your money <span className="text-teal-800 dark:text-teal-400">really worth?</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Estimate how inflation and consumer price changes have impacted the purchasing power of{' '}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">Ethiopian Birr (ETB)</strong> and{' '}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">US Dollars (USD)</strong> across historical eras.
          </p>
        </section>

        {/* Primary Interactive Calculator */}
        <InflationCalculator />

        {/* Methodology & Authoritative Sourcing */}
        <Methodology />
      </main>

      <Footer />
    </div>
  );
}
