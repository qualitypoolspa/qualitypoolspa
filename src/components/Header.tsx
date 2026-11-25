import Image from "next/image";
import Link from "next/link";
import { HeaderFrame } from "./HeaderFrame";
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
    <HeaderFrame home={href(lang)}>
      {/* Campaign strip */}
      <div className="bg-ink px-5 py-2 text-center text-[11.5px] tracking-wide text-white/75">
        {dict.campaigns.bar}{" "}
        <Link href={href(lang, "/campaigns")} className="link-line font-semibold text-white">
          {dict.campaigns.barLink}
        </Link>
      </div>

      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-6 px-5 md:px-8">
        <Link href={href(lang)} aria-label={dict.meta.title} className="shrink-0">
          {/* The logo turns white over the hero photo. */}
          <Image
            src="/brand/logo.png"
            alt={dict.meta.title}
            width={781}
            height={123}
            priority
            className="h-7 w-auto transition-[filter] duration-500 group-data-[overlay=true]/header:brightness-0 group-data-[overlay=true]/header:invert 2xl:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-7 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] xl:flex 2xl:gap-9">
          {products.map((item) =>
            item.columns.length ? (
              <NavDropdown key={item.key} item={item} viewAllLabel={dict.nav.viewAll} />
            ) : (
              <Link key={item.key} href={item.href} className="link-line">
                {item.name}
              </Link>
            ),
          )}
          {pages.map((l) => (
            <Link key={l.href} href={l.href} className="link-line">
              {l.name}
            </Link>
          ))}
          <Link
            href={contact.href}
            className="border border-current px-5 py-2.5 transition-colors duration-300 hover:bg-navy hover:text-paper group-data-[overlay=true]/header:hover:bg-white group-data-[overlay=true]/header:hover:text-navy"
          >
            {contact.name}
          </Link>
        </nav>

        <MobileMenu menuLabel={dict.nav.menu} viewAllLabel={dict.nav.viewAll} products={products} pages={pages} contact={contact} />
      </div>
    </HeaderFrame>
  );
}
