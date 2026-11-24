"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MenuCategory, MenuLink } from "@/data/menu";

type Props = {
  menuLabel: string;
  productsLabel: string;
  allLabel: string;
  allHref: string;
  quote: MenuLink;
  links: MenuLink[];
  items: MenuCategory[];
};

/** Mobile menu: full-width panel with an accordion of product categories. */
export function MobileMenu({ menuLabel, productsLabel, allLabel, allHref, quote, links, items }: Props) {
  // The menu is open only on the page where it was opened, so navigating closes it.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((prev) => ((typeof next === "function" ? next(prev === pathname) : next) ? pathname : null));
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="rounded-md border border-line px-3 py-2 text-sm font-medium text-navy"
      >
        {open ? "✕" : menuLabel}
      </button>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-20 z-50 overflow-y-auto border-t border-line bg-[#faf8f3] px-5 pb-10 pt-4">
          <p className="eyebrow mt-2">{productsLabel}</p>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {items.map((c) => (
              <li key={c.slug}>
                {c.children.length ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-serif text-lg text-navy">
                      {c.name}
                      <span aria-hidden="true" className="text-xs transition group-open:rotate-180">▼</span>
                    </summary>
                    <ul className="space-y-2 pb-4 pl-3 text-sm text-navy/75">
                      <li>
                        <Link href={c.href} className="font-semibold">{c.name} →</Link>
                      </li>
                      {c.children.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} onClick={() => setOpen(false)}>{s.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={c.href} className="block py-3 font-serif text-lg text-navy">{c.name}</Link>
                )}
              </li>
            ))}
          </ul>
          <Link href={allHref} className="mt-4 inline-block text-sm font-semibold text-teal">{allLabel} →</Link>

          <ul className="mt-8 space-y-3 text-sm font-semibold uppercase tracking-[0.16em] text-navy">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.name}</Link>
              </li>
            ))}
          </ul>
          <Link href={quote.href} className="btn btn-primary mt-8 w-full">{quote.name}</Link>
        </div>
      )}
    </div>
  );
}
