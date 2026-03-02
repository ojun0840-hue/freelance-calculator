import type { CalculationResult, CountryOptions } from '../types';

export function calculateFrance(
  annualRevenue: number,
  expenses: number,
  options: CountryOptions
): CalculationResult {
  const isMicro = options.regime !== 'normal';

  if (isMicro) {
    // === Micro-Entreprise / Auto-Entrepreneur ===

    // Social Charges: 23.1% of revenue for services
    const socialCharges = Math.round(annualRevenue * 0.231);

    // CFP (Professional Training): 0.2%
    const cfp = Math.round(annualRevenue * 0.002);

    // Income Tax
    let incomeTax: number;
    if (options.versementLiberatoire) {
      // Flat tax: 2.2% of revenue
      incomeTax = Math.round(annualRevenue * 0.022);
    } else {
      // Progressive tax on 66% of revenue
      const taxableIncome = Math.round(annualRevenue * 0.66);
      incomeTax = calculateFrenchIncomeTax(taxableIncome);
    }

    const totalDeductions = socialCharges + cfp + incomeTax;
    const takeHome = annualRevenue - totalDeductions;

    return {
      country: 'FR',
      grossRevenue: annualRevenue,
      taxableIncome: Math.round(annualRevenue * 0.66),
      takeHome,
      effectiveRate: annualRevenue > 0 ? Math.round((totalDeductions / annualRevenue) * 1000) / 10 : 0,
      breakdown: [
        { label: 'Social Charges', amount: socialCharges, tooltip: 'Cotisations sociales: 23.1% of revenue for service businesses. Covers health, retirement, and family benefits.', color: '#ef4444' },
        { label: 'Income Tax', amount: incomeTax, tooltip: options.versementLiberatoire ? 'Versement Libératoire: flat 2.2% of revenue (opt-in).' : 'Progressive income tax on 66% of revenue (34% automatic deduction for BNC).', color: '#f97316' },
        { label: 'Professional Training (CFP)', amount: cfp, tooltip: 'Contribution à la Formation Professionnelle: 0.2% of revenue.', color: '#eab308' },
      ],
      tips: [
        'Micro-Entreprise: social charges are % of revenue, not profit.',
        'Revenue ceiling: €77,700/year for service businesses.',
        'Versement Libératoire = simple flat tax but only if household income qualifies.',
        'No VAT if revenue < €36,800 (Franchise de TVA).',
      ],
    };
  } else {
    // Standard regime
    const profit = Math.max(0, annualRevenue - expenses);
    const socialCharges = Math.round(profit * 0.45);
    const taxableAfterSocial = profit - socialCharges;
    const incomeTax = calculateFrenchIncomeTax(taxableAfterSocial);
    const totalDeductions = socialCharges + incomeTax;

    return {
      country: 'FR',
      grossRevenue: annualRevenue,
      taxableIncome: taxableAfterSocial,
      takeHome: annualRevenue - totalDeductions,
      effectiveRate: annualRevenue > 0 ? Math.round((totalDeductions / annualRevenue) * 1000) / 10 : 0,
      breakdown: [
        { label: 'Social Charges', amount: socialCharges, tooltip: 'Approximately 45% of net profit for the standard regime.', color: '#ef4444' },
        { label: 'Income Tax', amount: incomeTax, tooltip: 'Progressive tax on income after social charges deduction.', color: '#f97316' },
      ],
      tips: [
        'Standard regime: deduct actual expenses from revenue.',
        'Social charges are ~45% of profit (health, retirement, etc.).',
      ],
    };
  }
}

function calculateFrenchIncomeTax(taxableIncome: number): number {
  let tax = 0;
  if (taxableIncome <= 11497) {
    tax = 0;
  } else if (taxableIncome <= 29315) {
    tax = (taxableIncome - 11497) * 0.11;
  } else if (taxableIncome <= 83823) {
    tax = (29315 - 11497) * 0.11 + (taxableIncome - 29315) * 0.30;
  } else if (taxableIncome <= 180294) {
    tax = (29315 - 11497) * 0.11 + (83823 - 29315) * 0.30 + (taxableIncome - 83823) * 0.41;
  } else {
    tax = (29315 - 11497) * 0.11 + (83823 - 29315) * 0.30 + (180294 - 83823) * 0.41 + (taxableIncome - 180294) * 0.45;
  }
  return Math.round(tax);
}
