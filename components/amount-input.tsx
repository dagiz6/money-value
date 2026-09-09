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
    if (/^[0-9]*\.?[0-9]*$/.test(raw)) {
      onChange(raw);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="amount-input"
          className="block text-sm font-medium text-emerald-100/90"
        >
          Initial Amount
        </label>
        <span className="text-xs text-emerald-200/50">
          Positive number
        </span>
      </div>

      <div className="relative rounded-xl shadow-xs">
        {isUSD && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <span className="text-emerald-400 font-semibold text-base sm:text-lg">
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
          className={`block w-full rounded-xl border bg-[#061715] py-3 text-base sm:text-lg font-medium text-white placeholder:text-emerald-900/60 outline-none transition-all ${
            isUSD ? 'pl-8' : 'pl-3.5'
          } ${currency === 'ETB' ? 'pr-16' : 'pr-3.5'} ${
            error
              ? 'border-rose-500 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
              : 'border-emerald-900/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        {currency === 'ETB' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
            <span className="text-emerald-400/90 text-sm font-semibold">
              ETB
            </span>
          </div>
        )}
      </div>

      {error && (
        <p
          id="amount-error"
          className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"
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
