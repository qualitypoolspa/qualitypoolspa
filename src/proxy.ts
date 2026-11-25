import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";
import { updateSession } from "@/lib/supabase/middleware";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The admin panel has no language prefix: refresh the login and guard it.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return updateSession(request);

  // Redirect paths without a language prefix (e.g. /products -> /en/products).
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, etc.)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
