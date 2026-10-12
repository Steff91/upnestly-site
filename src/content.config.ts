import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Case studies shown in the "Selected work" section and on service pages.
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    meta: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    url: z.string().optional(),
  }),
});

const titled = z.object({ title: z.string(), text: z.string() });

// One file per service → /services/<file-name>/
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    discipline: z.enum(['Build', 'Grow', 'Run']),
    excerpt: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroTitle: z.string(),
    heroText: z.string(),
    painsTitle: z.string().default('Sound familiar?'),
    pains: z.array(titled).default([]),
    deliverablesTitle: z.string().default('What we do'),
    deliverables: z.array(titled).default([]),
    inPlans: z.object({ essentials: z.string(), growth: z.string(), scale: z.string() }),
    steps: z.array(titled).default([]),
    tools: z.array(z.string()).default([]),
    relatedWork: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { work, services };
