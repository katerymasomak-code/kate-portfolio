// ────────────────────────────────────────────────────────────────────────────
//  Blog content collections.
//
//  Two blogs, each a folder of Markdown files:
//    • Projects Blog → src/content/projects/*.md  (URL: /blog/projects/<slug>)
//
//  The filename (without ".md") becomes the URL slug. Add a file, fill in the
//  frontmatter below, write Markdown, and it appears — sorted newest-first by
//  `pubDate`. Set `draft: true` to keep a post out of the production build.
// ────────────────────────────────────────────────────────────────────────────
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = ({ image }: { image: () => any }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Optional lead image (rendered full-width above the post + used on cards).
    cover: image().optional(),
    coverAlt: z.string().default(''),
    priority: z.number().default(999)
  });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: blogSchema,
});

export const collections = { projects };
