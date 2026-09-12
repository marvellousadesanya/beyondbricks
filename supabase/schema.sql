create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null default 'Perspective',
  excerpt text not null,
  content text not null,
  image text,
  read_time text not null default '5 min read',
  author text not null default 'Beyond Bricks',
  author_id uuid not null references auth.users(id) on delete cascade,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.articles enable row level security;

create policy "Published articles are public"
  on public.articles for select
  using (is_published = true);

create policy "Authors can manage their articles"
  on public.articles for all to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);