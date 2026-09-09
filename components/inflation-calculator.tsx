'use client';

import React, { useState, useTransition } from 'react';
import { CurrencyCode, InflationCalculationResult } from '../types/inflation';
import {
  calculateForYears,
  getAvailableYears,
  getCPIDataset,
} from '../lib/inflation';
import { validateCalculationForm } from '../lib/validation';
import { CurrencySelect } from './currency-select';
import { AmountInput } from './amount-input';
import { YearSelect } from './year-select';
import { ResultCard } from './result-card';
import { InflationChart } from './inflation-chart';

export function InflationCalculator() {
  const [isPending, startTransition] = useTransition();

  // Selected state
  const [currency, setCurrency] = useState<CurrencyCode>('ETB');
  const [amountInput, setAmountInput] = useState<string>('10000');

  // Available years for current currency
  const availableYears = getAvailableYears(currency);
  const minYear = availableYears[0];
  const maxYear = availableYears[availableYears.length - 1];

  // Default starting and ending years
  const [fromYear, setFromYear] = useState<number>(2015);
  const [toYear, setToYear] = useState<number>(maxYear);

  // Validation errors
  const [errors, setErrors] = useState<{ amount?: string; year?: string }>({});

  // Calculation result
  const [result, setResult] = useState<InflationCalculationResult | null>(() => {
    try {
      return calculateForYears(10000, 2015, maxYear, 'ETB');
    } catch {
      return null;
    }
  });

  // Handle currency change
  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    const newYears = getAvailableYears(newCurrency);
    const newMaxYear = newYears[newYears.length - 1];

    const safeFrom = Math.max(newYears[0], Math.min(fromYear, newMaxYear));
    const safeTo = newMaxYear;

    setFromYear(safeFrom);
    setToYear(safeTo);
    setErrors({});

    try {
      const parsedAmount = Number(amountInput.replace(/,/g, ''));
      if (parsedAmount > 0) {
        const res = calculateForYears(parsedAmount, safeFrom, safeTo, newCurrency);
        setResult(res);
      }
    } catch {
      setResult(null);
    }
  };

  // Preset time ranges for quick exploration
  const applyPreset = (yearsBack: number) => {
    const targetFrom = Math.max(minYear, maxYear - yearsBack);
    setFromYear(targetFrom);
    setToYear(maxYear);
    triggerCalculation(amountInput, targetFrom, maxYear, currency);
  };

  const triggerCalculation = (
    amtStr: string,
    from: number,
    to: number,
    curr: CurrencyCode
  ) => {
    const validation = validateCalculationForm(amtStr, from, to, curr);
    if (!validation.isValid) {
      const newErrors: { amount?: string; year?: string } = {};
      validation.errors.forEach((err) => {
        if (err.field === 'amount') newErrors.amount = err.message;
        if (err.field === 'toYear' || err.field === 'fromYear') newErrors.year = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});

    startTransition(() => {
      try {
        const res = calculateForYears(validation.value!.amount, from, to, curr);
        setResult(res);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Calculation error occurred.';
        setErrors({ year: msg });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCalculation(amountInput, fromYear, toYear, currency);
  };

  const currentDataset = getCPIDataset(currency);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Calculator Input Form - Matching Image Design */}
      <section className="rounded-2xl border border-emerald-800/40 bg-[#09201d]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl transition-all">
        {/* Header inside card matching user screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-emerald-800/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/90 border border-emerald-700/50 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Calculate Purchasing Power
              </h2>
              <p className="text-xs text-emerald-200/60 mt-0.5">
                Enter an amount and timeframe to estimate equivalent value using CPI data.
              </p>
            </div>
          </div>

          <div className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-medium bg-[#061917] text-emerald-300 border border-emerald-700/40 tabular-nums">
            {currency}: {minYear} – {maxYear}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Currency Selector */}
          <CurrencySelect
            value={currency}
            onChange={handleCurrencyChange}
            disabled={isPending}
          />

          {/* Amount and Timeframe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AmountInput
              value={amountInput}
              onChange={(val) => {
                setAmountInput(val);
                if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }));
              }}
              currency={currency}
              error={errors.amount}
              disabled={isPending}
            />

            <div className="space-y-3">
              <YearSelect
                fromYear={fromYear}
                toYear={toYear}
                availableYears={availableYears}
                onFromYearChange={(y) => {
                  setFromYear(y);
                  if (errors.year) setErrors((prev) => ({ ...prev, year: undefined }));
                }}
                onToYearChange={(y) => {
                  setToYear(y);
                  if (errors.year) setErrors((prev) => ({ ...prev, year: undefined }));
                }}
                error={errors.year}
                disabled={isPending}
              />

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[11px] text-emerald-200/40">
                  Quick span:
                </span>
                <button
                  type="button"
                  onClick={() => applyPreset(5)}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#071917] hover:bg-emerald-950 text-emerald-200/80 hover:text-white border border-emerald-900/50 transition-colors cursor-pointer"
                >
                  5 yrs
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(10)}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#071917] hover:bg-emerald-950 text-emerald-200/80 hover:text-white border border-emerald-900/50 transition-colors cursor-pointer"
                >
                  10 yrs
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(25)}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#071917] hover:bg-emerald-950 text-emerald-200/80 hover:text-white border border-emerald-900/50 transition-colors cursor-pointer"
                >
                  25 yrs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const startYear = Math.max(minYear, 2000);
                    setFromYear(startYear);
                    setToYear(maxYear);
                    triggerCalculation(amountInput, startYear, maxYear, currency);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#071917] hover:bg-emerald-950 text-emerald-200/80 hover:text-white border border-emerald-900/50 transition-colors cursor-pointer"
                >
                  Since 2000
                </button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-950/60 transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-slate-950"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Calculating...</span>
                </>
              ) : (
                <span>Calculate Purchasing Power</span>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Results Section */}
      {result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <ResultCard
            result={result}
            cpiSourceName={currentDataset.countryName + ' CPI (' + currentDataset.source + ')'}
          />

          <InflationChart
            currency={result.currency}
            fromYear={result.fromYear}
            toYear={result.toYear}
            originalAmount={result.originalAmount}
          />
        </div>
      )}
    </div>
  );
}
