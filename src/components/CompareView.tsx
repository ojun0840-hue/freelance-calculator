import type { CalculationResult } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { countries } from '../data/countries';
import ResultCard from './ResultCard';

interface CompareViewProps {
  resultA: CalculationResult;
  resultB: CalculationResult;
}

export default function CompareView({ resultA, resultB }: CompareViewProps) {
  const countryA = countries.find(c => c.code === resultA.country);
  const countryB = countries.find(c => c.code === resultB.country);

  const difference = resultB.takeHome - resultA.takeHome;
  const betterCountry = difference > 0 ? countryB : countryA;
  const absDiff = Math.abs(difference);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>{countryA?.flag}</span> {countryA?.name}
          </h3>
          <ResultCard result={resultA} showTips={false} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>{countryB?.flag}</span> {countryB?.name}
          </h3>
          <ResultCard result={resultB} showTips={false} />
        </div>
      </div>

      {absDiff > 0 && (
        <div className={`rounded-lg p-4 text-center ${
          difference !== 0
            ? 'bg-emerald-500/10 border border-emerald-500/30'
            : 'bg-slate-800 border border-slate-700'
        }`}>
          <p className={`text-lg font-medium ${
            difference !== 0 ? 'text-emerald-400' : 'text-slate-400'
          }`}>
            {difference === 0 ? (
              'Both countries result in the same take-home pay'
            ) : (
              <>
                You'd keep <span className="font-bold">{formatCurrency(absDiff)}</span> more per year in{' '}
                <span className="font-bold">{betterCountry?.flag} {betterCountry?.name}</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
