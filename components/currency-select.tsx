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
        className="block text-sm font-medium text-emerald-100/90 mb-2"
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
              className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isSelected
                  ? 'border-emerald-500/80 bg-emerald-950/60 text-white ring-1 ring-emerald-500/50 shadow-md shadow-emerald-950/40'
                  : 'border-emerald-900/40 bg-[#061715]/70 hover:border-emerald-800 text-slate-300'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl" aria-hidden="true">
                  {curr.flag}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-semibold text-white">
                      {curr.code}
                    </span>
                    <span className="text-xs text-emerald-200/50">
                      ({curr.symbol})
                    </span>
                  </div>
                  <div className="text-xs text-emerald-200/50">
                    {curr.sublabel}
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-400'
                    : 'border-emerald-800'
                }`}
                aria-hidden="true"
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#061513]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
