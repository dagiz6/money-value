import React from 'react';

export function Methodology() {
  return (
    <section
      id="methodology"
      className="rounded-2xl border border-emerald-800/40 bg-[#081f1c]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl"
    >
      <div className="max-w-3xl">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          Calculation Methodology &amp; Economic Principles
        </h2>

        <div className="space-y-6 text-sm text-emerald-100/75 leading-relaxed">
          {/* What is Inflation & CPI */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">
              What is Inflation &amp; the Consumer Price Index (CPI)?
            </h3>
            <p>
              Inflation measures how the general price level of consumer goods and services changes over time.
              As average prices rise, each unit of currency buys a smaller quantity of goods and services.
              The <strong className="text-white">Consumer Price Index (CPI)</strong> tracks the cost of a standardized market basket of typical consumer purchases (including food, housing, transportation, medical care, and clothing) over successive years.
            </p>
          </div>

          {/* Mathematical Formula */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">
              How the Calculation is Performed
            </h3>
            <p className="mb-3">
              To determine what an amount in a past year is worth in a later year, the ratio of the ending CPI to starting CPI is applied:
            </p>

            <div className="bg-[#051412] p-4 rounded-xl font-mono text-xs sm:text-sm border border-emerald-900/50 space-y-2 text-emerald-100">
              <div>
                <span className="text-emerald-400 font-semibold">Adjusted Amount</span> = Original Amount × (Ending CPI / Starting CPI)
              </div>
              <div>
                <span className="text-emerald-400 font-semibold">Total Inflation</span> = ((Ending CPI / Starting CPI) - 1) × 100%
              </div>
              <div>
                <span className="text-emerald-400 font-semibold">Purchasing Power Change</span> = ((Starting CPI / Ending CPI) - 1) × 100%
              </div>
            </div>
          </div>

          {/* Critical Distinction */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200">
            <h4 className="font-semibold text-sm mb-1 text-amber-100 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Important Distinction: Inflation vs. Foreign Exchange Rates
            </h4>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-normal">
              This calculator measures changes in domestic purchasing power within each respective currency: ETB calculations strictly use the Ethiopian Consumer Price Index, while USD calculations use the United States Consumer Price Index. It does <strong className="text-amber-100">not</strong> convert ETB to USD, nor does it track foreign currency exchange rates, investment yields, wage growth, or specific asset prices like real estate or stocks.
            </p>
          </div>

          {/* Sourcing & Dataset Integrity */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">
              Official Data Sources &amp; Coverage
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-emerald-900/40 bg-[#061816]/70">
                <div className="font-semibold text-white text-sm">
                  Ethiopia (ETB)
                </div>
                <div className="text-xs text-emerald-200/60 mt-1 space-y-1">
                  <div><strong>Source:</strong> World Bank Open Data &amp; IMF IFS</div>
                  <div><strong>National Authority:</strong> Ethiopian Statistical Service (ESS)</div>
                  <div><strong>Base Index:</strong> 2010 = 100</div>
                  <div><strong>Coverage:</strong> 1965 – 2025 (Annual)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-900/40 bg-[#061816]/70">
                <div className="font-semibold text-white text-sm">
                  United States (USD)
                </div>
                <div className="text-xs text-emerald-200/60 mt-1 space-y-1">
                  <div><strong>Source:</strong> World Bank Open Data &amp; U.S. BLS</div>
                  <div><strong>National Authority:</strong> U.S. Bureau of Labor Statistics (BLS)</div>
                  <div><strong>Base Index:</strong> 2010 = 100</div>
                  <div><strong>Coverage:</strong> 1960 – 2024 (Annual)</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-200/50 mt-3">
              Datasets are verified against primary records. Years with missing or preliminary data are omitted to maintain strict mathematical integrity rather than relying on unverified estimates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
