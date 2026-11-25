"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeNames, locales, type Locale } from "@/i18n/config";

/** Cookie the proxy reads to send a returning visitor to the language they picked. */
export const LANG_COOKIE = "lang";

const remember = (l: Locale) => {
  document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
};

/** The current page's address in another language. */
function useHrefFor() {
  const rest = usePathname().replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return (l: Locale) => `/${l}${rest}`;
}

// Plain links, not next/link: a new language re-renders the whole root layout,
// which is cleanest as a fresh page load.

/** Header (desktop): the current language's code, opening a list of all languages. */
export function LanguageMenu({ lang, label }: { lang: Locale; label: string }) {
  const hrefFor = useHrefFor();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${label}: ${localeNames[lang]}`}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 uppercase"
      >
        {lang}
        <span aria-hidden="true" className={`text-[8px] transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>
      {open && (
        <ul className="absolute right-0 top-full z-50 mt-4 min-w-44 border border-line bg-paper py-2 text-[13px] normal-case tracking-normal text-navy shadow-[0_12px_32px_rgba(16,25,29,0.12)]">
          {locales.map((l) => (
            <li key={l}>
              {l === lang ? (
                <span aria-current="true" className="flex justify-between gap-6 px-4 py-2 font-semibold">
                  {localeNames[l]} <span className="text-navy/40">{l.toUpperCase()}</span>
                </span>
              ) : (
                <a
                  href={hrefFor(l)}
                  hrefLang={l}
                  lang={l}
                  onClick={() => remember(l)}
                  className="flex justify-between gap-6 px-4 py-2 font-normal hover:bg-sand"
                >
                  {localeNames[l]} <span className="text-navy/40">{l.toUpperCase()}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Mobile menu: every language's code in a row. */
export function LanguageSwitcher({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  const hrefFor = useHrefFor();
  return (
    <nav aria-label={label} className={`flex flex-wrap items-center gap-x-1 gap-y-2 ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="opacity-35">·</span>}
          {l === lang ? (
            <span aria-current="true" className="px-1 font-bold">{l.toUpperCase()}</span>
          ) : (
            <a
              href={hrefFor(l)}
              hrefLang={l}
              lang={l}
              title={localeNames[l]}
              onClick={() => remember(l)}
              className="px-1 opacity-60 transition-opacity hover:opacity-100"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
