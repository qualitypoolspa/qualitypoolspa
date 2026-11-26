import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const col = "text-sm text-white/65";
  const link = "link-line hover:text-white";
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[90rem] px-5 pb-10 pt-20 md:px-8 md:pt-28">
        {/* Brand statement */}
        <div className="grid gap-10 border-b border-white/10 pb-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <Image src="/brand/logo.png" alt={dict.meta.title} width={781} height={123} className="h-8 w-auto brightness-0 invert" />
            <p className="mt-8 max-w-xl font-serif text-4xl leading-[1.05] text-white/90 md:text-5xl">
              <em>Wellness from the Swedish West Coast</em>, for homes by the Mediterranean.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <a href={`mailto:${site.email}`} className="link-line font-serif text-2xl text-white md:text-3xl">
              {site.email}
            </a>
            <p className="mt-3">
              <a href={`tel:${site.phoneTel}`} className={`${link} text-white/70`}>{site.phoneDisplay}</a>
            </p>
            <p className="mt-1 text-sm text-white/50">{site.locations.join(" · ")}</p>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <p className="eyebrow !text-white/45">{dict.nav.products}</p>
            <ul className={`mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 ${col}`}>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={href(lang, `/products/${c.slug}`)} className={link}>{dict.categories[c.slug].name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 md:col-start-6">
            <p className="eyebrow !text-white/45">{dict.footer.explore}</p>
            <ul className={`mt-5 space-y-2.5 ${col}`}>
              <li><Link href={href(lang, "/gallery")} className={link}>{dict.nav.gallery}</Link></li>
              <li><Link href={href(lang, "/services")} className={link}>{dict.nav.services}</Link></li>
              <li><Link href={href(lang, "/about")} className={link}>{dict.nav.about}</Link></li>
              <li><Link href={href(lang, "/campaigns")} className={link}>{dict.nav.campaigns}</Link></li>
              <li><Link href={href(lang, "/contact")} className={link}>{dict.nav.contact}</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow !text-white/45">{dict.footer.guides}</p>
            <ul className={`mt-5 space-y-2.5 ${col}`}>
              {(["pool-covers", "spas", "saunas-hammam"] as const).map((g) => (
                <li key={g}><Link href={href(lang, `/guides/${g}`)} className={link}>{dict.guides.items[g].title}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow !text-white/45">{dict.footer.locations}</p>
            <ul className={`mt-5 space-y-2.5 ${col}`}>
              {(["marbella", "costa-del-sol", "mallorca"] as const).map((l) => (
                <li key={l}><Link href={href(lang, `/locations/${l}`)} className={link}>{dict.locations.items[l].name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pb-16 pt-8 text-xs text-white/40 md:pr-24">
          <p>© {new Date().getFullYear()} {site.name}. {dict.footer.rights}</p>
          <Link href={href(lang, "/terms")} className={link}>{dict.nav.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
