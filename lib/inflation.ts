import { ethiopiaCPIDataset } from '../data/ethiopia-cpi';
import { usaCPIDataset } from '../data/usa-cpi';
import {
  CountryCPIDataset,
  CurrencyCode,
  InflationCalculationResult,
} from '../types/inflation';

/**
 * Registry of supported country CPI datasets.
 */
export const cpiDatasets: Record<CurrencyCode, CountryCPIDataset> = {
  ETB: ethiopiaCPIDataset,
  USD: usaCPIDataset,
};

/**
 * Returns the dataset for a given currency code.
 */
export function getCPIDataset(currency: CurrencyCode): CountryCPIDataset {
  const dataset = cpiDatasets[currency];
  if (!dataset) {
    throw new Error(`Unsupported currency: ${currency}. Supported currencies: ETB, USD.`);
  }
  return dataset;
}

/**
 * Retrieves the CPI index value for a specific year and currency.
 */
export function getCPIForYear(currency: CurrencyCode, year: number): number | undefined {
  const dataset = getCPIDataset(currency);
  const entry = dataset.data.find((d) => d.year === year);
  return entry?.cpi;
}

/**
 * Returns all available sorted years for a specific currency dataset.
 */
export function getAvailableYears(currency: CurrencyCode): number[] {
  const dataset = getCPIDataset(currency);
  return dataset.data.map((d) => d.year).sort((a, b) => a - b);
}

/**
 * Core mathematical calculation for purchasing power and inflation.
 *
 * Formulas:
 * Adjusted Amount = Original Amount × (Ending CPI / Starting CPI)
 * Total Inflation = ((Ending CPI / Starting CPI) - 1) × 100
 * Purchasing Power Change = ((Starting CPI / Ending CPI) - 1) × 100
 * Annualized Rate = ((Ending CPI / Starting CPI) ^ (1 / yearsDiff) - 1) × 100
 *
 * @param amount - The initial sum of money (must be > 0)
 * @param startCpi - The CPI level at starting year (must be > 0)
 * @param endCpi - The CPI level at ending year (must be > 0)
 * @param fromYear - Starting year
 * @param toYear - Ending year
 * @param currency - 'ETB' | 'USD'
 */
export function calculateInflation(
  amount: number,
  startCpi: number,
  endCpi: number,
  fromYear: number,
  toYear: number,
  currency: CurrencyCode
): InflationCalculationResult {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0 || !isFinite(amount)) {
    throw new Error('Amount must be a positive number.');
  }

  if (typeof startCpi !== 'number' || isNaN(startCpi) || startCpi <= 0) {
    throw new Error(`Invalid starting CPI value (${startCpi}) for year ${fromYear}.`);
  }

  if (typeof endCpi !== 'number' || isNaN(endCpi) || endCpi <= 0) {
    throw new Error(`Invalid ending CPI value (${endCpi}) for year ${toYear}.`);
  }

  if (fromYear > toYear) {
    throw new Error(`Starting year (${fromYear}) cannot be after ending year (${toYear}).`);
  }

  const yearsDiff = toYear - fromYear;

  // If same year or identical CPI:
  if (yearsDiff === 0 || startCpi === endCpi) {
    return {
      originalAmount: amount,
      adjustedAmount: amount,
      inflationRate: 0,
      purchasingPowerChange: 0,
      annualizedRate: 0,
      fromYear,
      toYear,
      currency,
      startCpi,
      endCpi,
      yearsDiff: 0,
    };
  }

  const cpiRatio = endCpi / startCpi;
  const adjustedAmount = amount * cpiRatio;
  const inflationRate = (cpiRatio - 1) * 100;
  
  // Purchasing power of 1 unit of original currency in ending terms:
  // e.g. if CPI rises from 100 to 150, purchasing power changes by (100/150 - 1) = -33.33%
  const purchasingPowerChange = (startCpi / endCpi - 1) * 100;

  // Annualized Compound Inflation Rate (CAGR)
  const annualizedRate = (Math.pow(cpiRatio, 1 / yearsDiff) - 1) * 100;

  return {
    originalAmount: amount,
    adjustedAmount,
    inflationRate,
    purchasingPowerChange,
    annualizedRate,
    fromYear,
    toYear,
    currency,
    startCpi,
    endCpi,
    yearsDiff,
  };
}

/**
 * Calculates inflation using year lookups from the dataset.
 */
export function calculateForYears(
  amount: number,
  fromYear: number,
  toYear: number,
  currency: CurrencyCode
): InflationCalculationResult {
  const startCpi = getCPIForYear(currency, fromYear);
  if (startCpi === undefined) {
    throw new Error(
      `Inflation data isn't available for starting year ${fromYear}. Please choose another year.`
    );
  }

  const endCpi = getCPIForYear(currency, toYear);
  if (endCpi === undefined) {
    throw new Error(
      `Inflation data isn't available for ending year ${toYear}. Please choose another year.`
    );
  }

  return calculateInflation(amount, startCpi, endCpi, fromYear, toYear, currency);
}

/**
 * Retrieves full chronological CPI time-series for a selected range to plot in charts.
 */
export function getCPISeriesForRange(
  currency: CurrencyCode,
  fromYear: number,
  toYear: number,
  originalAmount: number = 100
): Array<{
  year: number;
  cpi: number;
  inflationFromStart: number;
  equivalentAmount: number;
}> {
  const dataset = getCPIDataset(currency);
  const startCpi = getCPIForYear(currency, fromYear);

  if (!startCpi) {
    return [];
  }

  return dataset.data
    .filter((d) => d.year >= fromYear && d.year <= toYear)
    .map((d) => {
      const inflationFromStart = ((d.cpi / startCpi) - 1) * 100;
      const equivalentAmount = originalAmount * (d.cpi / startCpi);
      return {
        year: d.year,
        cpi: Number(d.cpi.toFixed(2)),
        inflationFromStart: Number(inflationFromStart.toFixed(2)),
        equivalentAmount: Number(equivalentAmount.toFixed(2)),
      };
    });
}
