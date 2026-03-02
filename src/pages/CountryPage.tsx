import { useEffect } from 'react';
import type { CountryCode } from '../types';
import { countries } from '../data/countries';
import CalculatorPage from './CalculatorPage';

interface CountryPageProps {
  countryCode: CountryCode;
}

const seoData: Record<CountryCode, { title: string; description: string }> = {
  DE: {
    title: 'Germany Freelance Tax Calculator 2025 — Freiberufler Take-Home',
    description: 'Calculate your real take-home pay as a Freiberufler in Germany. Income tax, health insurance, solidarity surcharge — instant results.',
  },
  NL: {
    title: 'Netherlands ZZP Tax Calculator 2026 — Freelance Take-Home',
    description: 'Calculate your ZZP take-home pay in the Netherlands. Income tax, ZVW, self-employment deductions — all calculated instantly.',
  },
  FR: {
    title: 'France Auto-Entrepreneur Calculator 2025 — Micro-Entreprise Tax',
    description: 'Calculate your take-home as an Auto-Entrepreneur in France. Social charges, income tax, CFP — instant breakdown.',
  },
  ES: {
    title: 'Spain Autónomo Tax Calculator 2025 — Freelance Take-Home',
    description: 'Calculate your Autónomo take-home pay in Spain. IRPF, social security (cuota), Tarifa Plana — all included.',
  },
  PT: {
    title: 'Portugal Freelance Tax Calculator 2025 — Take-Home Pay',
    description: 'Calculate your freelance take-home in Portugal. IRS, social security, Simplified Regime — instant results.',
  },
};

export default function CountryPage({ countryCode }: CountryPageProps) {
  const country = countries.find(c => c.code === countryCode);
  const seo = seoData[countryCode];

  useEffect(() => {
    document.title = seo.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seo.description);
  }, [seo]);

  return (
    <div>
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country?.flag}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {country?.name} Freelance Tax Calculator
              </h1>
              <p className="text-slate-400">
                Calculate your take-home pay as a {country?.freelanceType}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CalculatorPage defaultCountry={countryCode} />
    </div>
  );
}
