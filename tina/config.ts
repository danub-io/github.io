import { defineConfig } from "tinacms";

const branch = process.env.TINA_BRANCH || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: "99e1b157-d7e1-4567-a688-274a3b0f9e2d",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin", // Isso gera public/admin
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "src",
      mediaRoot: "assets/images",
    },
  },
  schema: {
    collections: [
      {
        name: "posts",
        label: "Postagens",
        path: "src/content/posts",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Data" },
          { type: "image", name: "image", label: "Imagem" },
          { type: "rich-text", name: "body", label: "Conteúdo", isBody: true },
        ],
      },
      // Criando uma coleção dummy para evitar o erro de "pages" vazio
      {
        name: "pages",
        label: "Páginas",
        path: "src/content/pages",
        format: "md",
        fields: [{ type: "string", name: "title", label: "Título" }],
      }
    ],
  },
});
