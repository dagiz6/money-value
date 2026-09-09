'use client';

import React from 'react';
import { CurrencyCode } from '../types/inflation';

interface CurrencySelectProps {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  disabled?: boolean;
}

export function CurrencySelect({
  value,
  onChange,
  disabled = false,
}: CurrencySelectProps) {
  const currencies: Array<{
    code: CurrencyCode;
    label: string;
    symbol: string;
    flag: string;
    sublabel: string;
  }> = [
    {
      code: 'ETB',
      label: 'Ethiopian Birr',
      symbol: 'ETB',
      flag: '🇪🇹',
      sublabel: 'CPI: 1965 – 2025',
    },
    {
      code: 'USD',
      label: 'US Dollar',
      symbol: '$',
      flag: '🇺🇸',
      sublabel: 'CPI: 1960 – 2024',
    },
  ];

  return (
    <div className="w-full">
      <label
        id="currency-select-label"
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
      >
        Currency
      </label>
      <div
        role="radiogroup"
        aria-labelledby="currency-select-label"
        className="grid grid-cols-2 gap-3"
      >
        {currencies.map((curr) => {
          const isSelected = value === curr.code;
          return (
            <button
              key={curr.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(curr.code)}
              className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-400 ${
                isSelected
                  ? 'border-teal-700 dark:border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 ring-1 ring-teal-700 dark:ring-teal-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl" aria-hidden="true">
                  {curr.flag}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-base font-semibold ${
                        isSelected
                          ? 'text-slate-900 dark:text-slate-100'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {curr.code}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({curr.symbol})
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {curr.sublabel}
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isSelected
                    ? 'border-teal-700 dark:border-teal-400 bg-teal-700 dark:bg-teal-400'
                    : 'border-slate-300 dark:border-slate-600'
                }`}
                aria-hidden="true"
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-900" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
