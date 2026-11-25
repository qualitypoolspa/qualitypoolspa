import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Supabase = Awaited<ReturnType<typeof createClient>>;

/**
 * For admin pages: checks the login, checks the admin allowlist and loads the
 * page's data, all at the same time rather than one after another.
 *
 * Running the queries before the login check has answered is safe: row-level
 * security only returns hidden products to admins, and nothing is rendered
 * until the check has passed.
 *
 * A signed-in user who isn't on the allowlist gets `isAdmin: false` and the
 * page shows a warning, rather than a panel where every save fails.
 */
export async function loadAdminPage<T>(load: (supabase: Supabase) => Promise<T>) {
  const supabase = await createClient();
  const [{ data: auth }, { data: isAdmin }, data] = await Promise.all([
    supabase.auth.getUser(),
    supabase.rpc("is_admin"),
    load(supabase),
  ]);
  if (!auth.user) redirect("/admin/login");
  return { user: auth.user, isAdmin: isAdmin === true, data };
}
