import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-black bg-background py-12 dark:border-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-2xl font-bold">GospelReads</h2>
            <p className="text-sm text-muted-foreground">
              Explorando as profundezas da fé cristã e sua intersecção com a
              vida moderna, liderança e cultura.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
              Navegação
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
              Siga-nos
            </h3>
            <div className="flex gap-4">
              <Link href="#" className="text-sm hover:underline">
                Instagram
              </Link>
              <Link href="#" className="text-sm hover:underline">
                X (Twitter)
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Newsletter
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} GospelReads. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
