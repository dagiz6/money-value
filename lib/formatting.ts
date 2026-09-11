import { CurrencyCode } from '../types/inflation';

/**
 * Formats a monetary amount according to the target currency convention.
 *
 * Examples:
 * USD: $10,000 or $25,483.72
 * ETB: 10,000 ETB or 25,483.72 ETB
 *
 * Uses Intl.NumberFormat to avoid manual string splitting.
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  if (isNaN(amount) || !isFinite(amount)) {
    return `0 ${currency}`;
  }

  //  show decimals if amount has fractional cents
  const hasDecimals = amount % 1 !== 0;
  const minDigits = options?.minimumFractionDigits ?? (hasDecimals ? 2 : 0);
  const maxDigits = options?.maximumFractionDigits ?? 2;

  const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits,
  });

  const formattedNum = numberFormatter.format(amount);

  if (currency === 'USD') {
    return `$${formattedNum}`;
  }

  // Standard ETB notation per guidelines: e.g. "10,000 ETB"
  return `${formattedNum} ETB`;
}

/**
 * Formats percentage rates with clean precision (e.g. 150.0%, +150.0%, -33.3%).
 */
export function formatPercentage(
  rate: number,
  options?: {
    includeSign?: boolean;
    decimals?: number;
  }
): string {
  if (isNaN(rate) || !isFinite(rate)) {
    return '0.0%';
  }

  const decimals = options?.decimals ?? 1;
  const formatted = rate.toFixed(decimals);

  if (options?.includeSign && rate > 0) {
    return `+${formatted}%`;
  }

  return `${formatted}%`;
}

/**
 * Standard number formatting with thousands separators (e.g. 1,000, 100.5).
 */
export function formatNumber(
  value: number,
  decimals: number = 2
): string {
  if (isNaN(value) || !isFinite(value)) {
    return '0';
  }

  const hasDecimals = value % 1 !== 0;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: hasDecimals ? Math.min(2, decimals) : 0,
    maximumFractionDigits: decimals,
  }).format(value);
}
