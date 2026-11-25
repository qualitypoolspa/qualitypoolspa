import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * The language for an address without one: the one the visitor picked before
 * (the language switcher remembers it), else the browser's preferred language
 * if the site has it, else English.
 */
function preferredLocale(request: NextRequest): Locale {
  const picked = request.cookies.get("lang")?.value;
  if (picked && hasLocale(picked)) return picked;
  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return accepted.find((a) => hasLocale(a.lang))?.lang as Locale | undefined ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The admin panel has no language prefix: refresh the login and guard it.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return updateSession(request);

  // Redirect paths without a language prefix (e.g. /products -> /en/products).
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, etc.)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
