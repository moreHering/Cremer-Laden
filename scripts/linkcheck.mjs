// Prüft nach `npm run build`, dass alle internen Links und Bilder in dist/
// den Basis-Pfad /Cremer-Laden/ tragen und auf existierende Dateien zeigen.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const BASIS = '/Cremer-Laden/';

async function* htmlDateien(ordner) {
  for (const eintrag of await readdir(ordner, { withFileTypes: true })) {
    const pfad = join(ordner, eintrag.name);
    if (eintrag.isDirectory()) yield* htmlDateien(pfad);
    else if (eintrag.name.endsWith('.html')) yield pfad;
  }
}

const entities = (text) => text.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');

const fehler = [];
let geprueft = 0;

for await (const datei of htmlDateien(DIST)) {
  const html = await readFile(datei, 'utf8');
  const seite = relative(DIST, datei);

  const links = [...html.matchAll(/\s(?:href|src)="([^"]*)"/g)].map((m) => m[1]);
  const srcsets = [...html.matchAll(/\ssrcset="([^"]*)"/g)].flatMap((m) =>
    m[1].split(',').map((teil) => teil.trim().split(/\s+/)[0]),
  );

  for (const roh of [...links, ...srcsets]) {
    const link = entities(roh);
    if (!link || /^(https?:|mailto:|tel:|data:|#)/.test(link)) continue;
    geprueft++;

    if (!link.startsWith(BASIS)) {
      fehler.push(`${seite}: „${link}“ ohne Basis-Pfad ${BASIS}`);
      continue;
    }

    const ziel = decodeURIComponent(link.slice(BASIS.length).split(/[?#]/)[0]);
    const datei = ziel === '' || ziel.endsWith('/') ? join(DIST, ziel, 'index.html') : join(DIST, ziel);

    try {
      await stat(datei);
    } catch {
      fehler.push(`${seite}: „${link}“ zeigt ins Leere`);
    }
  }
}

if (fehler.length) {
  console.error(`✗ ${fehler.length} fehlerhafte Links (von ${geprueft} geprüften):`);
  for (const zeile of fehler) console.error(`  - ${zeile}`);
  process.exit(1);
}

console.log(`✓ Alle ${geprueft} internen Links und Bilder sind in Ordnung.`);
