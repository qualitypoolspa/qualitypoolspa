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
- `src/data/products.ts`: products (current ones are samples; replace with real data).
- `src/i18n/`: languages. Live: English. Planned: es, sv, fr, de, ru.
  To add a language: copy `dictionaries/en.json`, translate, register it in
  `dictionaries.ts`, add it to `locales` in `config.ts`, and add translations to products' `Localized` fields.
- `public/brand/logo.png`: logo.
