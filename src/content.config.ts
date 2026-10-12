import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Case studies shown in the "Selected work" section on the homepage.
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

export const collections = { work };
