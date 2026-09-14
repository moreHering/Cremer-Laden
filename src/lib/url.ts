/**
 * Baut einen internen Link inklusive Basis-Pfad (z. B. /Cremer-Laden/).
 * Seitenpfade bekommen immer einen abschließenden Schrägstrich,
 * Dateien (mit Endung), Anker und Query-Strings bleiben unverändert.
 *
 *   url('/')              → /Cremer-Laden/
 *   url('aquarelle')      → /Cremer-Laden/aquarelle/
 *   url('/favicon.svg')   → /Cremer-Laden/favicon.svg
 *   url('kontakt#mail')   → /Cremer-Laden/kontakt/#mail
 */
export function url(pfad: string = '/'): string {
  const basis = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const [, roh = '', anhang = ''] = pfad.match(/^([^?#]*)(.*)$/) ?? [];
  let weg = roh.replace(/^\/+/, '');

  if (weg && !weg.endsWith('/') && !/\.[a-z0-9]+$/i.test(weg)) {
    weg += '/';
  }

  return `${basis}/${weg}${anhang}`;
}

/** Vergleicht einen Pfad mit der aktuellen Seite (für aria-current in der Navigation). */
export function istAktiv(aktuellerPfad: string, ziel: string): boolean {
  const zielUrl = url(ziel);
  if (zielUrl === url('/')) return aktuellerPfad === zielUrl;
  return aktuellerPfad.startsWith(zielUrl);
}
