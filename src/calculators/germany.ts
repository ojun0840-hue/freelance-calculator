import type { CalculationResult, CountryOptions } from '../types';

export function calculateGermany(
  annualRevenue: number,
  expenses: number,
  options: CountryOptions
): CalculationResult {
  const taxableIncome = Math.max(0, annualRevenue - expenses);

  // === Income Tax (Progressive) ===
  const basicAllowance = 12096;
  let incomeTax = 0;

  if (taxableIncome <= basicAllowance) {
    incomeTax = 0;
  } else if (taxableIncome <= 68480) {
    const y = (taxableIncome - basicAllowance) / 10000;
    incomeTax = (979.18 * y + 1400) * y;
  } else if (taxableIncome <= 277825) {
    incomeTax = 0.42 * taxableIncome - 10911.92;
  } else {
    incomeTax = 0.45 * taxableIncome - 19246.67;
  }
  incomeTax = Math.round(Math.max(0, incomeTax));

  // === Solidarity Surcharge ===
  let solidarity = 0;
  if (incomeTax > 19950) {
    solidarity = Math.round(incomeTax * 0.055);
  }

  // === Church Tax (Optional) ===
  const churchTax = options.churchTax ? Math.round(incomeTax * 0.09) : 0;

  // === Health Insurance ===
  const healthCeiling = 66150; // 2025 ceiling
  const healthBase = Math.min(taxableIncome, healthCeiling);
  const healthRate = 0.171; // 14.6% base + 2.5% average Zusatzbeitrag (2025)
  const healthInsurance = Math.round(healthBase * healthRate);

  // === Care Insurance ===
  const careRate = options.hasChildren ? 0.034 : 0.040; // 2025 rates
  const careInsurance = Math.round(healthBase * careRate);

  // === Total ===
  const totalDeductions = incomeTax + solidarity + churchTax + healthInsurance + careInsurance;
  const takeHome = annualRevenue - totalDeductions;

  return {
    country: 'DE',
    grossRevenue: annualRevenue,
    taxableIncome,
    takeHome,
    effectiveRate: annualRevenue > 0 ? Math.round((totalDeductions / annualRevenue) * 1000) / 10 : 0,
    breakdown: [
      { label: 'Income Tax', amount: incomeTax, tooltip: 'Progressive tax from 14% to 45%. First €12,096 is tax-free (Grundfreibetrag).', color: '#ef4444' },
      { label: 'Health Insurance', amount: healthInsurance, tooltip: 'Public health insurance (GKV). Freelancers pay 17.1% (14.6% base + 2.5% avg. Zusatzbeitrag). Capped at €66,150 income (2025).', color: '#f97316' },
      { label: 'Care Insurance', amount: careInsurance, tooltip: `Long-term care insurance (Pflegeversicherung). ${options.hasChildren ? '3.4%' : '4.0% (childless surcharge)'}. Same ceiling as health insurance.`, color: '#eab308' },
      { label: 'Solidarity Surcharge', amount: solidarity, tooltip: 'Only applies if your income tax exceeds €19,950. Most freelancers earning under ~€73K pay zero.', color: '#8b5cf6' },
      ...(churchTax > 0 ? [{ label: 'Church Tax', amount: churchTax, tooltip: '9% of income tax. Only if registered with a recognized church.', color: '#6b7280' }] : []),
    ],
    tips: [
      'Freiberufler are exempt from trade tax (Gewerbesteuer).',
      'Set aside ~40% of every invoice for taxes and insurance.',
      'Health insurance is your largest cost after income tax.',
      'Pension insurance is voluntary for most Freiberufler.',
    ],
  };
}
