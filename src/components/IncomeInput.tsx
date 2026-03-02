import { useState, useEffect } from 'react';
import { formatNumber, parseNumber } from '../utils/formatCurrency';

interface IncomeInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export default function IncomeInput({ label, value, onChange, placeholder = "e.g. 60,000" }: IncomeInputProps) {
  const [displayValue, setDisplayValue] = useState(formatNumber(value));

  useEffect(() => {
    setDisplayValue(value > 0 ? formatNumber(value) : '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);

    const numeric = parseNumber(raw);
    onChange(numeric);
  };

  const handleBlur = () => {
    if (value > 0) {
      setDisplayValue(formatNumber(value));
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
          €
        </span>
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent tabular-nums"
        />
      </div>
    </div>
  );
}
