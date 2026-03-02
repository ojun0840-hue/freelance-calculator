import type { CalculationResult, CountryOptions } from '../types';

export function calculatePortugal(
  annualRevenue: number,
  expenses: number,
  options: CountryOptions
): CalculationResult {
  // Simplified Regime: 75% of revenue = taxable income
  const taxableIncome = Math.round(annualRevenue * 0.75);

  // === IRS (Income Tax) Progressive ===
  const brackets = [
    { limit: 7703, rate: 0.13 },
    { limit: 11623, rate: 0.165 },
    { limit: 16472, rate: 0.22 },
    { limit: 21321, rate: 0.25 },
    { limit: 27146, rate: 0.32 },
    { limit: 39791, rate: 0.355 },
    { limit: 51997, rate: 0.435 },
    { limit: 81199, rate: 0.45 },
    { limit: Infinity, rate: 0.48 },
  ];

  let incomeTax = 0;
  let remaining = taxableIncome;
  let prevLimit = 0;
  for (const bracket of brackets) {
    const taxable = Math.min(remaining, bracket.limit - prevLimit);
    if (taxable <= 0) break;
    incomeTax += taxable * bracket.rate;
    remaining -= taxable;
    prevLimit = bracket.limit;
  }
  incomeTax = Math.round(incomeTax);

  // === Social Security ===
  let socialSecurity: number;
  if (options.isFirstYear) {
    socialSecurity = 0; // First 12 months exempt
  } else {
    socialSecurity = Math.round(taxableIncome * 0.214);
  }

  const totalDeductions = incomeTax + socialSecurity;
  const takeHome = annualRevenue - totalDeductions;

  return {
    country: 'PT',
    grossRevenue: annualRevenue,
    taxableIncome,
    takeHome,
    effectiveRate: annualRevenue > 0 ? Math.round((totalDeductions / annualRevenue) * 1000) / 10 : 0,
    breakdown: [
      { label: 'Income Tax (IRS)', amount: incomeTax, tooltip: 'Progressive tax: 13% to 48%. Under Simplified Regime, 75% of revenue is taxable (25% automatic deduction).', color: '#ef4444' },
      { label: 'Social Security', amount: socialSecurity, tooltip: options.isFirstYear ? 'First 12 months: EXEMPT from social security contributions!' : '21.4% of taxable income. Covers health, retirement, family benefits.', color: '#f97316' },
    ],
    tips: [
      'Simplified Regime: only 75% of revenue is taxed (25% auto-deduction).',
      options.isFirstYear ? 'First year: no social security payments!' : 'Social security = 21.4% of your deemed income.',
      'No VAT if annual revenue < €14,500.',
      'Revenue ceiling for Simplified Regime: €200,000/year.',
    ],
  };
}
