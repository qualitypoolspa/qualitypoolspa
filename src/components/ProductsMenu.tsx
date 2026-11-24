"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/data/menu";

type Props = { label: string; allLabel: string; allHref: string; items: MenuCategory[] };

/** Desktop mega menu: opens on hover or keyboard focus, closes on navigation or Escape. */
export function ProductsMenu({ label, allLabel, allHref, items }: Props) {
  // The menu is open only on the page where it was opened, so navigating closes it.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((prev) => ((typeof next === "function" ? next(prev === pathname) : next) ? pathname : null));
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const priority = items.slice(0, 3);
  const rest = items.slice(3);

  return (
    <div onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 uppercase tracking-[0.16em] hover:text-teal"
      >
        {label}
        <span aria-hidden="true" className={`text-[9px] transition ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      <div
        className={`absolute inset-x-0 top-full border-y border-line bg-[#faf8f3] shadow-xl transition duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 normal-case tracking-normal lg:grid-cols-[3fr_2fr]">
          {/* Priority categories with their sub-categories */}
          <div className="grid grid-cols-3 gap-8">
            {priority.map((c) => (
              <div key={c.slug}>
                <Link href={c.href} className="font-serif text-xl text-navy hover:text-teal">
                  {c.name}
                </Link>
                {c.children.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-[13px] font-normal text-navy/70">
                    {c.children.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="hover:text-teal">{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {/* Other categories */}
          <div className="border-line lg:border-l lg:pl-10">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-5">
              {rest.map((c) => (
                <li key={c.slug}>
                  <Link href={c.href} className="font-serif text-lg text-navy hover:text-teal">
                    {c.name}
                  </Link>
                  {c.children.length > 0 && (
                    <ul className="mt-1.5 space-y-1 text-[13px] font-normal text-navy/60">
                      {c.children.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="hover:text-teal">{s.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href={allHref}
              className="mt-8 inline-block border-b border-navy/40 pb-0.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy hover:text-teal"
            >
              {allLabel} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
