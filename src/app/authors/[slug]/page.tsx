import { getAuthorBySlug, getPosts, getAuthors } from "@/lib/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PostCard } from "@/components/post-card";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const authors = await getAuthors();
  const slugified = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

  const params = [];
  for (const author of authors) {
    params.push({ slug: author.slug });
    const nameSlug = slugified(author.title);
    if (nameSlug !== author.slug) {
      params.push({ slug: nameSlug });
    }
  }
  return params;
}

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const allPosts = await getPosts();
  const authorPosts = allPosts.filter((post) =>
    post.authors.some(
      (a) =>
        a.toLowerCase() === author.title.toLowerCase() ||
        a.toLowerCase() === author.slug.toLowerCase()
    )
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16 border-b pb-12 text-center">
          {author.image && (
            <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border">
              <Image
                src={author.image}
                alt={author.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-foreground">
            {author.title}
          </h1>
          {author.description && (
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground italic">
              {author.description}
            </p>
          )}

          <div className="prose prose-slate dark:prose-invert max-w-none font-serif mt-8 mx-auto text-left leading-relaxed">
            <ReactMarkdown>{author.content}</ReactMarkdown>
          </div>
        </header>

        <section>
          <h2 className="mb-8 font-serif text-3xl font-bold">
            Publicações de {author.title}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {authorPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {authorPosts.length === 0 && (
            <p className="text-muted-foreground">Nenhuma publicação encontrada.</p>
          )}
        </section>
      </div>
    </div>
  );
}
