-- Run this once in Supabase: SQL Editor > New query > paste > Run.

create table public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null check (char_length(name) between 1 and 80),
  attending   boolean     not null,
  guests      smallint    not null default 1 check (guests between 0 and 6),
  message     text        check (char_length(message) <= 500),
  created_at  timestamptz not null default now()
);

alter table public.rsvps enable row level security;

-- Newer Supabase projects do not always grant table access automatically; allow insert only.
grant usage on schema public to anon;
grant insert on public.rsvps to anon;

-- Guests (the public "anon" key) may ADD a reply, but can never read, change or delete any.
create policy "guests can submit an rsvp"
  on public.rsvps for insert to anon
  with check (char_length(name) between 1 and 80 and guests between 0 and 6);

-- You read the replies in the Supabase dashboard: Table Editor > rsvps (or export as CSV).
