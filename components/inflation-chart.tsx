'use client';

import React, { useState, useMemo } from 'react';
import { CurrencyCode } from '../types/inflation';
import { getCPISeriesForRange } from '../lib/inflation';
import { formatCurrency } from '../lib/formatting';

interface InflationChartProps {
  currency: CurrencyCode;
  fromYear: number;
  toYear: number;
  originalAmount: number;
}

export function InflationChart({
  currency,
  fromYear,
  toYear,
  originalAmount,
}: InflationChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    year: number;
    cpi: number;
    equivalentAmount: number;
    inflationFromStart: number;
    x: number;
    y: number;
  } | null>(null);

  const series = useMemo(() => {
    return getCPISeriesForRange(currency, fromYear, toYear, originalAmount);
  }, [currency, fromYear, toYear, originalAmount]);

  if (series.length === 0) {
    return null;
  }

  // Chart dimensions and SVG viewbox
  const width = 760;
  const height = 320;
  const padding = { top: 24, right: 30, bottom: 44, left: 60 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Min and max CPI values for Y-axis scale
  const cpiValues = series.map((d) => d.cpi);
  const minCpi = Math.min(...cpiValues);
  const maxCpi = Math.max(...cpiValues);
  const cpiRange = maxCpi === minCpi ? 1 : maxCpi - minCpi;
  const yMin = Math.max(0, minCpi - cpiRange * 0.08);
  const yMax = maxCpi + cpiRange * 0.08;

  // Scales
  const getX = (index: number) => {
    if (series.length === 1) return padding.left + chartWidth / 2;
    return padding.left + (index / (series.length - 1)) * chartWidth;
  };

  const getY = (cpi: number) => {
    return padding.top + chartHeight - ((cpi - yMin) / (yMax - yMin)) * chartHeight;
  };

  // Generate SVG path points
  const points = series.map((d, i) => ({
    x: getX(i),
    y: getY(d.cpi),
    ...d,
  }));

  const linePath = points.reduce((acc, curr, index) => {
    return `${acc} ${index === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`;
  }, '');

  // Gradient area fill under curve
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    padding.top + chartHeight
  } L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Determine Y-axis tick marks
  const yTicksCount = 5;
  const yTicks = Array.from({ length: yTicksCount }, (_, i) => {
    const val = yMin + (i / (yTicksCount - 1)) * (yMax - yMin);
    return {
      value: val,
      y: getY(val),
    };
  });

  // Determine X-axis tick intervals
  const maxXTicks = 7;
  const step = Math.max(1, Math.ceil(series.length / maxXTicks));
  const xTicks = series.filter((_, i) => i % step === 0 || i === series.length - 1);

  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            CPI & Purchasing Trend ({fromYear} – {toYear})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Historical index movement and cumulative purchasing equivalent for {formatCurrency(originalAmount, currency)}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-700 dark:bg-teal-400" />
            <span>CPI Level</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-72 select-none overflow-visible"
          role="img"
          aria-label={`Line chart showing CPI for ${currency} from ${fromYear} to ${toYear}`}
        >
          <defs>
            <linearGradient id="cpiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <g key={`ytick-${i}`}>
              <line
                x1={padding.left}
                y1={tick.y}
                x2={width - padding.right}
                y2={tick.y}
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 10}
                y={tick.y + 4}
                textAnchor="end"
                className="text-[11px] fill-slate-400 dark:fill-slate-500 tabular-nums"
              >
                {tick.value >= 100 ? tick.value.toFixed(0) : tick.value.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#cpiGradient)" />

          {/* Trend Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#0f766e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:stroke-teal-400 transition-all"
          />

          {/* X Axis Baseline */}
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={width - padding.right}
            y2={padding.top + chartHeight}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-700"
          />

          {/* X-axis tick labels */}
          {xTicks.map((d) => {
            const index = series.findIndex((s) => s.year === d.year);
            const x = getX(index);
            return (
              <text
                key={`xtick-${d.year}`}
                x={x}
                y={padding.top + chartHeight + 20}
                textAnchor="middle"
                className="text-[11px] fill-slate-500 dark:fill-slate-400 font-medium"
              >
                {d.year}
              </text>
            );
          })}

          {/* Data Points */}
          {points.map((pt) => {
            const isHovered = hoveredPoint?.year === pt.year;
            return (
              <g key={`pt-${pt.year}`}>
                {/* Invisible hover capture circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="14"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onTouchStart={() => setHoveredPoint(pt)}
                />
                {/* Visible node */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? '5' : points.length <= 15 ? '3.5' : '2'}
                  className={`${
                    isHovered
                      ? 'fill-teal-700 dark:fill-teal-300 stroke-white dark:stroke-slate-900 stroke-2'
                      : 'fill-teal-700 dark:fill-teal-400 opacity-90'
                  } transition-all pointer-events-none`}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xs text-white p-2.5 rounded-md shadow-lg text-xs border border-slate-700 dark:border-slate-600 transition-transform duration-75"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${Math.max(10, (hoveredPoint.y / height) * 100 - 35)}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="font-bold text-teal-300 text-sm mb-0.5">
              Year {hoveredPoint.year}
            </div>
            <div className="flex justify-between gap-3 text-slate-300">
              <span>CPI Index:</span>
              <strong className="text-white tabular-nums">
                {hoveredPoint.cpi.toFixed(2)}
              </strong>
            </div>
            <div className="flex justify-between gap-3 text-slate-300">
              <span>Equivalent:</span>
              <strong className="text-teal-200 tabular-nums">
                {formatCurrency(hoveredPoint.equivalentAmount, currency)}
              </strong>
            </div>
            {hoveredPoint.year !== fromYear && (
              <div className="flex justify-between gap-3 text-slate-300 pt-0.5 border-t border-slate-700 mt-1">
                <span>Cumulative Change:</span>
                <strong
                  className={`tabular-nums ${
                    hoveredPoint.inflationFromStart >= 0
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {hoveredPoint.inflationFromStart >= 0 ? '+' : ''}
                  {hoveredPoint.inflationFromStart.toFixed(1)}%
                </strong>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 text-right">
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Hover or tap data points to inspect values
        </span>
      </div>
    </section>
  );
}
