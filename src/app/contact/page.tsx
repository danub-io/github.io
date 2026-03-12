import { getPage } from "@/lib/content";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ContactForm } from "@/components/contact-form";

export default async function ContactPage() {
  const page = await getPage("contact");

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-serif text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          {page.title}
        </h1>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none font-serif leading-relaxed mb-12">
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
