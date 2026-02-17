import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// About collection schema
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/about" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      meta_title: z.string().optional(),
      image: image().optional(),
      draft: z.boolean().optional(),
      what_i_do: z.object({
        title: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        ),
      }),
  }),
});

// Contact collection schema
const contactCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/contact" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      meta_title: z.string().optional(),
      description: z.string().optional(),
      image: image().optional(),
      draft: z.boolean().optional(),
    }),
});

// Authors collection schema
const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/authors" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      meta_title: z.string().optional(),
      image: image().optional(),
      description: z.string().optional(),
      social: z
        .object({
          facebook: z.string().url().optional(),
          x: z.string().url().optional(),
          instagram: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          github: z.string().url().optional(),
          website: z.string().url().optional(),
          youtube: z.string().url().optional(),
        })
        .optional(),
    }),
});

// Posts collection schema
const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      meta_title: z.string().optional(),
      description: z.string().optional(),
      date: z.date().optional(),
      image: image().optional(),
      categories: z.array(z.string()).default(["others"]),
      authors: z.array(z.string()).default(["Admin"]),
      tags: z.array(z.string()).default(["others"]),
      draft: z.boolean().optional(),
    }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      id: z.string().optional(),
      title: z.string(),
      meta_title: z.string().optional(),
      description: z.string().optional(),
      image: image().optional(),
      layout: z.string().optional(),
      draft: z.boolean().optional(),
    }),
});

// Export collections
export const collections = {
  posts: postsCollection,
  about: aboutCollection,
  contact: contactCollection,
  authors: authorsCollection,
  pages: pagesCollection,
};
