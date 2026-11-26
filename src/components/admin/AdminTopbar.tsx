import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/app/admin/actions";

/** Lives in the panel layout, so it stays put between pages. */
export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/brand/logo.png" alt="Quality Pool & Spa" width={781} height={123} className="h-5 w-auto" priority />
          <span className="text-sm font-semibold text-navy/60">Products</span>
        </Link>
        <div className="flex items-center gap-2">
          <a href="/en" target="_blank" rel="noopener" className="adm-btn adm-btn--sm">
            View site ↗
          </a>
          <form action={signOut}>
            <button className="adm-btn adm-btn--sm" type="submit">
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
