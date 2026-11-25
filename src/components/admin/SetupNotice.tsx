/**
 * Shown instead of the login form when the Supabase env vars are missing:
 * far more useful than a login box that can't possibly work.
 */
export default function SetupNotice() {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <p>
        <strong>Not connected yet.</strong> The admin panel needs a Supabase project before anyone can log in.
      </p>
      <ol className="list-decimal space-y-1 pl-5">
        <li>Create a project on supabase.com</li>
        <li>
          Run <code>supabase/migrations/0001_products.sql</code> and then <code>supabase/seed.sql</code> in the SQL
          editor
        </li>
        <li>
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (in{" "}
          <code>.env.local</code> locally, in Vercel for the live site)
        </li>
      </ol>
      <p>The full instructions are in SETUP.md.</p>
    </div>
  );
}
