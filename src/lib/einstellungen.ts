import daten from '../data/einstellungen.json';

/** Allgemeine Angaben, pflegbar unter „Einstellungen“ in der Admin-Oberfläche. */
export interface Einstellungen {
  name: string;
  email: string;
  instagram?: string;
  versandText: string;
  pause: { aktiv: boolean; text: string };
  impressum: { name: string; strasse: string; ort: string; telefon?: string; email: string };
}

export const einstellungen: Einstellungen = daten;

export function mailLink(betreff: string, text?: string): string {
  const parameter = new URLSearchParams({ subject: betreff });
  if (text) parameter.set('body', text);
  // URLSearchParams kodiert Leerzeichen als „+“ – E-Mail-Programme erwarten %20
  return `mailto:${einstellungen.email}?${parameter.toString().replace(/\+/g, '%20')}`;
}
