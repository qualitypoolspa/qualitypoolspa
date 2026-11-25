"use client";

import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

/** Cookie the proxy reads to send a returning visitor to the language they picked. */
export const LANG_COOKIE = "lang";

/** EN · ES · SV: links to the current page in each language. */
export function LanguageSwitcher({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");

  return (
    <nav aria-label={label} className={`flex items-center gap-1 ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="opacity-35">·</span>}
          {l === lang ? (
            <span aria-current="true" className="font-bold">{l.toUpperCase()}</span>
          ) : (
            // A plain link, not next/link: a new language re-renders the whole root
            // layout, which is cleanest as a fresh page load.
            <a
              href={`/${l}${rest}`}
              hrefLang={l}
              lang={l}
              onClick={() => {
                document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
              }}
              className="opacity-60 transition-opacity hover:opacity-100"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
