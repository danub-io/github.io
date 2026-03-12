import { getPosts } from "@/lib/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";

export async function generateStaticParams() {
  const posts = await getPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getPosts();
  const filteredPosts = allPosts.filter((post) =>
    post.tags.includes(decodedTag),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-12">
        <header className="mb-12 border-b-2 border-black pb-4 dark:border-white">
          <h1 className="font-serif text-sm font-bold uppercase tracking-widest italic">
            Assunto
          </h1>
          <h2 className="mt-2 font-serif text-5xl font-bold">{decodedTag}</h2>
        </header>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
