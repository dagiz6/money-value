'use client';

import React from 'react';
import { CurrencyCode } from '../types/inflation';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currency: CurrencyCode;
  error?: string;
  disabled?: boolean;
}

export function AmountInput({
  value,
  onChange,
  currency,
  error,
  disabled = false,
}: AmountInputProps) {
  const isUSD = currency === 'USD';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow numbers and a single decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(raw)) {
      onChange(raw);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="amount-input"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Initial Amount
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Positive number
        </span>
      </div>

      <div className="relative rounded-lg shadow-xs">
        {isUSD && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg">
              $
            </span>
          </div>
        )}

        <input
          type="text"
          inputMode="decimal"
          id="amount-input"
          name="amount"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder="e.g. 10,000"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'amount-error' : undefined}
          className={`block w-full rounded-lg border bg-white dark:bg-slate-900 py-3 text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all ${
            isUSD ? 'pl-8' : 'pl-3.5'
          } ${currency === 'ETB' ? 'pr-16' : 'pr-3.5'} ${
            error
              ? 'border-rose-500 dark:border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-slate-300 dark:border-slate-700 focus:border-teal-700 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-700/20 dark:focus:ring-teal-400/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        {currency === 'ETB' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              ETB
            </span>
          </div>
        )}
      </div>

      {error && (
        <p
          id="amount-error"
          className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1"
          role="alert"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 108 1a7 7 0 000 14zm-.75-9.25a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 6.75a.875.875 0 110-1.75.875.875 0 010 1.75z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
