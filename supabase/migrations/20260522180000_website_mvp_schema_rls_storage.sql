-- GU Solutions website MVP database foundation.
-- Fallback filename: Supabase CLI is not installed in this environment, so this
-- migration was created manually instead of with `supabase migration new`.

create schema if not exists private;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  slug text not null,
  title_es text not null,
  title_en text,
  client_name text,
  category text,
  short_description_es text not null,
  short_description_en text,
  technologies text[] not null default '{}',
  main_image_url text,
  project_url text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  is_in_progress boolean not null default false,
  sort_order integer not null default 100,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),

  constraint projects_slug_key unique (slug),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint projects_title_es_not_blank check (length(btrim(title_es)) > 0),
  constraint projects_short_description_es_not_blank check (length(btrim(short_description_es)) > 0),
  constraint projects_sort_order_non_negative check (sort_order >= 0),
  constraint projects_main_image_url_http check (main_image_url is null or main_image_url ~ '^https?://'),
  constraint projects_project_url_http check (project_url is null or project_url ~ '^https?://')
);

create table if not exists public.contact_leads (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  project_type text,
  message text not null,
  source text not null default 'website',
  user_agent text,
  created_at timestamptz not null default timezone('utc', now()),

  constraint contact_leads_name_not_blank check (length(btrim(name)) > 0),
  constraint contact_leads_email_not_blank check (length(btrim(email)) > 0),
  constraint contact_leads_email_shape check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  constraint contact_leads_message_not_blank check (length(btrim(message)) > 0),
  constraint contact_leads_source_not_blank check (length(btrim(source)) > 0)
);

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function private.set_updated_at();

create index if not exists projects_published_order_idx
  on public.projects (is_featured desc, sort_order asc, created_at desc)
  where is_published = true;

create index if not exists projects_published_category_idx
  on public.projects (category, sort_order asc)
  where is_published = true and category is not null;

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

alter table public.projects enable row level security;
alter table public.contact_leads enable row level security;

-- Supabase projects created after 2026-04-28 may not expose new tables to the
-- Data API automatically. Grant only the API privileges required by the MVP;
-- RLS policies below still decide which rows are visible or writable.
grant select on public.projects to anon, authenticated;
grant insert on public.contact_leads to anon, authenticated;

drop policy if exists "Published projects are publicly readable" on public.projects;
create policy "Published projects are publicly readable"
on public.projects
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Public visitors can create contact leads" on public.contact_leads;
create policy "Public visitors can create contact leads"
on public.contact_leads
for insert
to anon, authenticated
with check (
  length(btrim(name)) > 0
  and length(btrim(email)) > 0
  and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  and length(btrim(message)) > 0
  and length(btrim(source)) > 0
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  5242880,
  array['image/avif', 'image/webp', 'image/png', 'image/jpeg']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Published project images are publicly readable" on storage.objects;
create policy "Published project images are publicly readable"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'project-images'
  and exists (
    select 1
    from public.projects
    where projects.slug = (storage.foldername(name))[1]
      and projects.is_published = true
  )
);
