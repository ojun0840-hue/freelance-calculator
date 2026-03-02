import type { CountryMeta } from '../types';

export const countries: CountryMeta[] = [
  { code: 'DE', name: 'Germany', flag: '🇩🇪', freelanceType: 'Freiberufler', currency: 'EUR', taxYear: 2025, slug: 'germany' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', freelanceType: "ZZP'er", currency: 'EUR', taxYear: 2026, slug: 'netherlands' },
  { code: 'FR', name: 'France', flag: '🇫🇷', freelanceType: 'Auto-Entrepreneur', currency: 'EUR', taxYear: 2025, slug: 'france' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', freelanceType: 'Autónomo', currency: 'EUR', taxYear: 2025, slug: 'spain' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', freelanceType: 'Trabalhador Independente', currency: 'EUR', taxYear: 2025, slug: 'portugal' },
];

export function getCountryByCode(code: string): CountryMeta | undefined {
  return countries.find(c => c.code === code);
}

export function getCountryBySlug(slug: string): CountryMeta | undefined {
  return countries.find(c => c.slug === slug);
}
