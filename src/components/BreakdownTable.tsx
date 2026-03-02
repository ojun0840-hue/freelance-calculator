import type { BreakdownItem } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import Tooltip from './Tooltip';

interface BreakdownTableProps {
  grossRevenue: number;
  takeHome: number;
  breakdown: BreakdownItem[];
}

export default function BreakdownTable({ grossRevenue, takeHome, breakdown }: BreakdownTableProps) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-slate-700">
            <td className="px-4 py-3 text-slate-300">Gross Revenue</td>
            <td className="px-4 py-3 text-right text-white tabular-nums font-medium">
              {formatCurrency(grossRevenue)}
            </td>
            <td className="px-4 py-3 w-10"></td>
          </tr>
          {breakdown.map((item, index) => (
            <tr key={index} className="border-b border-slate-700">
              <td className="px-4 py-3 text-slate-300 flex items-center">
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.label}
              </td>
              <td className="px-4 py-3 text-right text-red-400 tabular-nums">
                -{formatCurrency(item.amount)}
              </td>
              <td className="px-4 py-3 w-10 text-center">
                <Tooltip content={item.tooltip} />
              </td>
            </tr>
          ))}
          <tr className="bg-slate-700/50">
            <td className="px-4 py-4 text-white font-bold">Take-Home</td>
            <td className="px-4 py-4 text-right text-emerald-400 tabular-nums font-bold text-lg">
              {formatCurrency(takeHome)}
            </td>
            <td className="px-4 py-4 w-10"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
