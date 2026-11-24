import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { ProductsMenu } from "./ProductsMenu";
import { productMenu } from "@/data/menu";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: href(lang, "/gallery"), name: dict.nav.gallery },
    { href: href(lang, "/services"), name: dict.nav.services },
    { href: href(lang, "/about"), name: dict.nav.about },
    { href: href(lang, "/contact"), name: dict.nav.contact },
  ];
  const items = productMenu(lang, dict);
  const allHref = href(lang, "/products");
  const quote = { href: href(lang, "/contact"), name: dict.nav.getQuote };

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#faf8f3]">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <Link href={href(lang)} aria-label={dict.meta.title}>
          <Image src="/brand/logo.png" alt={dict.meta.title} width={781} height={123} priority className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy md:flex">
          <ProductsMenu label={dict.nav.products} allLabel={dict.nav.allProducts} allHref={allHref} items={items} />
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-teal">
              {l.name}
            </Link>
          ))}
          <Link href={quote.href} className="btn btn-primary !py-2.5">
            {quote.name}
          </Link>
        </nav>

        <MobileMenu
          menuLabel={dict.nav.menu}
          productsLabel={dict.nav.products}
          allLabel={dict.nav.allProducts}
          allHref={allHref}
          quote={quote}
          links={links}
          items={items}
        />
      </div>
    </header>
  );
}
