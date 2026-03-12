"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-muted p-6 text-center animate-in fade-in duration-300">
        <h3 className="font-serif text-lg font-bold text-green-600 dark:text-green-400">Inscrição Confirmada!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Obrigado por se inscrever em nossa newsletter.
        </p>
      </div>
    );
  }

  return (
    <div className="sticky top-8 bg-muted p-6">
      <h3 className="font-serif text-lg font-bold">Newsletter</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Receba reflexões semanais diretamente em seu e-mail.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
        <Input
          type="email"
          required
          placeholder="Seu e-mail"
          className="rounded-none border-border bg-background"
        />
        <Button
          type="submit"
          disabled={loading}
          className="rounded-none bg-black text-xs font-bold uppercase tracking-widest text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
        >
          {loading ? "Inscrevendo..." : "Inscrever"}
        </Button>
      </form>
    </div>
  );
}
