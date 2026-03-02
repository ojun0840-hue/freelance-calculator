import type { CountryCode, CountryOptions } from '../types';

interface OptionsPanelProps {
  country: CountryCode;
  options: CountryOptions;
  onChange: <K extends keyof CountryOptions>(key: K, value: CountryOptions[K]) => void;
}

export default function OptionsPanel({ country, options, onChange }: OptionsPanelProps) {
  const renderCheckbox = (
    key: keyof CountryOptions,
    label: string,
    checked: boolean = false
  ) => (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={options[key] as boolean ?? checked}
        onChange={(e) => onChange(key, e.target.checked)}
        className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
      />
      <span className="text-slate-300">{label}</span>
    </label>
  );

  const renderRadio = (
    key: keyof CountryOptions,
    value: string,
    label: string
  ) => (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name={key}
        checked={options[key] === value}
        onChange={() => onChange(key, value as CountryOptions[typeof key])}
        className="w-5 h-5 border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
      />
      <span className="text-slate-300">{label}</span>
    </label>
  );

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <h3 className="text-sm font-medium text-slate-400 mb-3">Options</h3>
      <div className="space-y-3">
        {country === 'DE' && (
          <>
            {renderCheckbox('churchTax', 'Church tax member')}
            {renderCheckbox('hasChildren', 'Has children (lower care insurance)')}
          </>
        )}

        {country === 'NL' && (
          <>
            {renderCheckbox('meetsHoursCriterion', 'Meets 1,225 hours criterion', true)}
            {renderCheckbox('isStartup', 'Startup (first 3 years)')}
          </>
        )}

        {country === 'FR' && (
          <>
            <div className="space-y-2">
              <span className="text-sm text-slate-400">Tax Regime</span>
              <div className="flex flex-col gap-2 pl-1">
                {renderRadio('regime', 'micro', 'Micro-Entreprise')}
                {renderRadio('regime', 'normal', 'Standard Regime')}
              </div>
            </div>
            {options.regime === 'micro' && (
              <div className="pt-2">
                {renderCheckbox('versementLiberatoire', 'Versement Libératoire (flat tax)')}
              </div>
            )}
          </>
        )}

        {country === 'ES' && (
          <>
            {renderCheckbox('isNewAutonomo', 'New Autónomo (Tarifa Plana €80/month)')}
          </>
        )}

        {country === 'PT' && (
          <>
            {renderCheckbox('isFirstYear', 'First year (Social Security exempt)')}
            {renderCheckbox('isNHR', 'NHR status')}
          </>
        )}
      </div>
    </div>
  );
}
