import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { fokusWerte } from './lib/format';

/**
 * Gemeinsame Felder aller Produkte.
 * Die Feldnamen entsprechen der Admin-Oberfläche in public/admin/config.yml –
 * Änderungen bitte immer an beiden Stellen vornehmen.
 */
const produkt = ({ image }: SchemaContext) =>
  z.object({
    titel: z.string().min(1),
    preis: z.number().nonnegative(),
    status: z.enum(['verfuegbar', 'reserviert', 'verkauft']).default('verfuegbar'),
    bilder: z
      .array(
        z.object({
          bild: image(),
          alt: z.string().min(1, 'Bitte beschreibe das Foto kurz (Alternativtext).'),
          bildfokus: z.enum(fokusWerte).default('mitte'),
        }),
      )
      .min(1, 'Mindestens ein Foto wird benötigt.'),
    kaufLink: z.union([z.url(), z.literal('')]).optional(),
    kaufAnbieter: z.enum(['stripe', 'paypal']).default('stripe'),
    datum: z.coerce.date(),
    hervorheben: z.boolean().default(false),
    beispiel: z.boolean().default(false),
  });

const aquarelle = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/aquarelle' }),
  schema: (kontext) =>
    produkt(kontext).extend({
      technik: z.string().default('Aquarell auf Papier'),
      format: z.string().min(1),
      jahr: z.number().int(),
      gerahmt: z.boolean().default(false),
      motive: z.array(z.string()).default([]),
    }),
});

const ohrringe = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/ohrringe' }),
  schema: (kontext) =>
    produkt(kontext).extend({
      perlen: z.string().default('Miyuki Delica 11/0'),
      haken: z.string().min(1),
      laenge: z.string().min(1),
      farben: z.array(z.string()).default([]),
      anzahl: z.number().int().nonnegative().default(1),
    }),
});

const seiten = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/seiten' }),
  schema: ({ image }) =>
    z.object({
      titel: z.string(),
      einleitung: z.string().optional(),
      portraet: z.object({ bild: image(), alt: z.string() }).optional(),
      werkstattBilder: z.array(z.object({ bild: image(), alt: z.string() })).default([]),
    }),
});

export const collections = { aquarelle, ohrringe, seiten };
