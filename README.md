# Cremer-Laden

Website für handgemalte Aquarelle und Ohrringe aus Miyuki-Perlen.
Live unter **https://morehering.github.io/Cremer-Laden/**

---

## Für die Kundin: So pflegst du deinen Laden

Alles, was du regelmäßig brauchst, erledigst du in der Verwaltung unter
**https://morehering.github.io/Cremer-Laden/admin/** – ganz ohne Programmierkenntnisse.
Nach dem Speichern dauert es etwa **2–3 Minuten**, bis die Änderung online zu sehen ist.

### 1. Einmalig: Anmelden

1. Du brauchst ein kostenloses GitHub-Konto, das Zugriff auf das Repository hat (lass dich dafür einladen).
2. Öffne die Verwaltung und klicke auf **„Sign In with Token“**.
3. Folge dem Link zu GitHub. Die nötigen Berechtigungen sind dort schon ausgewählt.
   Wähle ein Ablaufdatum (z. B. 1 Jahr), klicke auf **„Generate token“** und kopiere den Schlüssel.
4. Füge den Schlüssel in der Verwaltung ein – fertig. Er bleibt nur in deinem Browser gespeichert.

### 2. Neues Aquarell oder neue Ohrringe anlegen

1. Links **Aquarelle** oder **Ohrringe** wählen → **„Neu“**.
2. **Titel, Preis und Status** eintragen.
3. **Fotos** hochladen:
   - Das erste Foto ist das Titelbild.
   - Am schönsten: **Hochformat 4:5**, Tageslicht, heller ruhiger Hintergrund.
   - Große Handyfotos werden automatisch verkleinert.
   - Bei jedem Foto kurz beschreiben, was zu sehen ist.
   - Passt ein Foto nicht ins Hochformat (z. B. ein querformatiges Bild), wähle beim **Bildausschnitt**, welcher Teil sichtbar bleiben soll.
4. **Details** ausfüllen (Format, Perlen, Länge …) und **Motive bzw. Farben** eintragen – danach kann man in der Galerie filtern.
5. Optional: **„Auf der Startseite hervorheben“** anhaken.
6. **Kauf-Link** einfügen (siehe unten) – oder leer lassen, dann erscheint „Per E-Mail anfragen“.
7. **Speichern.**

### 3. Kauf-Link erstellen

**Stripe** (Dashboard → *Zahlungslinks* → *Neu*):

- Produkt mit Namen und Preis anlegen, Menge **nicht** anpassbar.
- *Adresse des Kunden erfassen* → Lieferadresse aktivieren.
- Versandkosten als *Versandtarif* hinterlegen.
- *Zustimmung zu den Nutzungsbedingungen verlangen* aktivieren (Link zu deinen AGB: `https://morehering.github.io/Cremer-Laden/agb/`).
- Link kopieren und beim Stück als Kauf-Link einfügen.

**PayPal** (Geschäftskonto → *Zahlungslinks und Buttons*): Link mit Preis und Versand erstellen, kopieren, einfügen und als Zahlungsanbieter „PayPal“ wählen.

### 4. Nach einem Verkauf

1. Den **Zahlungslink bei Stripe/PayPal deaktivieren**, damit das Stück nicht doppelt verkauft wird.
2. In der Verwaltung den **Status auf „verkauft“** setzen. Das Stück bleibt mit rotem Punkt in der Galerie sichtbar.

### 5. Weitere Einstellungen

- **Einstellungen → Allgemeine Angaben:** Vorname, E-Mail, Instagram, Versandinfo, Impressumsdaten.
- **Pause-Hinweis:** z. B. im Urlaub „Hinweis anzeigen“ anhaken – dann erscheint oben auf allen Seiten ein kleiner Hinweis.
- **Seiten → Über mich:** Text, Porträt und Werkstatt-Fotos.

### 6. Beispiele entfernen

Alle mitgelieferten Einträge sind als **„Beispiel“** markiert. Lösche sie, sobald deine eigenen Stücke drin sind.

---

## Vor dem Livegang (Checkliste)

- [ ] Echte Fotos und Texte eintragen, Beispiele löschen
- [ ] Vorname, E-Mail, Instagram und Versandkosten unter *Einstellungen* eintragen
- [ ] Impressumsdaten eintragen
- [ ] **Rechtstexte ersetzen** (Impressum, Datenschutz, AGB, Widerruf) – die mitgelieferten Texte sind nur Gerüste und keine Rechtsberatung
- [ ] Prüfen lassen, ob die Funktion „Vertrag widerrufen“ den seit 19.06.2026 geltenden Vorgaben genügt
- [ ] Stripe- bzw. PayPal-Links anlegen und eintragen

---

## Für Entwickler

### Technik

- [Astro 7](https://astro.build) – statische Seite, kein UI-Framework, CSS von Hand (`src/styles/tokens.css`)
- [Sveltia CMS](https://sveltiacms.app) unter `/admin` (Konfiguration: `public/admin/config.yml`)
- Deployment über GitHub Actions auf GitHub Pages (`.github/workflows/deploy.yml`)
- Schriften selbst gehostet über Fontsource (Fraunces, Nunito)

### Befehle

| Befehl                | Wirkung                                                  |
| --------------------- | -------------------------------------------------------- |
| `npm install`         | Abhängigkeiten installieren                              |
| `npm run dev`         | Entwicklungsserver unter `http://localhost:4321/Cremer-Laden/` |
| `npm run build`       | Seite nach `dist/` bauen (prüft auch alle Inhalte)       |
| `npm run preview`     | Gebaute Seite lokal ansehen                              |
| `npm run check`       | TypeScript- und Astro-Prüfung                            |
| `npm run check:links` | Interne Links in `dist/` prüfen (nach dem Build)         |

### Struktur

```
src/
  content.config.ts       Schema aller Inhalte (muss zu public/admin/config.yml passen)
  content/aquarelle/…     Ein Ordner pro Aquarell: index.md + Fotos
  content/ohrringe/…      Ein Ordner pro Paar: index.md + Fotos
  content/seiten/…        „Über mich“
  data/einstellungen.json Allgemeine Angaben
  components/             Bausteine (Produktbild, WerkKarte, BildKarussell, KaufBox …)
  layouts/                BaseLayout, RechtstextLayout
  pages/                  Alle Seiten
  lib/url.ts              url() – interne Links immer hierüber bauen (Basis-Pfad!)
  styles/                 Design-Tokens und globale Styles
```

### Designregeln

- Produktfotos immer über `Produktbild` (4:5, Radius 14 px, Schatten).
- Deko (`DekoFlaeche`, `Kritzelei`) nur im Hintergrund, **nie hinter oder über Produktfotos**, höchstens eine pro Abschnitt.
- Keine Handschrift-Schriften.

### Einrichtung GitHub Pages

Einmalig im Repository unter **Settings → Pages → Source** „**GitHub Actions**“ auswählen.
Jeder Push auf `main` (auch aus der Verwaltung) baut und veröffentlicht die Seite automatisch.

### Eigene Domain (später)

1. In `astro.config.mjs` `site` auf die Domain setzen und `base` entfernen.
2. Datei `public/CNAME` mit der Domain anlegen, DNS-Einträge beim Domain-Anbieter setzen.
3. In `public/admin/config.yml` `site_url`/`display_url` und in `public/admin/index.html` den Favicon-Pfad anpassen.
4. In `scripts/linkcheck.mjs` die Konstante `BASIS` auf `/` setzen.
