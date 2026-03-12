import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/content";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  post: Post;
  variant?: "horizontal" | "vertical" | "featured";
}

export function PostCard({ post, variant = "vertical" }: PostCardProps) {
  const dateFormatted = post.date
    ? format(new Date(post.date), "dd 'de' MMMM, yyyy", { locale: ptBR })
    : "";

  if (variant === "featured") {
    return (
      <div className="group flex flex-col gap-6 lg:flex-row">
        {post.image && (
          <div className="relative aspect-[16/9] overflow-hidden lg:w-2/3">
            <Link href={`/posts/${post.slug}`}>
              <Image
                src={post.image}
                alt={post.image_alt || post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>
        )}
        <div className="flex flex-col justify-center lg:w-1/3">
          <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <Link href={`/posts/${post.slug}`}>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight group-hover:underline md:text-5xl">
              {post.title}
            </h2>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <span>{post.authors[0]}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{dateFormatted}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="group flex gap-4 border-b border-border pb-6 last:border-0">
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
            {post.tags[0]}
          </div>
          <Link href={`/posts/${post.slug}`}>
            <h3 className="mt-2 font-serif text-xl font-bold leading-snug group-hover:underline">
              {post.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
            {post.description}
          </p>
        </div>
        {post.image && (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden md:h-24 md:w-24">
            <Link href={`/posts/${post.slug}`}>
              <Image
                src={post.image}
                alt={post.image_alt || post.title}
                fill
                className="object-cover"
              />
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="group flex flex-col">
      {post.image && (
        <div className="relative mb-4 aspect-[4/3] overflow-hidden">
          <Link href={`/posts/${post.slug}`}>
            <Image
              src={post.image}
              alt={post.image_alt || post.title}
              fill
              className="object-cover"
            />
          </Link>
        </div>
      )}
      <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
        {post.tags[0]}
      </div>
      <Link href={`/posts/${post.slug}`}>
        <h3 className="mt-2 font-serif text-2xl font-bold leading-tight group-hover:underline">
          {post.title}
        </h3>
      </Link>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
        {post.description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <span>{post.authors[0]}</span>
        <span>•</span>
        <span>{dateFormatted}</span>
      </div>
    </div>
  );
}
