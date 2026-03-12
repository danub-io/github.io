import { getPosts } from "@/lib/content";
import SearchClient from "./search-client";

export default async function SearchPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-serif text-5xl font-bold tracking-tight text-foreground md:text-6xl text-center">
          Pesquisar
        </h1>
        <SearchClient posts={posts} />
      </div>
    </div>
  );
}
