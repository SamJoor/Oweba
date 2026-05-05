create table if not exists contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text not null,
  email text not null,
  phone text not null,
  message text not null,
  source text not null default 'contact_form'
);

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text not null,
  email text not null,
  phone text not null,
  website_url text,
  industry text not null,
  needs text not null,
  budget_range text not null,
  timeline text not null,
  goals text not null
);

create table if not exists preview_generations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  industry text not null,
  tagline text,
  style text not null,
  goal text,
  contact_email text,
  generated_headline text not null,
  generated_copy text not null,
  generated_sections jsonb not null
);
