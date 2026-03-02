import type { CalculationResult, CountryOptions } from '../types';

export function calculateSpain(
  annualRevenue: number,
  expenses: number,
  options: CountryOptions
): CalculationResult {
  const profit = Math.max(0, annualRevenue - expenses);

  // === IRPF (Income Tax) Progressive ===
  let incomeTax = 0;
  const brackets = [
    { limit: 12450, rate: 0.19 },
    { limit: 20200, rate: 0.24 },
    { limit: 35200, rate: 0.30 },
    { limit: 60000, rate: 0.37 },
    { limit: 300000, rate: 0.45 },
    { limit: Infinity, rate: 0.47 },
  ];

  let remaining = profit;
  let prevLimit = 0;
  for (const bracket of brackets) {
    const taxable = Math.min(remaining, bracket.limit - prevLimit);
    if (taxable <= 0) break;
    incomeTax += taxable * bracket.rate;
    remaining -= taxable;
    prevLimit = bracket.limit;
  }
  incomeTax = Math.round(incomeTax);

  // === Autónomo Social Security (Cuota) ===
  let socialSecurity: number;
  if (options.isNewAutonomo) {
    socialSecurity = 80 * 12; // Tarifa Plana: €80/month
  } else {
    const monthlyNet = profit / 12;
    if (monthlyNet <= 670) socialSecurity = 225 * 12;
    else if (monthlyNet <= 1000) socialSecurity = 260 * 12;
    else if (monthlyNet <= 1500) socialSecurity = 290 * 12;
    else if (monthlyNet <= 2000) socialSecurity = 350 * 12;
    else if (monthlyNet <= 2500) socialSecurity = 400 * 12;
    else if (monthlyNet <= 3000) socialSecurity = 450 * 12;
    else if (monthlyNet <= 3500) socialSecurity = 490 * 12;
    else if (monthlyNet <= 4000) socialSecurity = 510 * 12;
    else socialSecurity = 530 * 12;
  }

  const totalDeductions = incomeTax + socialSecurity;
  const takeHome = annualRevenue - totalDeductions;

  return {
    country: 'ES',
    grossRevenue: annualRevenue,
    taxableIncome: profit,
    takeHome,
    effectiveRate: annualRevenue > 0 ? Math.round((totalDeductions / annualRevenue) * 1000) / 10 : 0,
    breakdown: [
      { label: 'Income Tax (IRPF)', amount: incomeTax, tooltip: 'Progressive tax: 19% to 47%. Quarterly advance payments (Modelo 130) = 20% of net profit.', color: '#ef4444' },
      { label: 'Social Security (Cuota)', amount: socialSecurity, tooltip: options.isNewAutonomo ? 'Tarifa Plana: €80/month for first 12 months.' : 'Income-based contribution from €225 to €530/month depending on net income.', color: '#f97316' },
    ],
    tips: [
      options.isNewAutonomo ? 'Tarifa Plana: only €80/month for your first year!' : 'Social security is based on your real income since 2023.',
      'File quarterly: Modelo 303 (VAT) + Modelo 130 (income tax advance).',
      'Deductible expenses: home office (30%), phone, internet, travel.',
      'VAT (IVA) is 21% on most services.',
    ],
  };
}
