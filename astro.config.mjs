// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Die Seite läuft als GitHub-Pages-Projektseite unter
// https://morehering.github.io/Cremer-Laden/
// Bei einer eigenen Domain später: site anpassen und base entfernen.
export default defineConfig({
  site: 'https://morehering.github.io',
  base: '/Cremer-Laden',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
