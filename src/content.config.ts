import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const titled = z.object({ title: z.string(), text: z.string() });

// Case studies → /work/<file-name>/, also shown on the homepage (featured) and on service pages (relatedWork).
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    industry: z.string(),
    platform: z.string(),
    plan: z.string().optional(),
    disciplines: z.array(z.enum(['Build', 'Grow', 'Run'])).default([]),
    meta: z.string(),
    summary: z.string(),
    headline: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    url: z.string().optional(),
    results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    challenge: z.string(),
    approach: z.array(z.object({ discipline: z.enum(['Build', 'Grow', 'Run']), text: z.string() })).default([]),
    gallery: z.array(z.object({ src: z.string().optional(), alt: z.string() })).default([]),
    testimonial: z.object({ quote: z.string(), name: z.string(), role: z.string() }).optional(),
    tools: z.array(z.string()).default([]),
  }),
});

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

// Legal pages written in Markdown → /<file-name>/ (privacy, cookies). The imprint is built from site.json.
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string(),
    noindex: z.boolean().default(false),
  }),
});

export const collections = { work, services, legal };
