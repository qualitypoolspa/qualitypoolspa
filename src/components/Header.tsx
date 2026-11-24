import Image from "next/image";
import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { to: "/products", label: dict.nav.products },
    { to: "/about", label: dict.nav.about },
    { to: "/contact", label: dict.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href={href(lang)} aria-label={dict.meta.title}>
          <Image src="/brand/logo.png" alt={dict.meta.title} width={781} height={123} priority className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-navy md:flex">
          {links.map((l) => (
            <Link key={l.to} href={href(lang, l.to)} className="hover:text-teal">
              {l.label}
            </Link>
          ))}
          <Link href={href(lang, "/contact")} className="btn btn-primary !py-2">
            {dict.nav.getQuote}
          </Link>
        </nav>

        {/* Mobile menu: no JS needed */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-line px-3 py-2 text-sm font-medium text-navy">
            {dict.nav.menu}
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-lg border border-line bg-white p-2 shadow-lg">
            {links.map((l) => (
              <Link key={l.to} href={href(lang, l.to)} className="block rounded px-3 py-2 text-sm text-navy hover:bg-sand">
                {l.label}
              </Link>
            ))}
            <Link href={href(lang, "/contact")} className="btn btn-primary mt-1 w-full !py-2">
              {dict.nav.getQuote}
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
