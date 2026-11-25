# Quality Pool & Spa website

Next.js (App Router) + TypeScript + Tailwind. Catalogue only: no shop, contact via email and WhatsApp.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live
- `src/config/site.ts` (+ `.env.example`): email, WhatsApp number, phone, locations.
- `src/data/categories.ts`: categories (priority ones: pool covers, spas, saunas).
- **Products are edited in the admin panel at `/admin`** (Supabase). Setup and how the client uses it: [SETUP.md](SETUP.md).
  `src/data/products.ts` + `src/data/suppliers/` are the bundled catalogue: the starting content
  (`npm run products:seed` → `supabase/seed.sql`) and the fallback when Supabase isn't set up.
- `src/data/gallery.ts`: gallery photos (add the image to `public/gallery/` and an entry here).
- `src/i18n/`: languages. Live: English. Planned: es, sv, fr, de, ru.
  To add a language: copy `dictionaries/en.json`, translate, register it in
  `dictionaries.ts`, add it to `locales` in `config.ts`, and add translations to products' `Localized` fields.
- `public/brand/logo.png`: logo.

## Photos (drop in, no code changes needed)
- `public/hero/hero.jpg`: full-bleed home hero (landscape, ~2400 px wide).
- `public/hero/project.jpg`: portrait image beside "From the first thought" (4:5).
- `public/categories/<slug>.jpg`: category tiles, e.g. `pool-covers.jpg`, `spas.jpg`, `saunas-hammam.jpg` (portrait 4:5 for the three main ones).
- `public/gallery/`: project photos, referenced from `src/data/gallery.ts`.

## Supplier imports
- **Aquavia Spa**: `node scripts/import-aquavia.mjs` pulls spas, swim spas, professional spas and
  accessories from aquaviaspa.com into `src/data/imported/aquavia.json` and photos into
  `public/products/aquavia/`. It waits 10 s between requests (their robots.txt), caches pages in
  `.cache/` and can be stopped and resumed. A full run takes about an hour.
  `src/data/suppliers/aquavia.ts` maps the data onto the site's product format.
- Only reuse a supplier's photos and texts with their permission (dealer agreement).
