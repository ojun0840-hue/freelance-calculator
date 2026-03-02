import type { CalculationResult, CountryOptions } from '../types';

export function calculateNetherlands(
  annualRevenue: number,
  expenses: number,
  options: CountryOptions
): CalculationResult {
  const profit = Math.max(0, annualRevenue - expenses);

  // === ZZP Deductions ===
  let selfEmploymentDeduction = 0;
  if (options.meetsHoursCriterion !== false) {
    selfEmploymentDeduction = 1200;
  }

  let startupDeduction = 0;
  if (options.isStartup && options.meetsHoursCriterion !== false) {
    startupDeduction = 2123;
  }

  // MKB Profit Exemption (12.7% of profit after deductions)
  const profitAfterDeductions = Math.max(0, profit - selfEmploymentDeduction - startupDeduction);
  const mkbExemption = Math.round(profitAfterDeductions * 0.127);

  const taxableIncome = Math.max(0, profitAfterDeductions - mkbExemption);

  // === Income Tax + Social Security (2026 brackets) ===
  let tax = 0;
  if (taxableIncome <= 38883) {
    tax = taxableIncome * 0.3570;
  } else if (taxableIncome <= 79137) {
    tax = 38883 * 0.3570 + (taxableIncome - 38883) * 0.3756;
  } else {
    tax = 38883 * 0.3570 + (79137 - 38883) * 0.3756 + (taxableIncome - 79137) * 0.4950;
  }
  tax = Math.round(tax);

  // === General Tax Credit (Algemene heffingskorting) ===
  let generalCredit = 0;
  if (taxableIncome <= 24813) {
    generalCredit = 3362;
  } else if (taxableIncome <= 79137) {
    generalCredit = Math.max(0, Math.round(3362 - 0.06187 * (taxableIncome - 24813)));
  }

  // === Labour Tax Credit (Arbeidskorting) ===
  let labourCredit = 0;
  if (taxableIncome <= 11491) {
    labourCredit = Math.round(taxableIncome * 0.08231);
  } else if (taxableIncome <= 24821) {
    labourCredit = Math.round(945 + 0.29861 * (taxableIncome - 11491));
  } else if (taxableIncome <= 39958) {
    labourCredit = Math.round(4926 + 0.03085 * (taxableIncome - 24821));
  } else if (taxableIncome <= 124935) {
    labourCredit = Math.round(5532 - 0.06510 * (taxableIncome - 39958));
  } else {
    labourCredit = 0;
  }

  const netTax = Math.max(0, tax - generalCredit - labourCredit);

  // === Health Insurance (ZVW) ===
  const healthBase = Math.min(profit, 69750);
  const healthContribution = Math.round(healthBase * 0.0526);
  const basicHealthPremium = 1900;

  // === Total ===
  const totalDeductions = netTax + healthContribution + basicHealthPremium;
  const takeHome = annualRevenue - totalDeductions;

  return {
    country: 'NL',
    grossRevenue: annualRevenue,
    taxableIncome,
    takeHome,
    effectiveRate: annualRevenue > 0 ? Math.round((totalDeductions / annualRevenue) * 1000) / 10 : 0,
    breakdown: [
      { label: 'Income Tax + Social Security', amount: netTax, tooltip: 'Combined income tax and national insurance. Rates: 35.70% (up to €38,883), 37.56% (up to €79,137), 49.50% above. Tax credits applied.', color: '#ef4444' },
      { label: 'Health Insurance (ZVW)', amount: healthContribution, tooltip: 'Income-dependent health insurance contribution: 5.26% of income.', color: '#f97316' },
      { label: 'Basic Health Premium', amount: basicHealthPremium, tooltip: 'Mandatory basic health insurance premium, ~€1,900/year. Paid to your chosen insurer.', color: '#eab308' },
    ],
    tips: [
      `Self-employment deduction: €${selfEmploymentDeduction} applied${options.isStartup ? ` + €${startupDeduction} startup deduction` : ''}.`,
      `MKB profit exemption: €${mkbExemption} (12.7% of profit after deductions).`,
      'You need to work 1,225+ hours/year to qualify for self-employment deduction.',
      'Turnover under €20,000? Consider the KOR scheme (no VAT returns).',
    ],
  };
}
