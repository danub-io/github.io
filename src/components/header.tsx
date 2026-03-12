"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-6">
          {/* Top Bar */}
          <div className="flex w-full items-center justify-between border-b border-border pb-4 md:border-none md:pb-0">
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/search">
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Link href="/" className="text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tighter md:text-6xl">
                GospelReads
              </h1>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Fé, Razão e Cultura
              </p>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden w-full border-y border-black py-2 dark:border-white md:block">
            <ul className="flex items-center justify-center gap-8 text-xs font-bold uppercase tracking-widest">
              <li>
                <Link href="/" className="hover:text-muted-foreground">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/Teologia"
                  className="hover:text-muted-foreground"
                >
                  Teologia
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/Vida Cristã"
                  className="hover:text-muted-foreground"
                >
                  Vida Cristã
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/Cultura"
                  className="hover:text-muted-foreground"
                >
                  Cultura
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-muted-foreground">
                  Sobre
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex w-full items-center justify-between border-y border-border py-1 text-[10px] font-medium uppercase tracking-tight md:hidden">
            <span>
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
