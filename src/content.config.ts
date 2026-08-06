import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().int(),
    order: z.number().int(),
    status: z.enum(['concept', 'development', 'complete']),
    domain: z.array(z.string()).min(1),
    technologies: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
