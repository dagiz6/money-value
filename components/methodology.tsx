import React from 'react';

export function Methodology() {
  return (
    <section
      id="methodology"
      className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto rounded-2xl border border-emerald-800/40 bg-[#081f1c]/90 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl"
    >
      <div className="w-full">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-700/40 mb-3">
            <span>DATA INTEGRITY &amp; FORMULAS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Calculation Methodology &amp; Principles
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/60 mt-1.5 leading-relaxed">
            How purchasing power equivalents are computed using nationwide consumer price indices.
          </p>
        </div>

        <div className="space-y-8 text-sm text-emerald-100/80 leading-relaxed">
          {/* What is Inflation & CPI */}
          <div className="text-center max-w-3xl xl:max-w-4xl mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              What is Inflation &amp; the Consumer Price Index (CPI)?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed">
              Inflation measures how the general price level of consumer goods and services changes over time.
              As average prices rise, each unit of currency buys a smaller quantity of goods and services.
              The <strong className="text-white">Consumer Price Index (CPI)</strong> tracks the cost of a standardized market basket of typical consumer purchases (including food, housing, transportation, medical care, and clothing) across successive years.
            </p>
          </div>

          {/* Mathematical Formula */}
          <div className="max-w-3xl xl:max-w-4xl mx-auto text-center">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              How the Calculation is Performed
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mb-4">
              To determine what an amount in a past year is worth in a later year, the ratio of the ending CPI to starting CPI is applied:
            </p>

            <div className="bg-[#051412] p-5 rounded-xl font-mono text-xs sm:text-sm border border-emerald-900/60 space-y-2.5 text-emerald-100 text-center shadow-inner">
              <div>
                <span className="text-emerald-400 font-bold">Adjusted Amount</span> = Original Amount × (Ending CPI / Starting CPI)
              </div>
              <div>
                <span className="text-emerald-400 font-bold">Total Inflation</span> = ((Ending CPI / Starting CPI) - 1) × 100%
              </div>
              <div>
                <span className="text-emerald-400 font-bold">Purchasing Power Change</span> = ((Starting CPI / Ending CPI) - 1) × 100%
              </div>
            </div>
          </div>

          {/* Critical Distinction */}
          <div className="max-w-3xl xl:max-w-4xl mx-auto p-4 sm:p-5 rounded-xl bg-amber-950/25 border border-amber-800/40 text-amber-200 text-center">
            <div className="inline-flex items-center justify-center gap-1.5 font-bold text-sm mb-2 text-amber-100">
              <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span>Important Distinction: Inflation vs. Foreign Exchange Rates</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              This calculator measures changes in domestic purchasing power within each respective currency: ETB calculations strictly use the Ethiopian Consumer Price Index, while USD calculations use the United States Consumer Price Index. It does <strong className="text-amber-100">not</strong> convert ETB to USD, nor does it track foreign currency exchange rates, investment yields, wage growth, or specific asset prices like real estate or stocks.
            </p>
          </div>

          {/* Sourcing & Dataset Integrity */}
          <div className="max-w-3xl xl:max-w-4xl mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 text-center">
              Official Data Sources &amp; Coverage
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-4 sm:p-5 rounded-xl border border-emerald-900/50 bg-[#061816]/80 shadow-md">
                <div className="font-bold text-white text-sm pb-2 border-b border-emerald-900/40 mb-2 flex items-center justify-between">
                  <span>Ethiopia (ETB)</span>
                  <span className="text-base" aria-hidden="true">🇪🇹</span>
                </div>
                <div className="text-xs text-emerald-200/70 space-y-1.5">
                  <div><strong className="text-emerald-100">Source:</strong> World Bank Open Data &amp; IMF IFS</div>
                  <div><strong className="text-emerald-100">National Authority:</strong> Ethiopian Statistical Service (ESS)</div>
                  <div><strong className="text-emerald-100">Base Index:</strong> 2010 = 100</div>
                  <div><strong className="text-emerald-100">Coverage:</strong> 1965 – 2025 (Annual)</div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-emerald-900/50 bg-[#061816]/80 shadow-md">
                <div className="font-bold text-white text-sm pb-2 border-b border-emerald-900/40 mb-2 flex items-center justify-between">
                  <span>United States (USD)</span>
                  <span className="text-base" aria-hidden="true">🇺🇸</span>
                </div>
                <div className="text-xs text-emerald-200/70 space-y-1.5">
                  <div><strong className="text-emerald-100">Source:</strong> World Bank Open Data &amp; U.S. BLS</div>
                  <div><strong className="text-emerald-100">National Authority:</strong> U.S. Bureau of Labor Statistics (BLS)</div>
                  <div><strong className="text-emerald-100">Base Index:</strong> 2010 = 100</div>
                  <div><strong className="text-emerald-100">Coverage:</strong> 1960 – 2025 (Annual)</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-200/50 mt-4 text-center">
              Datasets are verified against primary records. Years with missing or preliminary data are omitted to maintain strict mathematical integrity rather than relying on unverified estimates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
