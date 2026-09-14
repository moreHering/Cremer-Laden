import { getCollection, type CollectionEntry } from 'astro:content';
import { url } from './url';

export type Aquarell = CollectionEntry<'aquarelle'>;
export type Ohrring = CollectionEntry<'ohrringe'>;
export type Produkt = Aquarell | Ohrring;
export type Sammlung = Produkt['collection'];

export const sammlungen: Record<Sammlung, { titel: string; einzahl: string; merkmal: string; einleitung: string }> = {
  aquarelle: {
    titel: 'Aquarelle',
    einzahl: 'Aquarell',
    merkmal: 'Motiv',
    einleitung:
      'Wiesen, Wasser, kleine Häuser – gemalt in vielen zarten Schichten auf Aquarellpapier. Jedes Bild gibt es nur ein einziges Mal.',
  },
  ohrringe: {
    titel: 'Ohrringe',
    einzahl: 'Ohrringe',
    merkmal: 'Farbe',
    einleitung:
      'Perle für Perle von Hand gefädelt, aus winzigen japanischen Miyuki-Perlen. Leicht zu tragen und meist nur als Einzelstück oder in ganz kleiner Zahl.',
  },
};

const statusRang = { verfuegbar: 0, reserviert: 1, verkauft: 2 } as const;

/** Verfügbare Stücke zuerst, innerhalb davon die neuesten. */
export function sortiere<T extends Produkt>(liste: T[]): T[] {
  return [...liste].sort(
    (a, b) =>
      statusRang[a.data.status] - statusRang[b.data.status] ||
      b.data.datum.getTime() - a.data.datum.getTime(),
  );
}

export async function ladeSammlung(sammlung: Sammlung): Promise<Produkt[]> {
  return sortiere(await getCollection(sammlung));
}

export async function alleProdukte(): Promise<Produkt[]> {
  const [aquarelle, ohrringe] = await Promise.all([getCollection('aquarelle'), getCollection('ohrringe')]);
  return [...aquarelle, ...ohrringe];
}

export function produktUrl(produkt: Produkt): string {
  return url(`${produkt.collection}/${produkt.id}`);
}

/** Eindeutiger Name für die Bild-Überblendung zwischen Galerie und Detailseite. */
export function transitionName(produkt: Produkt): string {
  return `werk-${produkt.collection}-${produkt.id}`.replace(/[^a-z0-9-]/gi, '-');
}

/** Kleine Galerie-Zeile unter dem Titel, z. B. „Aquarell · 24 × 30 cm · 2026“. */
export function metaZeile(produkt: Produkt): string {
  const teile =
    produkt.collection === 'aquarelle'
      ? ['Aquarell', produkt.data.format, produkt.data.jahr]
      : [produkt.data.perlen, produkt.data.haken, produkt.data.laenge];
  return teile.filter(Boolean).join(' · ');
}

/** Merkmale für den Filter: Motive bei Aquarellen, Farben bei Ohrringen. */
export function merkmale(produkt: Produkt): string[] {
  return produkt.collection === 'aquarelle' ? produkt.data.motive : produkt.data.farben;
}

/** Erster Absatz der Beschreibung als Klartext (für Meta-Beschreibungen). */
export function kurzbeschreibung(produkt: Produkt, laenge = 155): string {
  const absatz = (produkt.body ?? '')
    .replace(/[#*_>`[\]]/g, '')
    .trim()
    .split(/\n\s*\n/)[0]
    ?.replace(/\s+/g, ' ')
    .trim();
  if (!absatz) return `${produkt.data.titel} – handgemacht im Cremer-Laden.`;
  return absatz.length > laenge ? `${absatz.slice(0, laenge - 1).trimEnd()}…` : absatz;
}
