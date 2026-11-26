# Setup: admin panel (database, login and launch)

Do these steps once. It takes about 20 minutes, on free tiers. Put the Supabase
project in the client's own account. Hosting stays on Vercel, as with Fat Mama
and Boquerone.

The site **runs without any of this**: the products fall back to the bundled
catalogue in the code, and `/admin` shows a setup notice. You only need it to
give the client the admin panel.

---

## 1. Create the Supabase project

1. Log in to Supabase with the client's account and create a new project.
2. Pick the region nearest the site's visitors and the Vercel server (Spain:
   **Ireland** `eu-west-1` or **Frankfurt** `eu-central-1`).
3. Save the database password somewhere safe. The site doesn't use it, but
   Supabase won't show it again.

## 2. Create the tables and load the products

Supabase dashboard → **SQL Editor → New query**. Paste in and run each file, in this order:

1. `supabase/migrations/0001_products.sql`: the products table, the photo
   bucket and the admin allowlist, all with security rules.
2. `supabase/migrations/0002_translations.sql`: the Spanish and Swedish
   columns for product texts.
3. `supabase/migrations/0003_more_languages.sql`: the German, French and
   Russian columns.
4. `supabase/seed.sql`: the current catalogue, all 225 products with their
   texts, specs and photos, in all six languages (the Harvia saunas included).

Under **Table Editor** you should now see `products` with 225 rows.

The migrations are safe to re-run. `seed.sql` is **not**: it stops with an
error if the table already has products, so pasting it a second time can't
overwrite the client's edits.

**Already set up before the translations arrived?** Run the translation
migration(s) you haven't run yet: `0002_translations.sql` (Spanish,
Swedish), then `0003_more_languages.sql` (German, French, Russian). It adds the Spanish and Swedish columns and fills
them in for every product whose English text is still the original. Products
the client has rewritten keep blank translations (the site shows their
English until the client writes the translations in `/admin`), and nothing
already translated is overwritten. Until each is run, the site works but shows
product texts in English on those languages' pages, and the admin panel
names the file still to run.

**Already set up before the Harvia saunas arrived?** Run
`supabase/migrations/0004_harvia_saunas.sql` (after 0003). It adds the 52
Harvia sauna cabins to the Saunas category, after any saunas already there.
Safe to re-run: saunas already in the table are skipped, so nothing edited in
`/admin` changes.

Supabase may warn that the query "creates tables without enabling Row Level
Security". That's a false alarm: the file turns RLS on itself. Choose **Run
without RLS**, which runs the file as written.

**If `0001` fails on the bucket** (the SQL editor sometimes lacks the
privileges): go to **Storage → New bucket**, name it exactly `products`, turn
**Public** on, then re-run `0001`.

## 3. Create the client's login

**Authentication → Users → Add user → Create new user.** Enter their email and
a strong password, and tick **Auto Confirm User**.

**Then give them edit access.** An account alone isn't enough: writes are
limited to an explicit allowlist. In the SQL editor:

```sql
insert into public.admin_users (user_id, email)
select id, email from auth.users where email = 'client@example.com'
on conflict (user_id) do nothing;
```

Check it with `select email from public.admin_users;`. Add yourself the same
way if you want your own login.

## 4. Turn off public sign-up

**Authentication → Sign In / Providers → Email**: switch off *Allow new users
to sign up*.

The anon key is public by design (it ships to every visitor's browser), so
with sign-up open, anyone could register an account. The allowlist means such
an account still couldn't change anything (and the panel tells a signed-in
non-admin exactly that). But there's no reason to let strangers create
accounts at all.

## 5. Connect the site

Supabase → **Project Settings → API**. Copy the **Project URL** and the
**anon / public** key (the newer **publishable** key, `sb_publishable_…`, also
works).

- **Locally:** `cp .env.example .env.local`, fill in both, restart `npm run dev`.
- **On Vercel:** project → **Settings → Environment Variables** → add
  `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then
  **redeploy**. `NEXT_PUBLIC_*` values are baked in at build time, so saving
  them isn't enough on its own. (The URL is also what lets the site show
  photos uploaded in the panel.)

> **Never** use the `service_role` / secret key in this project. It bypasses
> every security rule.

## 6. Check it

On the deployed site, go to `/admin`, sign in, change a product's short
description, check the product page shows it, then change it back.

---

## How the client uses it

`qualitypoolspa.es/admin`, sign in.

**Product list**
- All products, grouped by category. Search by name or brand, or filter by category.
- **↑ / ↓** change the order products are shown in on their category page.
- **Hide / Show** takes a product off the site without deleting it.
- **+ Add product**: give it a name and a category. It's created **hidden**,
  so a half-written product never appears on the site. Fill it in, tick
  **Show on the site**, and save.

**Editing a product**
- **On the site**: show/hide; **Popular products on the home page** (the home
  page shows six, ticked ones first); **Our selection** (shown first on the
  category page).
- **Details**: name, brand, category, collection (the group it's listed under,
  e.g. "Premium Line"), number of people (spas only, for the size filter) and
  web address.
- **Texts**: the short description (on product cards) and the description.
  The **English / Español / Svenska / Deutsch / Français / Русский** tabs
  switch language; each translation
  box shows the English above it. An empty translation shows the English text
  on that language's page, so a new product can go live in English first.
- **Photos**: upload straight from a phone or computer. Photos are resized
  automatically and portraits won't come out sideways. The first photo is the
  cover; **Make cover** and the arrows reorder them. **Show whole product on
  white** suits studio shots on a white background.
- **Specifications**: rows of group / label / value. Rows with the same group
  are shown together under that heading. The same language tabs show each
  row's translation, with the English above it. Rows are added and removed in
  the English tab.
- **Save changes** at the bottom. Every save shows **Saved ✓** and is live on
  the site immediately. Leaving the page with unsaved changes asks first.
- **Delete product** removes it for good, including uploaded photos.

## For developers

- The live catalogue is the `products` table. `src/lib/catalog.ts` reads it
  (cached, refreshed on every save in the panel and hourly) and falls back to
  the bundled catalogue in `src/data/` if Supabase isn't configured or can't be
  reached.
- Once the database is in use, **edits to `src/data/` don't reach the live
  site**. Make them in `/admin` instead. To rebuild the starting content from
  the code (e.g. after a new supplier import, for a fresh project), run
  `npm run products:seed` and use the regenerated `supabase/seed.sql`.
- The site is in English (`/en`), Spanish (`/es`), Swedish (`/sv`), German
  (`/de`), French (`/fr`) and Russian (`/ru`). Site texts live in `src/i18n/dictionaries/<lang>.json` (and `src/content/terms.ts`,
  `src/data/*.ts` for the few `Localized` texts). Product texts: English in
  `tagline` / `description`, translations in `*_es`, `*_sv`, `*_de`, `*_fr`,
  `*_ru` twin columns and matching keys on each spec row. Blank = show the
  English. `localeMigrations` in `src/i18n/product-locales.ts` lists which
  migration adds which languages; the site and admin read the newest columns
  that exist, so code can be deployed before a migration is run.
- The starting product translations are phrase lists,
  `src/i18n/product-text/<lang>.json` (English text → translation), used by
  the bundled catalogue and by `npm run products:seed`, which writes
  `seed.sql` and the translation migrations.
- The translations were written by Claude, not a professional translator.
  Have native speakers read each language before relying on it, especially
  the Spanish terms of purchase (the version that counts legally in Spain).
- A visitor who opens an address without a language (e.g. `/products`) is sent
  to the language they picked before (a `lang` cookie set by the switcher),
  else their browser's language if the site has it, else English.
- Categories and collection names still live in code
  (`src/data/categories.ts`, `src/i18n/dictionaries/en.json`), because they
  drive the menu and page layout. The panel offers the collections a category
  already uses.

## If something looks wrong

- **"Couldn't load the products" on /admin**: step 2 hasn't been run.
- **A yellow note that the account isn't an administrator**: step 3's SQL
  hasn't been run for that email.
- **The site shows the old catalogue even though edits were saved**: the site
  can't reach Supabase and is showing the bundled copy. Check the env vars are
  set *in Vercel* and that you redeployed after setting them.
- **Uploaded photos don't show on the site**: `NEXT_PUBLIC_SUPABASE_URL` was
  missing when the site was built. Set it and redeploy.
