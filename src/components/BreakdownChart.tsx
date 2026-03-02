import type { BreakdownItem } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface BreakdownChartProps {
  grossRevenue: number;
  takeHome: number;
  breakdown: BreakdownItem[];
}

export default function BreakdownChart({ grossRevenue, takeHome, breakdown }: BreakdownChartProps) {
  if (grossRevenue <= 0) return null;

  const takeHomePercent = (takeHome / grossRevenue) * 100;

  return (
    <div className="space-y-4">
      <div className="h-12 flex rounded-lg overflow-hidden">
        <div
          className="bg-emerald-500 flex items-center justify-center transition-all duration-300"
          style={{ width: `${Math.max(takeHomePercent, 0)}%` }}
        >
          {takeHomePercent > 15 && (
            <span className="text-white text-sm font-medium px-2 truncate">
              Take-Home
            </span>
          )}
        </div>
        {breakdown.map((item, index) => {
          const percent = (item.amount / grossRevenue) * 100;
          return (
            <div
              key={index}
              className="flex items-center justify-center transition-all duration-300"
              style={{
                width: `${percent}%`,
                backgroundColor: item.color,
              }}
            >
              {percent > 10 && (
                <span className="text-white text-xs font-medium px-1 truncate">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
          <span className="text-slate-300">Take-Home: {formatCurrency(takeHome)}</span>
        </div>
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-slate-300">{item.label}: {formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
