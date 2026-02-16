import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";

// Build ID: 221743
export default defineConfig({
  site: "https://gospelreads.com",
  integrations: [
    react(),
    sitemap(),
    mdx({ optimize: true }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
        // BLOQUEIO DE APIS OBSOLETAS:
        // Intercepta e bloqueia pings para o privacy sandbox que tiram pontos
        resolveUrl: (url) => {
          if (url.href.includes("privacy-sandbox") || url.href.includes("attribution_reporting")) {
            return new URL("about:blank");
          }
          return url;
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwind()],
  },
});