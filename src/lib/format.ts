const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

/** 24 → „24,00 €“ */
export function preis(betrag: number): string {
  return euro.format(betrag);
}

export type Status = 'verfuegbar' | 'reserviert' | 'verkauft';

export const statusText: Record<Status, string> = {
  verfuegbar: 'verfügbar',
  reserviert: 'reserviert',
  verkauft: 'verkauft',
};

export const fokusWerte = ['mitte', 'oben', 'unten', 'links', 'rechts'] as const;
export type Fokus = (typeof fokusWerte)[number];

/** Bildfokus aus dem CMS → CSS object-position (links/rechts für Querformate, oben/unten für Hochformate) */
export const fokusPosition: Record<Fokus, string> = {
  mitte: '50% 50%',
  oben: '50% 15%',
  unten: '50% 85%',
  links: '15% 50%',
  rechts: '85% 50%',
};
