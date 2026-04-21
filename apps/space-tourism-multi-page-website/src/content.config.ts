import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    info: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
  }),
})

const members = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    position: z.string(),
    description: z.string(),
    prevLink: z.string().optional(),
    nextLink: z.string().optional(),
  }),
})

const technologies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/technologies' }),
  schema: z.object({
    title: z.string(),
    imageName: z.string(),
    description: z.string(),
  }),
})

export const collections = { destinations, members, technologies }
