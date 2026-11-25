import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '*/{en,pt-br}.{md,mdx}',
  }),

  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    context: z.string(),

    image: image(),
    imageAlt: z.string(),

    metadata: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ).default([]),

    order: z.number().int(),

    featured: z.boolean().default(false),
    showOnHome: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
};