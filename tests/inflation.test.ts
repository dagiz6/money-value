import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateInflation,
  calculateForYears,
  getCPIDataset,
} from '../lib/inflation.ts';
import {
  validateAmount,
  validateYears,
  validateCalculationForm,
} from '../lib/validation.ts';
import {
  formatCurrency,
  formatPercentage,
} from '../lib/formatting.ts';

describe('Calculation Logic (Requirement 20)', () => {
  it('1. Same CPI: amount=10,000, startCPI=100, endCPI=100 -> adjusted=10,000, inflation=0%', () => {
    const res = calculateInflation(10000, 100, 100, 2015, 2015, 'ETB');
    assert.equal(res.originalAmount, 10000);
    assert.equal(res.adjustedAmount, 10000);
    assert.equal(res.inflationRate, 0);
    assert.equal(res.purchasingPowerChange, 0);
    assert.equal(res.annualizedRate, 0);
  });

  it('2. 50% inflation: amount=10,000, startCPI=100, endCPI=150 -> adjusted=15,000, inflation=50%', () => {
    const res = calculateInflation(10000, 100, 150, 2015, 2020, 'ETB');
    assert.equal(res.originalAmount, 10000);
    assert.equal(res.adjustedAmount, 15000);
    assert.equal(res.inflationRate, 50);
    // Purchasing power change: (100/150 - 1) * 100 = -33.333%
    assert.ok(Math.abs(res.purchasingPowerChange - -33.333333333333336) < 0.0001);
  });

  it('3. Double CPI: amount=5,000, startCPI=100, endCPI=200 -> adjusted=10,000, inflation=100%', () => {
    const res = calculateInflation(5000, 100, 200, 2010, 2020, 'USD');
    assert.equal(res.originalAmount, 5000);
    assert.equal(res.adjustedAmount, 10000);
    assert.equal(res.inflationRate, 100);
    assert.equal(res.purchasingPowerChange, -50);
  });

  it('4. Decimal amount: amount=125.50 calculation remains accurate', () => {
    const res = calculateInflation(125.50, 100, 150, 2015, 2020, 'USD');
    assert.equal(res.originalAmount, 125.50);
    assert.equal(res.adjustedAmount, 188.25);
    assert.equal(res.inflationRate, 50);
  });

  it('5. Invalid amount: amount=0 should be rejected with controlled error', () => {
    assert.throws(
      () => calculateInflation(0, 100, 150, 2015, 2020, 'ETB'),
      /Amount must be a positive number/
    );
  });

  it('6. Negative amount: amount=-50 should be rejected with controlled error', () => {
    assert.throws(
      () => calculateInflation(-50, 100, 150, 2015, 2020, 'ETB'),
      /Amount must be a positive number/
    );
  });

  it('7. Missing CPI: should produce a controlled error', () => {
    // Year 1800 doesn't exist in Ethiopia dataset
    assert.throws(
      () => calculateForYears(1000, 1800, 2020, 'ETB'),
      /Inflation data isn't available for starting year 1800/
    );
  });

  it('8. Start year after end year should be rejected', () => {
    assert.throws(
      () => calculateInflation(1000, 100, 150, 2025, 2015, 'ETB'),
      /Starting year \(2025\) cannot be after ending year \(2015\)/
    );
  });
});

describe('Input Validation Logic', () => {
  it('validates numeric amounts correctly', () => {
    assert.equal(validateAmount(1000).isValid, true);
    assert.equal(validateAmount('10,000.50').isValid, true);
    assert.equal(validateAmount('10,000.50').value, 10000.5);

    assert.equal(validateAmount(0).isValid, false);
    assert.equal(validateAmount(-100).isValid, false);
    assert.equal(validateAmount('abc').isValid, false);
    assert.equal(validateAmount('').isValid, false);
  });

  it('validates year bounds and order', () => {
    const valid = validateYears(2010, 2020, 'ETB');
    assert.equal(valid.isValid, true);

    const reversed = validateYears(2020, 2010, 'ETB');
    assert.equal(reversed.isValid, false);

    const outOfRange = validateYears(1900, 2020, 'ETB');
    assert.equal(outOfRange.isValid, false);
  });

  it('validates entire form submission structure', () => {
    const result = validateCalculationForm('10,000', 2015, 2024, 'USD');
    assert.equal(result.isValid, true);
    assert.equal(result.value?.amount, 10000);
    assert.equal(result.value?.fromYear, 2015);
    assert.equal(result.value?.toYear, 2024);
    assert.equal(result.value?.currency, 'USD');

    const invalid = validateCalculationForm('-50', 2025, 2010, 'INVALID');
    assert.equal(invalid.isValid, false);
    assert.ok(invalid.errors.length >= 2);
  });
});

describe('Formatting Logic (Requirement 11)', () => {
  it('formats ETB correctly with suffix', () => {
    assert.equal(formatCurrency(10000, 'ETB'), '10,000 ETB');
    assert.equal(formatCurrency(1250000, 'ETB'), '1,250,000 ETB');
    assert.equal(formatCurrency(25483.72, 'ETB'), '25,483.72 ETB');
  });

  it('formats USD correctly with prefix', () => {
    assert.equal(formatCurrency(10000, 'USD'), '$10,000');
    assert.equal(formatCurrency(1250000, 'USD'), '$1,250,000');
    assert.equal(formatCurrency(25483.72, 'USD'), '$25,483.72');
  });

  it('formats percentages clearly', () => {
    assert.equal(formatPercentage(150), '150.0%');
    assert.equal(formatPercentage(50, { includeSign: true }), '+50.0%');
    assert.equal(formatPercentage(-33.333), '-33.3%');
  });
});

describe('Dataset Integrity (Requirement 7 & 8)', () => {
  it('Ethiopian dataset has authentic continuous data from 1965 to 2025', () => {
    const ethiopia = getCPIDataset('ETB');
    assert.equal(ethiopia.minYear, 1965);
    assert.equal(ethiopia.maxYear, 2025);
    assert.equal(ethiopia.data.length, 61);
    
    // 2010 is base year = 100
    const baseEntry = ethiopia.data.find(d => d.year === 2010);
    assert.equal(baseEntry?.cpi, 100);
  });

  it('US dataset has authentic continuous data from 1960 to 2024', () => {
    const usa = getCPIDataset('USD');
    assert.equal(usa.minYear, 1960);
    assert.equal(usa.maxYear, 2024);
    assert.equal(usa.data.length, 65);

    // 2010 is base year = 100
    const baseEntry = usa.data.find(d => d.year === 2010);
    assert.equal(baseEntry?.cpi, 100);
  });
});
