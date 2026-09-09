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

  // Arcjet Rate limit status feedback
  const [rateLimitStatus, setRateLimitStatus] = useState<{
    isLimited: boolean;
    message?: string;
    remaining?: number;
  } | null>(null);

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

    startTransition(async () => {
      try {
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: validation.value!.amount,
            fromYear: from,
            toYear: to,
            currency: curr,
          }),
        });

        if (response.status === 429) {
          const data = await response.json().catch(() => ({}));
          setRateLimitStatus({
            isLimited: true,
            message:
              data.error ||
              'Rate limit exceeded (Arcjet): 3 requests/minute limit reached. Please wait before submitting more calculations.',
          });
          setResult(null);
          return;
        }

        if (!response.ok) {
          throw new Error('Calculation request failed');
        }

        const data = await response.json();
        setResult(data.data);
        const remainingHeader = response.headers.get('x-ratelimit-remaining');
        setRateLimitStatus({
          isLimited: false,
          remaining: remainingHeader ? Number(remainingHeader) : undefined,
        });
      } catch (e: unknown) {
        if (!rateLimitStatus?.isLimited) {
          try {
            const res = calculateForYears(validation.value!.amount, from, to, curr);
            setResult(res);
          } catch {
            const msg = e instanceof Error ? e.message : 'Calculation error occurred.';
            setErrors({ year: msg });
          }
        }
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCalculation(amountInput, fromYear, toYear, currency);
  };

  const currentDataset = getCPIDataset(currency);

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-8">
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

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-[#061917] text-emerald-300 border border-emerald-700/40 tabular-nums">
              {currency}: {minYear} – {maxYear}
            </div>
            <div
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 flex items-center gap-1.5 shadow-sm"
              title="Protected with Arcjet Rate Limiting (3 req/min) & WAF Shield"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Arcjet Protected (3 req/min)
            </div>
          </div>
        </div>

        {/* Rate Limit Warning Banner */}
        {rateLimitStatus?.isLimited && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <svg
              className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="space-y-0.5">
              <span className="font-semibold text-amber-300">Arcjet Rate Limit Reached:</span>
              <p className="text-amber-200/80">{rateLimitStatus.message}</p>
            </div>
          </div>
        )}

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
