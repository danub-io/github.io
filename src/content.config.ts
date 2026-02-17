import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    image: image().optional(),
    categories: z.array(z.string()).default(["others"]),
    authors: z.array(z.string()).default(["admin"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional(),
  }),
});

const authorsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/authors" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    image: image().optional(),
    description: z.string().optional(),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
  authors: authorsCollection,
  pages: pagesCollection,
};
