-- Stabilize Jaglul Studio auth checks and post publishing access.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role in ('admin', 'super_admin')
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.media enable row level security;

drop policy if exists "profiles read own profile" on public.profiles;
create policy "profiles read own profile"
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
  or (select public.is_admin())
);

drop policy if exists "profiles admin manage" on public.profiles;
create policy "profiles admin manage"
on public.profiles
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "posts public read published" on public.posts;
create policy "posts public read published"
on public.posts
for select
to anon, authenticated
using (visibility = 'published');

drop policy if exists "posts admin manage" on public.posts;
create policy "posts admin manage"
on public.posts
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "media public read published post media" on public.media;
create policy "media public read published post media"
on public.media
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.posts
    where posts.id = media.post_id
      and posts.visibility = 'published'
  )
);

drop policy if exists "media admin manage" on public.media;
create policy "media admin manage"
on public.media
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

grant select on public.profiles to authenticated;
grant select on public.posts, public.media to anon, authenticated;
grant insert, update, delete on public.posts, public.media to authenticated;

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_posts_visibility on public.posts(visibility);
create index if not exists idx_posts_created_at on public.posts(created_at desc);
create index if not exists idx_posts_published_feed
  on public.posts(is_pinned desc, created_at desc)
  where visibility = 'published';
create index if not exists idx_posts_created_by on public.posts(created_by);
create index if not exists idx_media_post_id on public.media(post_id);

do $$
begin
  if not exists (
    select 1
    from pg_indexes
    where schemaname = 'public'
      and indexname = 'idx_posts_slug_unique'
  ) then
    if not exists (
      select 1
      from public.posts
      where slug is not null
      group by slug
      having count(*) > 1
    ) then
      execute 'create unique index idx_posts_slug_unique on public.posts(slug)';
    else
      execute 'create index if not exists idx_posts_slug on public.posts(slug)';
    end if;
  end if;
end $$;
