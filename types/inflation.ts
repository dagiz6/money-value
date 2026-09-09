export type CurrencyCode = 'ETB' | 'USD';

export interface CPIData {
  year: number;
  cpi: number;
}

export interface CountryCPIDataset {
  currency: CurrencyCode;
  countryName: string;
  currencyName: string;
  symbol: string;
  source: string;
  sourceUrl: string;
  baseYear: string;
  frequency: string;
  lastUpdated: string;
  minYear: number;
  maxYear: number;
  data: CPIData[];
}

export interface InflationCalculationInput {
  amount: number;
  fromYear: number;
  toYear: number;
  currency: CurrencyCode;
}

export interface InflationCalculationResult {
  originalAmount: number;
  adjustedAmount: number;
  inflationRate: number;
  purchasingPowerChange: number;
  annualizedRate: number;
  fromYear: number;
  toYear: number;
  currency: CurrencyCode;
  startCpi: number;
  endCpi: number;
  yearsDiff: number;
}

export interface ValidationError {
  field: 'amount' | 'fromYear' | 'toYear' | 'currency';
  message: string;
}

export interface ValidationResult<T> {
  isValid: boolean;
  value?: T;
  errors: ValidationError[];
}
