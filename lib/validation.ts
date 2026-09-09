import { CurrencyCode, ValidationError, ValidationResult } from '../types/inflation';
import { getAvailableYears } from './inflation';

/**
 * Validates a user-entered monetary amount.
 * Rules:
 * - Must be numeric
 * - Must be greater than 0
 * - Handles decimals
 * - Rejects non-numeric, NaN, infinities, negatives, and zeroes
 * - Limits to reasonable upper bound (e.g. 1 trillion) to prevent overflow
 */
export function validateAmount(rawAmount: string | number): {
  isValid: boolean;
  value?: number;
  error?: string;
} {
  if (rawAmount === undefined || rawAmount === null || rawAmount === '') {
    return { isValid: false, error: 'Please enter an amount.' };
  }

  // Remove commas or formatting spaces if user pasted formatted numbers
  const cleaned = typeof rawAmount === 'string' ? rawAmount.replace(/,/g, '').trim() : rawAmount;
  const num = typeof cleaned === 'number' ? cleaned : Number(cleaned);

  if (isNaN(num)) {
    return { isValid: false, error: 'Please enter a valid numeric amount.' };
  }

  if (num <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0.' };
  }

  if (!isFinite(num)) {
    return { isValid: false, error: 'Amount must be a finite number.' };
  }

  if (num > 1_000_000_000_000_000) {
    return { isValid: false, error: 'Amount exceeds maximum supported limit.' };
  }

  return { isValid: true, value: num };
}

/**
 * Validates currency code.
 */
export function validateCurrency(currency: unknown): currency is CurrencyCode {
  return currency === 'ETB' || currency === 'USD';
}

/**
 * Validates the time period (fromYear and toYear) against the dataset.
 */
export function validateYears(
  fromYear: number,
  toYear: number,
  currency: CurrencyCode
): { isValid: boolean; error?: string } {
  if (!validateCurrency(currency)) {
    return { isValid: false, error: 'Unsupported currency selected.' };
  }

  const availableYears = getAvailableYears(currency);
  const minYear = availableYears[0];
  const maxYear = availableYears[availableYears.length - 1];

  if (!availableYears.includes(fromYear)) {
    return {
      isValid: false,
      error: `Starting year ${fromYear} is outside available data range (${minYear}–${maxYear}) for ${currency}.`,
    };
  }

  if (!availableYears.includes(toYear)) {
    return {
      isValid: false,
      error: `Ending year ${toYear} is outside available data range (${minYear}–${maxYear}) for ${currency}.`,
    };
  }

  if (fromYear > toYear) {
    return {
      isValid: false,
      error: `Starting year (${fromYear}) cannot be later than ending year (${toYear}).`,
    };
  }

  return { isValid: true };
}

/**
 * Full input validation for calculator form submission.
 */
export function validateCalculationForm(
  amountInput: string | number,
  fromYear: number,
  toYear: number,
  currency: unknown
): ValidationResult<{
  amount: number;
  fromYear: number;
  toYear: number;
  currency: CurrencyCode;
}> {
  const errors: ValidationError[] = [];

  const amountValidation = validateAmount(amountInput);
  if (!amountValidation.isValid) {
    errors.push({ field: 'amount', message: amountValidation.error! });
  }

  if (!validateCurrency(currency)) {
    errors.push({ field: 'currency', message: 'Please select a valid currency (ETB or USD).' });
  } else {
    const yearsValidation = validateYears(fromYear, toYear, currency);
    if (!yearsValidation.isValid) {
      errors.push({ field: 'toYear', message: yearsValidation.error! });
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    value: {
      amount: amountValidation.value!,
      fromYear,
      toYear,
      currency: currency as CurrencyCode,
    },
    errors: [],
  };
}
