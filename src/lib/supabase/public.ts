import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Client for anonymous reads on the public pages.
 *
 * Deliberately does NOT touch cookies. The cookie-based server client calls
 * next/headers' cookies(), which opts the whole page into dynamic rendering —
 * meaning every visitor would trigger a database query. The public catalogue has no
 * per-user content, so it can be statically cached and revalidated instead
 * (on a timer, and on demand whenever the client saves a change in /admin).
 */
export function createPublicClient() {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
