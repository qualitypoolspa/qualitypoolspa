"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/data/menu";

/** A top-level menu item with a dropdown. Opens on hover, click or keyboard focus. */
export function NavDropdown({ item, viewAllLabel }: { item: NavItem; viewAllLabel: string }) {
  // Open only on the page where it was opened, so navigating closes it.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenOn(pathname);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpenOn(null), 150);
  };
  // Hash links on the current page don't change the path, so close explicitly.
  const close = () => setOpenOn(null);

  const wide = item.columns.length > 1;

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpenOn(open ? null : pathname)}
        className={`flex items-center gap-1.5 whitespace-nowrap uppercase tracking-[0.14em] ${open ? "opacity-70" : "hover:opacity-70"}`}
      >
        {item.name}
        <svg aria-hidden="true" viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition duration-300 ${open ? "rotate-180" : ""}`}><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 pt-5 transition duration-200 ${
          open ? "visible -translate-x-1/2 opacity-100" : "invisible -translate-x-1/2 -translate-y-1 opacity-0"
        }`}
      >
        <div
          className={`border border-line bg-paper p-8 text-[13.5px] font-normal normal-case tracking-normal text-navy shadow-[0_30px_60px_-20px_rgba(16,25,29,0.25)] ${
            wide ? "grid w-[34rem] grid-cols-[1fr_1.4fr] gap-8" : "w-64"
          }`}
        >
          {item.columns.map((col, i) => (
            <div key={col.title ?? i}>
              {col.title && <p className="eyebrow mb-3">{col.title}</p>}
              <ul className={`space-y-2 text-navy/80 ${col.links.length > 8 ? "columns-2 gap-6 [&>li]:break-inside-avoid" : ""}`}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={close} className="link-line hover:text-navy">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href={item.href}
            onClick={close}
            className={`inline-block border-b border-navy/40 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy hover:text-teal ${
              wide ? "col-span-2" : "mt-5"
            }`}
          >
            {viewAllLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}
