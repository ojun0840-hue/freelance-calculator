export type CountryCode = 'DE' | 'NL' | 'FR' | 'ES' | 'PT';

export interface CountryMeta {
  code: CountryCode;
  name: string;
  flag: string;
  freelanceType: string;
  currency: string;
  taxYear: number;
  slug: string;
}

export interface CalculationInput {
  country: CountryCode;
  annualRevenue: number;
  expenses: number;
  options: CountryOptions;
}

export interface CountryOptions {
  // Germany
  churchTax?: boolean;
  hasChildren?: boolean;
  // Netherlands
  isStartup?: boolean;
  meetsHoursCriterion?: boolean;
  // France
  regime?: 'micro' | 'normal';
  versementLiberatoire?: boolean;
  // Spain
  isNewAutonomo?: boolean;
  // Portugal
  isFirstYear?: boolean;
  isNHR?: boolean;
}

export interface CalculationResult {
  country: CountryCode;
  grossRevenue: number;
  taxableIncome: number;
  takeHome: number;
  effectiveRate: number;
  breakdown: BreakdownItem[];
  tips: string[];
}

export interface BreakdownItem {
  label: string;
  amount: number;
  tooltip: string;
  color: string;
}
