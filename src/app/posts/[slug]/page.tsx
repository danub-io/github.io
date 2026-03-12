import { getPostBySlug, getPosts } from "@/lib/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateFormatted = post.date
    ? format(new Date(post.date), "dd 'de' MMMM, yyyy", { locale: ptBR })
    : "";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-12">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12 text-center">
            <div className="mb-4 flex justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-6xl">
              {post.title}
            </h1>
            <p className="mb-8 text-xl italic text-muted-foreground">
              {post.description}
            </p>
            <Separator className="mx-auto mb-8 w-24" />
            <div className="flex flex-col items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <div className="flex gap-1">
                <span>Por</span>
                {post.authors.map((author, index) => (
                  <span key={author}>
                    <Link
                      href={`/authors/${author.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:underline"
                    >
                      {author}
                    </Link>
                    {index < post.authors.length - 1 && ", "}
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">{dateFormatted}</span>
            </div>
          </header>

          {post.image && (
            <div className="relative mb-12 aspect-video overflow-hidden border-y border-border py-4">
              <Image
                src={post.image}
                alt={post.image_alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-blockquote:border-l-4 prose-blockquote:border-black dark:prose-blockquote:border-white prose-blockquote:italic mx-auto">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
