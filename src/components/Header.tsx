import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";
import { productNav } from "@/data/menu";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const products = productNav(lang, dict);
  const pages = [
    { href: href(lang, "/campaigns"), name: dict.nav.campaigns },
    { href: href(lang, "/terms"), name: dict.nav.terms },
  ];
  const contact = { href: href(lang, "/contact"), name: dict.nav.contactUs };

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#faf8f3]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5">
        <Link href={href(lang)} aria-label={dict.meta.title} className="shrink-0">
          <Image src="/brand/logo.png" alt={dict.meta.title} width={781} height={123} priority className="h-7 w-auto 2xl:h-8" />
        </Link>

        <nav className="hidden items-center gap-6 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-navy xl:flex 2xl:gap-8 2xl:text-[12px]">
          {products.map((item) =>
            item.columns.length ? (
              <NavDropdown key={item.key} item={item} viewAllLabel={dict.nav.viewAll} />
            ) : (
              <Link key={item.key} href={item.href} className="hover:text-teal">
                {item.name}
              </Link>
            ),
          )}
          {pages.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-teal">
              {l.name}
            </Link>
          ))}
          <Link href={contact.href} className="btn btn-primary whitespace-nowrap !px-5 !py-2.5">
            {contact.name}
          </Link>
        </nav>

        <MobileMenu menuLabel={dict.nav.menu} viewAllLabel={dict.nav.viewAll} products={products} pages={pages} contact={contact} />
      </div>
    </header>
  );
}
