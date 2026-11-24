import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <Image
            src="/brand/logo.png"
            alt={dict.meta.title}
            width={781}
            height={123}
            className="h-8 w-auto rounded bg-white p-1"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{dict.footer.blurb}</p>
        </div>
        <div>
          <p className="eyebrow !text-white/60">{dict.footer.explore}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href={href(lang, "/products")} className="hover:text-white">{dict.nav.products}</Link></li>
            <li><Link href={href(lang, "/gallery")} className="hover:text-white">{dict.nav.gallery}</Link></li>
            <li><Link href={href(lang, "/services")} className="hover:text-white">{dict.nav.services}</Link></li>
            <li><Link href={href(lang, "/about")} className="hover:text-white">{dict.nav.about}</Link></li>
            <li><Link href={href(lang, "/campaigns")} className="hover:text-white">{dict.nav.campaigns}</Link></li>
            <li><Link href={href(lang, "/contact")} className="hover:text-white">{dict.nav.contact}</Link></li>
            <li><Link href={href(lang, "/terms")} className="hover:text-white">{dict.nav.terms}</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-white/60">{dict.footer.guides}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {(["pool-covers", "spas", "saunas-hammam"] as const).map((g) => (
              <li key={g}><Link href={href(lang, `/guides/${g}`)} className="hover:text-white">{dict.guides.items[g].title}</Link></li>
            ))}
          </ul>
          <p className="eyebrow mt-7 !text-white/60">{dict.footer.locations}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {(["marbella", "costa-del-sol", "mallorca"] as const).map((l) => (
              <li key={l}><Link href={href(lang, `/locations/${l}`)} className="hover:text-white">{dict.locations.items[l].name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-white/60">{dict.footer.contact}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={`tel:+${site.whatsapp}`} className="hover:text-white">{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li>{site.locations.join(" · ")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
      </div>
    </footer>
  );
}
