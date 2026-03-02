import { useCalculation } from '../hooks/useCalculation';
import CountrySelector from '../components/CountrySelector';
import IncomeInput from '../components/IncomeInput';
import OptionsPanel from '../components/OptionsPanel';
import ResultCard from '../components/ResultCard';
import Disclaimer from '../components/Disclaimer';
import { countries } from '../data/countries';
import type { CountryCode } from '../types';

interface CalculatorPageProps {
  defaultCountry?: CountryCode;
}

export default function CalculatorPage({ defaultCountry = 'DE' }: CalculatorPageProps) {
  const {
    country,
    setCountry,
    annualRevenue,
    setAnnualRevenue,
    expenses,
    setExpenses,
    options,
    updateOption,
    result,
  } = useCalculation(defaultCountry);

  const countryMeta = countries.find(c => c.code === country);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          EU Freelance Tax Calculator
        </h1>
        <p className="text-slate-400">
          Calculate your real take-home pay as a freelancer in Europe
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 space-y-4">
          <CountrySelector value={country} onChange={setCountry} />
          <IncomeInput
            label="Annual Revenue"
            value={annualRevenue}
            onChange={setAnnualRevenue}
          />
          <IncomeInput
            label="Business Expenses"
            value={expenses}
            onChange={setExpenses}
            placeholder="e.g. 5,000"
          />
          <OptionsPanel
            country={country}
            options={options}
            onChange={updateOption}
          />
        </div>

        <div className="md:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span>{countryMeta?.flag}</span>
              {countryMeta?.name} — {countryMeta?.freelanceType}
              <span className="text-sm font-normal text-slate-400">
                ({countryMeta?.taxYear} rates)
              </span>
            </h2>
          </div>
          <ResultCard result={result} />
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}
