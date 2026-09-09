import React from 'react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-900/40 bg-[#051412]/80 py-8 text-center text-xs text-emerald-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-semibold text-white">MoneyValue</span> — Historical Purchasing Power &amp; Inflation Calculator
        </div>
        <div className="flex items-center gap-4 text-emerald-200/60">
          <a
            href="#methodology"
            className="text-emerald-400 hover:text-emerald-300 hover:underline"
          >
            Methodology &amp; Data Sources
          </a>
          <span>•</span>
          <span>Sourced from World Bank, BLS &amp; ESS</span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4 text-[11px] text-emerald-200/40 text-center">
        Calculations provide historical purchasing-power approximations based on nationwide consumer price indices. Not financial, tax, or investment advice.
      </div>
    </footer>
  );
}
