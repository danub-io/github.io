import dateFormat from "@/lib/utils/dateFormat";
import { humanize, slugify } from "@/lib/utils/textConverter";
import Fuse from "fuse.js";
import React, { useEffect, useRef, useState } from "react";
import placeholder from "@/assets/images/placeholder.png";

export type SearchItem = {
  slug: string;
  data: any;
  content: any;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = new Fuse(searchList, {
    keys: ["data.title", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 1,
    threshold: 0.5,
  });

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <div className="min-h-[45vh]">
      <input
        className="form-input w-full text-center"
        placeholder="Digite para buscar posts"
        type="text"
        name="search"
        value={inputVal}
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        ref={inputRef}
      />

      {inputVal.length > 1 && (
        <div className="my-6 text-center">
          Encontrados {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " resultado"
            : " resultados"}{" "}
          para '{inputVal}'
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        {searchResults?.map(({ item }) => (
          <article key={item.slug} className="archive-item flex flex-col gap-5 items-start group">
            <a href={`/blog/${item.slug}`} className="block w-full overflow-hidden rounded-none shadow-sm relative">
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10"></div>
              <img
                src={item.data.image?.src || placeholder.src}
                alt={item.data.title}
                width={800}
                height={450}
                className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </a>
            <div className="flex-1 w-full">
              <div className="flex items-center space-x-2 mb-2">
                {item.data.tags && item.data.tags.length > 0 && (
                  <a href={`/tags/${slugify(item.data.tags[0])}`} className="text-dark text-[11px] font-bold uppercase tracking-wider hover:underline">
                    {humanize(item.data.tags[0])}
                  </a>
                )}
                <span className="text-slate-300 text-xs">•</span>
                <time className="text-slate-500 text-[11px] font-medium">{dateFormat(item.data.date)}</time>
              </div>
              <a href={`/blog/${item.slug}`} className="block">
                <h3 className="font-primary text-2xl sm:text-3xl font-bold text-dark group-hover:text-slate-600 transition-colors mb-2 leading-tight">
                  {item.data.title}
                </h3>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}





