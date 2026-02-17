import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://gospelreads.com",
  prefetch: true,
  integrations: [
    react(),
    sitemap(),
    mdx({ optimize: true }),
  ],
  vite: {
    plugins: [tailwind()],
  },
});