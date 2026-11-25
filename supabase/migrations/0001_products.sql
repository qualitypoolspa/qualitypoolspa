-- Aquavia: product catalogue and admin access. Run once in the Supabase SQL
-- editor, then supabase/seed.sql. Safe to re-run.
--
-- Security model (same as Fat Mama and Boquerone): anyone may READ, because
-- it's a public website, but only users on the admin_users allowlist may WRITE.
-- "Authenticated" alone is not a safe gate: the anon key ships to every
-- browser, and Supabase allows self-service sign-up unless it's switched off.
-- Every write policy below goes through is_admin(). If you add a table, gate
-- it the same way.

-- ----------------------------------------------------------- allowlist --

create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "admin_users self read" on public.admin_users;
create policy "admin_users self read"
  on public.admin_users for select
  to authenticated
  using (user_id = (select auth.uid()));

-- security definer so it can read admin_users without recursing into that
-- table's RLS; search_path pinned so it can't resolve anything unexpected.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ------------------------------------------------------------ products --

create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  -- The product's address: /en/products/<category>/<slug>.
  slug         text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  -- One of the category slugs in src/data/categories.ts, e.g. 'spas'.
  category     text not null,
  -- Sub-group within the category, e.g. 'premium-line' (names in the site's
  -- dictionary under "collections"). Null = no sub-group.
  collection   text,
  name         text not null,
  brand        text,
  -- English texts. The tagline is the one-liner on product cards.
  tagline      text not null default '',
  description  text not null default '',
  -- Spas: the numbers of people it is listed for, e.g. {4,5}.
  seats        integer[],
  -- [{ "group": "General", "label": "Motor", "value": "24 V" }, ...]
  specs        jsonb not null default '[]'::jsonb check (jsonb_typeof(specs) = 'array'),
  -- [{ "src": "/products/...webp" or a storage URL, "width": 1600,
  --    "height": 900, "contain": true }, ...]. The first one is the cover.
  images       jsonb not null default '[]'::jsonb check (jsonb_typeof(images) = 'array'),
  -- Shown on the site at all. New products start hidden.
  is_visible   boolean not null default false,
  -- "Popular products" on the home page.
  is_featured  boolean not null default false,
  -- "Our selection", shown first on the category page.
  is_selection boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (category, slug)
);

create index if not exists products_order_idx on public.products (category, sort_order);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

alter table public.products enable row level security;

-- Visitors only ever see visible products; admins see everything (via the
-- write policy below, which covers reads too). Visitors get their own policy
-- because they aren't allowed to call is_admin().
drop policy if exists "products public read" on public.products;
create policy "products public read"
  on public.products for select
  to anon, authenticated
  using (is_visible);

drop policy if exists "products admin write" on public.products;
create policy "products admin write"
  on public.products for all
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Table access for the website's roles. Newer Supabase projects don't grant
-- this automatically for tables made in the SQL editor ("permission denied for
-- table products"). The policies above still decide which rows each role sees
-- and changes.
grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.admin_users to authenticated;

-- -------------------------------------------------------------- bucket --
-- Photos uploaded in the admin panel. Public bucket: these are photos on a
-- public web page. If this insert fails with a permissions error, create the
-- bucket in the dashboard instead (Storage -> New bucket -> "products",
-- Public on) and re-run the rest of this file.

insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- Uploads are admin-only. Without these, anyone holding the (public) anon
-- key could write files into the bucket.

drop policy if exists "product photos public read" on storage.objects;
create policy "product photos public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'products');

drop policy if exists "product photos admin insert" on storage.objects;
create policy "product photos admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'products' and public.is_admin());

drop policy if exists "product photos admin update" on storage.objects;
create policy "product photos admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'products' and public.is_admin())
  with check (bucket_id = 'products' and public.is_admin());

drop policy if exists "product photos admin delete" on storage.objects;
create policy "product photos admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'products' and public.is_admin());
