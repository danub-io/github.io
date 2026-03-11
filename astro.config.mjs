import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://gospelreads-64144831-fb00d.web.app/",
  integrations: [
    react(),
    sitemap(),
    mdx({ optimize: true }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80,
      },
    },
  },
  vite: {
    plugins: [tailwind()],
  },
  build: {
    inlineStylesheets: "always",
  },
});