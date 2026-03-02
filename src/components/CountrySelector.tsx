import type { CountryCode } from '../types';
import { countries } from '../data/countries';

interface CountrySelectorProps {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
}

export default function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Country
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CountryCode)}
        className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name} ({country.freelanceType})
          </option>
        ))}
      </select>
    </div>
  );
}
