import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectKey = z.enum(['school', 'cog', 'energy', 'library', 'cctv', 'weather']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    key: projectKey,
    title: z.string(),
    summary: z.string(),
    overview: z.string(),
    year: z.number().int(),
    order: z.number().int(),
    status: z.enum(['concept', 'development', 'complete']),
    domain: z.array(z.string()).min(1),
    technologies: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    repository: z.url().optional(),
    presentation: z.object({
      kicker: z.string(),
      category: z.string(),
      cardSize: z.enum(['narrow', 'wide']),
      cardArtClass: z.string(),
      caseArtClass: z.string(),
      role: z.string(),
      timeline: z.string(),
      projectStatus: z.string(),
    }),
    caseStudy: z.object({
      problem: z.string(),
      approach: z.string(),
      architecture: z.array(z.string()).min(1),
      decisions: z.array(z.string()).min(1),
      limitations: z.string(),
      nextIteration: z.string(),
    }),
    gallery: z.object({
      labels: z.array(z.string()).min(1),
      manifest: z.string().startsWith('/').optional(),
      title: z.string().optional(),
      featuredImages: z.array(z.string()).default([]),
    }),
  }),
});

export const collections = { projects };
