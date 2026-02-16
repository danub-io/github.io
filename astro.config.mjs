import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite"; // Padrão Tailwind 4
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";

// Build ID: 20260215220747
export default defineConfig({
  site: "https://gospelreads.com",
  integrations: [
    react(),
    sitemap(),
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    plugins: [tailwind()],
  },
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
});