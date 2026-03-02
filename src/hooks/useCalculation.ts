import { useState, useMemo, useCallback } from 'react';
import type { CountryCode, CountryOptions, CalculationResult } from '../types';
import { calculate } from '../calculators';

interface UseCalculationReturn {
  country: CountryCode;
  setCountry: (code: CountryCode) => void;
  annualRevenue: number;
  setAnnualRevenue: (value: number) => void;
  expenses: number;
  setExpenses: (value: number) => void;
  options: CountryOptions;
  setOptions: (options: CountryOptions) => void;
  updateOption: <K extends keyof CountryOptions>(key: K, value: CountryOptions[K]) => void;
  result: CalculationResult;
}

export function useCalculation(initialCountry: CountryCode = 'DE'): UseCalculationReturn {
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [annualRevenue, setAnnualRevenue] = useState<number>(60000);
  const [expenses, setExpenses] = useState<number>(0);
  const [options, setOptions] = useState<CountryOptions>({
    meetsHoursCriterion: true,
    regime: 'micro',
  });

  const updateOption = useCallback(<K extends keyof CountryOptions>(key: K, value: CountryOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  const result = useMemo(() => {
    return calculate(country, annualRevenue, expenses, options);
  }, [country, annualRevenue, expenses, options]);

  return {
    country,
    setCountry,
    annualRevenue,
    setAnnualRevenue,
    expenses,
    setExpenses,
    options,
    setOptions,
    updateOption,
    result,
  };
}
