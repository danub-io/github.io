import { defineConfig } from "tinacms";

const branch = process.env.TINA_BRANCH || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: "99e1b157-d7e1-4567-a688-274a3b0f9e2d", //
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "src",
      mediaRoot: "assets/images",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['por'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
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
          { type: "string", name: "categories", label: "Categorias", list: true },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "rich-text", name: "body", label: "Conteúdo", isBody: true },
        ],
      },
      {
        name: "authors",
        label: "Autores",
        path: "src/content/authors",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Nome", isTitle: true, required: true },
          { type: "image", name: "image", label: "Foto" },
          { type: "rich-text", name: "body", label: "Biografia", isBody: true },
        ],
      },
      {
        name: "pages",
        label: "Páginas",
        path: "src/content/pages",
        format: "md",
        fields: [{ type: "string", name: "title", label: "Título", isTitle: true }],
      }
    ],
  },
});
