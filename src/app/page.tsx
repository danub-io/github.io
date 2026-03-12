import { getPosts } from "@/lib/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/newsletter-form";

export default async function Home() {
  const allPosts = await getPosts();
  const featuredPost = allPosts[0];
  const sidePosts = allPosts.slice(1, 4);
  const remainingPosts = allPosts.slice(4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8">
        {/* Featured Section */}
        {featuredPost && (
          <section className="mb-12">
            <PostCard post={featuredPost} variant="featured" />
            <Separator className="mt-12 h-0.5 bg-black dark:bg-white" />
          </section>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {remainingPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            <div className="border-t-2 border-black pt-4 dark:border-white">
              <h2 className="mb-6 font-serif text-xl font-bold uppercase italic">
                Mais Recentes
              </h2>
              <div className="flex flex-col gap-6">
                {sidePosts.map((post) => (
                  <PostCard key={post.slug} post={post} variant="horizontal" />
                ))}
              </div>
            </div>

            <NewsletterForm />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
