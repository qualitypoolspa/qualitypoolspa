"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MenuLink, NavItem } from "@/data/menu";

type Props = {
  menuLabel: string;
  viewAllLabel: string;
  products: NavItem[];
  pages: MenuLink[];
  contact: MenuLink;
};

/** Mobile and tablet menu: full-width panel with an accordion per product group. */
export function MobileMenu({ menuLabel, viewAllLabel, products, pages, contact }: Props) {
  // Open only on the page where it was opened, so navigating closes it.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpenOn(open ? null : pathname)}
        className="rounded-md border border-line px-3 py-2 text-sm font-medium text-navy"
      >
        {open ? "✕" : menuLabel}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-[#faf8f3] px-5 pb-16 pt-2">
          <ul className="divide-y divide-line border-b border-line">
            {products.map((item) => (
              <li key={item.key}>
                {item.columns.length ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-xl text-navy">
                      {item.name}
                      <span aria-hidden="true" className="text-xs transition group-open:rotate-180">▼</span>
                    </summary>
                    <div className="space-y-5 pb-5 pl-3">
                      {item.columns.map((col, i) => (
                        <div key={col.title ?? i}>
                          {col.title && <p className="eyebrow mb-2">{col.title}</p>}
                          <ul className={`space-y-2 text-[15px] text-navy/80 ${col.links.length > 8 ? "grid grid-cols-2 gap-x-4" : ""}`}>
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} onClick={close}>{l.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link href={item.href} onClick={close} className="inline-block text-sm font-semibold text-teal">
                        {viewAllLabel} →
                      </Link>
                    </div>
                  </details>
                ) : (
                  <Link href={item.href} onClick={close} className="block py-4 font-serif text-xl text-navy">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
            {pages.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="block py-4 font-serif text-xl text-navy">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={contact.href} onClick={close} className="btn btn-primary mt-8 w-full">
            {contact.name}
          </Link>
        </div>
      )}
    </div>
  );
}
