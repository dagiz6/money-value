import React from 'react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">MoneyValue</span> — Historical Purchasing Power & Inflation Calculator
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#methodology"
            className="text-teal-700 dark:text-teal-400 hover:underline"
          >
            Methodology & Data Sources
          </a>
          <span>•</span>
          <span>Sourced from World Bank, BLS & ESS</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-4 text-[11px] text-slate-400 dark:text-slate-500 text-center">
        Calculations provide historical purchasing-power approximations based on nationwide consumer price indices. Not financial, tax, or investment advice.
      </div>
    </footer>
  );
}
