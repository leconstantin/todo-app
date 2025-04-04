import { defineCollection, defineConfig } from "@content-collections/core";

const blog = defineCollection({
  name: "Blog",
  directory: "src/content/blog",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    author: z.string(),
    publishedOn: z.string(),
    slug: z.string(),
  }),
  onSuccess: (docs) => {
    console.log(`generated collection with ${docs.length}`);
  },
});

export default defineConfig({
  collections: [blog],
});