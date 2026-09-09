'use client';

import React from 'react';

interface YearSelectProps {
  fromYear: number;
  toYear: number;
  availableYears: number[];
  onFromYearChange: (year: number) => void;
  onToYearChange: (year: number) => void;
  error?: string;
  disabled?: boolean;
}

export function YearSelect({
  fromYear,
  toYear,
  availableYears,
  onFromYearChange,
  onToYearChange,
  error,
  disabled = false,
}: YearSelectProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* From Year */}
        <div>
          <label
            htmlFor="from-year-select"
            className="block text-sm font-medium text-emerald-100/90 mb-2"
          >
            Starting Year (From)
          </label>
          <div className="relative">
            <select
              id="from-year-select"
              name="fromYear"
              value={fromYear}
              disabled={disabled}
              onChange={(e) => onFromYearChange(Number(e.target.value))}
              aria-describedby={error ? 'year-range-error' : undefined}
              className="block w-full appearance-none rounded-xl border border-emerald-900/60 bg-[#061715] py-3 pl-3.5 pr-10 text-base font-medium text-white outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {availableYears.map((year) => (
                <option key={`from-${year}`} value={year} className="bg-[#081f1c] text-white">
                  {year}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-400">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* To Year */}
        <div>
          <label
            htmlFor="to-year-select"
            className="block text-sm font-medium text-emerald-100/90 mb-2"
          >
            Target Year (To)
          </label>
          <div className="relative">
            <select
              id="to-year-select"
              name="toYear"
              value={toYear}
              disabled={disabled}
              onChange={(e) => onToYearChange(Number(e.target.value))}
              aria-describedby={error ? 'year-range-error' : undefined}
              className="block w-full appearance-none rounded-xl border border-emerald-900/60 bg-[#061715] py-3 pl-3.5 pr-10 text-base font-medium text-white outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {availableYears.map((year) => (
                <option key={`to-${year}`} value={year} className="bg-[#081f1c] text-white">
                  {year}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-400">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p
          id="year-range-error"
          className="mt-2 text-xs text-rose-400 flex items-center gap-1"
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
