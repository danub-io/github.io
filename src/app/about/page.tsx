import { getPage } from "@/lib/content";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function AboutPage() {
  const page = await getPage("about");

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-serif text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          {page.title}
        </h1>

        {page.description && (
          <p className="mb-8 text-xl text-muted-foreground italic">
            {page.description}
          </p>
        )}

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none font-serif leading-relaxed">
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>

        {page.what_i_do && (
          <div className="mt-16 border-t pt-12">
            <h2 className="mb-8 font-serif text-3xl font-bold">
              {page.what_i_do.title}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {page.what_i_do.items.map((item: any, index: number) => (
                <div key={index} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
