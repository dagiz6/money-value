'use client';

import React from 'react';
import { InflationCalculationResult } from '../types/inflation';
import { formatCurrency, formatPercentage } from '../lib/formatting';

interface ResultCardProps {
  result: InflationCalculationResult;
  cpiSourceName: string;
}

export function ResultCard({ result, cpiSourceName }: ResultCardProps) {
  const isPositiveInflation = result.inflationRate > 0;
  const isZeroInflation = result.inflationRate === 0;

  const formattedOriginal = formatCurrency(result.originalAmount, result.currency);
  const formattedAdjusted = formatCurrency(result.adjustedAmount, result.currency);
  const formattedTotalInflation = formatPercentage(result.inflationRate, {
    includeSign: !isZeroInflation,
  });
  const formattedPurchasingPower = formatPercentage(result.purchasingPowerChange, {
    includeSign: !isZeroInflation,
  });
  const formattedAnnualRate = formatPercentage(result.annualizedRate, {
    includeSign: false,
  });

  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all"
    >
      {/* Primary Value Comparison Banner */}
      <div className="p-6 sm:p-8 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800">
        <div className="text-xs font-semibold tracking-wide text-teal-800 dark:text-teal-400 mb-4">
          Estimated Purchasing Power Equivalent
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Starting Amount */}
          <div className="flex-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
              Initial Purchasing Power
            </span>
            <div className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
              {formattedOriginal}
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              in {result.fromYear}
            </div>
          </div>

          {/* Equal Symbol / Transition */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold text-lg shrink-0 self-start md:self-center"
            aria-hidden="true"
          >
            ≈
          </div>

          {/* Adjusted Amount */}
          <div className="flex-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
              Required in {result.toYear}
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-teal-900 dark:text-teal-300 tabular-nums">
              {formattedAdjusted}
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              in {result.toYear} dollars/birr
            </div>
          </div>
        </div>

        {/* Natural Language Clarification */}
        <p className="mt-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          {result.fromYear === result.toYear ? (
            <span>
              Calculated within the same year ({result.fromYear}). The purchasing power remains identical with 0.0% inflation.
            </span>
          ) : (
            <span>
              Goods and services costing approximately{' '}
              <strong className="font-semibold text-slate-900 dark:text-slate-100">
                {formattedOriginal}
              </strong>{' '}
              in {result.fromYear} would require about{' '}
              <strong className="font-semibold text-teal-800 dark:text-teal-300">
                {formattedAdjusted}
              </strong>{' '}
              in {result.toYear} to have equivalent purchasing power, based on the change in official Consumer Price Index.
            </span>
          )}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800">
        {/* Total Inflation */}
        <div className="p-5 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Total Inflation
          </div>
          <div
            className={`text-xl font-bold tabular-nums ${
              isPositiveInflation
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {formattedTotalInflation}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Over {result.yearsDiff} {result.yearsDiff === 1 ? 'year' : 'years'}
          </div>
        </div>

        {/* Purchasing Power Change */}
        <div className="p-5 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Purchasing Power Change
          </div>
          <div
            className={`text-xl font-bold tabular-nums ${
              result.purchasingPowerChange < 0
                ? 'text-amber-700 dark:text-amber-400'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {formattedPurchasingPower}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Per unit of currency
          </div>
        </div>

        {/* Annualized Rate */}
        <div className="p-5 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Average Annual Rate
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {formattedAnnualRate}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Compound per year (CAGR)
          </div>
        </div>

        {/* CPI Index Multiplier */}
        <div className="p-5 bg-white dark:bg-slate-900">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            CPI Price Multiplier
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {(result.endCpi / result.startCpi).toFixed(2)}×
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {result.startCpi.toFixed(1)} → {result.endCpi.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Critical Distinction Notice */}
      <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
        <svg
          className="w-4 h-4 shrink-0 text-teal-600 dark:text-teal-400 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Inflation calculation, not exchange rate:
          </span>{' '}
          This reflects changes in purchasing power within {result.currency} using{' '}
          {cpiSourceName}. It does not perform currency conversion between ETB and USD.
        </div>
      </div>
    </section>
  );
}
