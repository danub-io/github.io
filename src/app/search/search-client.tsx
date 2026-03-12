"use client";

import { useState, useMemo } from "react";
import { Post } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchClientProps {
  posts: Post[];
}

export default function SearchClient({ posts }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(" ");
    return posts.filter((post) => {
      const searchableText = `${post.title} ${post.description} ${post.tags.join(" ")} ${post.authors.join(" ")}`.toLowerCase();
      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [query, posts]);

  return (
    <div className="space-y-12">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="O que você está procurando?"
          className="h-14 pl-12 text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="space-y-8">
        {query.trim() !== "" && (
          <p className="text-sm text-muted-foreground">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "resultado encontrado" : "resultados encontrados"} para &quot;{query}&quot;
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {query.trim() !== "" && filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">
              Nenhum resultado encontrado para sua busca.
            </h3>
            <p className="mt-2 text-muted-foreground">
              Tente usar palavras-chave diferentes.
            </p>
          </div>
        )}

        {query.trim() === "" && (
          <div className="py-20 text-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
              Digite algo para começar sua pesquisa nos artigos do GospelReads.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
