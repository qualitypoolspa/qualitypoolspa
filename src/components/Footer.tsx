import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
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
            <li><Link href={href(lang, "/about")} className="hover:text-white">{dict.nav.about}</Link></li>
            <li><Link href={href(lang, "/contact")} className="hover:text-white">{dict.nav.contact}</Link></li>
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
