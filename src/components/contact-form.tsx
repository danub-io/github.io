"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 border p-12 rounded-lg text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="text-2xl font-serif font-bold">Mensagem Enviada!</h3>
        <p className="text-muted-foreground">Obrigado pelo seu contato. Responderemos em breve.</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Enviar outra mensagem</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border p-8 rounded-lg">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Nome</label>
          <Input id="name" required placeholder="Seu nome" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">E-mail</label>
          <Input id="email" required type="email" placeholder="seu@email.com" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
        <Input id="subject" required placeholder="Como podemos ajudar?" />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
        <textarea
          id="message"
          required
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Sua mensagem..."
        ></textarea>
      </div>
      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? "Enviando..." : "Enviar Mensagem"}
      </Button>
    </form>
  );
}
