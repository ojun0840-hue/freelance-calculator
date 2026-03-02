import type { CountryCode, CalculationResult, CountryOptions } from '../types';
import { calculateGermany } from './germany';
import { calculateNetherlands } from './netherlands';
import { calculateFrance } from './france';
import { calculateSpain } from './spain';
import { calculatePortugal } from './portugal';

export function calculate(
  country: CountryCode,
  annualRevenue: number,
  expenses: number,
  options: CountryOptions
): CalculationResult {
  switch (country) {
    case 'DE': return calculateGermany(annualRevenue, expenses, options);
    case 'NL': return calculateNetherlands(annualRevenue, expenses, options);
    case 'FR': return calculateFrance(annualRevenue, expenses, options);
    case 'ES': return calculateSpain(annualRevenue, expenses, options);
    case 'PT': return calculatePortugal(annualRevenue, expenses, options);
  }
}
