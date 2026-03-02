import { useState, useMemo } from 'react';
import type { CountryCode, CountryOptions } from '../types';
import { countries } from '../data/countries';
import { calculate } from '../calculators';
import CountrySelector from '../components/CountrySelector';
import IncomeInput from '../components/IncomeInput';
import CompareView from '../components/CompareView';
import Disclaimer from '../components/Disclaimer';

export default function ComparePage() {
  const [countryA, setCountryA] = useState<CountryCode>('DE');
  const [countryB, setCountryB] = useState<CountryCode>('NL');
  const [annualRevenue, setAnnualRevenue] = useState<number>(60000);
  const [expenses, setExpenses] = useState<number>(0);

  const optionsA: CountryOptions = useMemo(() => ({
    meetsHoursCriterion: true,
    regime: 'micro',
  }), []);

  const optionsB: CountryOptions = useMemo(() => ({
    meetsHoursCriterion: true,
    regime: 'micro',
  }), []);

  const resultA = useMemo(() => {
    return calculate(countryA, annualRevenue, expenses, optionsA);
  }, [countryA, annualRevenue, expenses, optionsA]);

  const resultB = useMemo(() => {
    return calculate(countryB, annualRevenue, expenses, optionsB);
  }, [countryB, annualRevenue, expenses, optionsB]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Compare Tax Rates
        </h1>
        <p className="text-slate-400">
          See how your take-home pay differs between countries
        </p>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <IncomeInput
            label="Annual Revenue"
            value={annualRevenue}
            onChange={setAnnualRevenue}
          />
          <IncomeInput
            label="Expenses"
            value={expenses}
            onChange={setExpenses}
            placeholder="e.g. 5,000"
          />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Country A
            </label>
            <select
              value={countryA}
              onChange={(e) => setCountryA(e.target.value as CountryCode)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Country B
            </label>
            <select
              value={countryB}
              onChange={(e) => setCountryB(e.target.value as CountryCode)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <CompareView resultA={resultA} resultB={resultB} />

      <Disclaimer />
    </div>
  );
}
