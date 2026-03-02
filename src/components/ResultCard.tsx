import type { CalculationResult } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatPercent } from '../utils/formatPercent';
import BreakdownChart from './BreakdownChart';
import BreakdownTable from './BreakdownTable';

interface ResultCardProps {
  result: CalculationResult;
  showTips?: boolean;
}

export default function ResultCard({ result, showTips = true }: ResultCardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="text-center mb-6">
          <p className="text-slate-400 text-sm mb-2">Annual Take-Home</p>
          <p className="text-4xl font-bold text-emerald-400 tabular-nums">
            {formatCurrency(result.takeHome)}
          </p>
          <p className="text-slate-400 mt-2">
            Effective Tax Rate: <span className="text-white font-medium">{formatPercent(result.effectiveRate)}</span>
          </p>
        </div>

        <BreakdownChart
          grossRevenue={result.grossRevenue}
          takeHome={result.takeHome}
          breakdown={result.breakdown}
        />
      </div>

      <BreakdownTable
        grossRevenue={result.grossRevenue}
        takeHome={result.takeHome}
        breakdown={result.breakdown}
      />

      {showTips && result.tips.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-medium mb-3">Tips</h4>
          <ul className="space-y-2">
            {result.tips.map((tip, index) => (
              <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
