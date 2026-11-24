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
        className={`flex items-center gap-1.5 whitespace-nowrap uppercase tracking-[0.12em] hover:text-teal ${open ? "text-teal" : ""}`}
      >
        {item.name}
        <span aria-hidden="true" className={`text-[8px] transition ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 pt-5 transition duration-200 ${
          open ? "visible -translate-x-1/2 opacity-100" : "invisible -translate-x-1/2 -translate-y-1 opacity-0"
        }`}
      >
        <div
          className={`rounded-lg border border-line bg-[#faf8f3] p-7 text-[13px] font-normal normal-case tracking-normal shadow-xl ${
            wide ? "grid w-[34rem] grid-cols-[1fr_1.4fr] gap-8" : "w-64"
          }`}
        >
          {item.columns.map((col, i) => (
            <div key={col.title ?? i}>
              {col.title && <p className="eyebrow mb-3">{col.title}</p>}
              <ul className={`space-y-2 text-navy/80 ${col.links.length > 8 ? "columns-2 gap-6 [&>li]:break-inside-avoid" : ""}`}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={close} className="hover:text-teal">
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
