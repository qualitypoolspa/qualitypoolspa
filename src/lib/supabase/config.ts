/**
 * Both of these are safe to expose in the browser: the anon key is designed
 * to be public and is constrained by the row-level security policies in
 * supabase/migrations. The service_role key must NEVER appear in this project.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Lets the site run before Supabase is set up: the catalogue falls back to the
 * bundled copy and /admin shows setup instructions instead of a broken login.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Storage bucket for photos uploaded in the admin panel (migration 0001). */
export const PRODUCT_BUCKET = "products";
