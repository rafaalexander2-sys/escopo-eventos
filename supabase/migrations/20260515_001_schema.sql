-- ============================================================
-- 001 · Schema principal
-- Plataforma de Eventos White Label — MVP
-- ============================================================

-- ── Enums ────────────────────────────────────────────────────

create type tenant_plan       as enum ('free', 'basic', 'premium');
create type tenant_status     as enum ('trial', 'active', 'suspended');
create type user_role         as enum ('superadmin', 'admin', 'staff');
create type event_status      as enum ('draft', 'published', 'cancelled', 'finished');
create type field_type        as enum ('text', 'email', 'phone', 'select', 'checkbox', 'textarea');
create type registration_status as enum ('pending', 'confirmed', 'cancelled', 'checked_in');
create type payment_status    as enum ('pending', 'paid', 'refunded', 'failed');
create type payment_gateway   as enum ('pagseguro', 'asaas', 'mercadopago');
create type pixel_platform    as enum ('meta', 'google', 'tiktok', 'reddit', 'spotify');
create type commission_type   as enum ('fixed', 'percentage');

-- ── Tenants (organizadores) ───────────────────────────────────

create table tenants (
  id         uuid        primary key default gen_random_uuid(),
  slug       text        not null unique,          -- subdomínio: {slug}.plataforma.com.br
  name       text        not null,
  plan       tenant_plan not null default 'trial',
  status     tenant_status not null default 'trial',
  created_at timestamptz not null default now()
);

-- ── Branding white label por tenant ──────────────────────────

create table tenant_branding (
  id              uuid primary key default gen_random_uuid(),
  tenant_id       uuid not null references tenants(id) on delete cascade unique,
  logo_url        text,
  primary_color   text not null default '#0071e3',
  secondary_color text,
  custom_domain   text unique,                     -- CNAME próprio (pós-MVP)
  updated_at      timestamptz not null default now()
);

-- ── Profiles (extende auth.users do Supabase) ─────────────────

create table profiles (
  id         uuid      primary key references auth.users(id) on delete cascade,
  tenant_id  uuid      references tenants(id) on delete set null, -- null = superadmin
  role       user_role not null default 'admin',
  full_name  text,
  created_at timestamptz not null default now()
);

-- ── Eventos ───────────────────────────────────────────────────

create table events (
  id           uuid         primary key default gen_random_uuid(),
  tenant_id    uuid         not null references tenants(id) on delete cascade,
  created_by   uuid         not null references profiles(id),
  title        text         not null,
  description  text,
  start_at     timestamptz  not null,
  end_at       timestamptz,
  location     text,
  location_url text,
  cover_url    text,
  capacity     int          check (capacity > 0),  -- null = ilimitado
  status       event_status not null default 'draft',
  created_at   timestamptz  not null default now(),
  updated_at   timestamptz  not null default now()
);

-- ── Tipos de ingresso por evento ─────────────────────────────

create table ticket_types (
  id             uuid    primary key default gen_random_uuid(),
  event_id       uuid    not null references events(id) on delete cascade,
  tenant_id      uuid    not null references tenants(id) on delete cascade,
  name           text    not null,
  description    text,
  price          numeric(10,2) not null default 0 check (price >= 0),
  quantity       int     check (quantity > 0),     -- null = ilimitado
  sales_start_at timestamptz,
  sales_end_at   timestamptz,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now()
);

-- ── Campos customizados do formulário de inscrição ───────────

create table form_fields (
  id          uuid       primary key default gen_random_uuid(),
  event_id    uuid       not null references events(id) on delete cascade,
  tenant_id   uuid       not null references tenants(id) on delete cascade,
  label       text       not null,
  field_type  field_type not null default 'text',
  options     jsonb,                               -- para campos do tipo 'select'
  is_required boolean    not null default false,
  position    int        not null default 0,
  created_at  timestamptz not null default now()
);

-- ── Inscrições (participantes) ────────────────────────────────

create table registrations (
  id                uuid                not null default gen_random_uuid() primary key,
  event_id          uuid                not null references events(id) on delete cascade,
  tenant_id         uuid                not null references tenants(id) on delete cascade,
  ticket_type_id    uuid                not null references ticket_types(id),
  attendee_name     text                not null,
  attendee_email    text                not null,
  attendee_phone    text,
  status            registration_status not null default 'pending',
  qr_code           text                not null unique default gen_random_uuid()::text,
  referral_code     text                unique default substr(gen_random_uuid()::text, 1, 8),
  referred_by       uuid                references registrations(id),
  cart_abandoned_at timestamptz,                  -- preenchido quando inscrição é iniciada mas não finalizada
  created_at        timestamptz         not null default now(),
  updated_at        timestamptz         not null default now()
);

-- ── Respostas ao formulário customizado ───────────────────────

create table registration_answers (
  id              uuid primary key default gen_random_uuid(),
  registration_id uuid not null references registrations(id) on delete cascade,
  form_field_id   uuid not null references form_fields(id) on delete cascade,
  value           text not null,
  unique (registration_id, form_field_id)
);

-- ── Pagamentos ────────────────────────────────────────────────

create table payments (
  id                    uuid            primary key default gen_random_uuid(),
  registration_id       uuid            not null references registrations(id) on delete cascade,
  tenant_id             uuid            not null references tenants(id) on delete cascade,
  gateway               payment_gateway not null,
  gateway_transaction_id text           unique,
  amount                numeric(10,2)   not null check (amount >= 0),
  platform_fee          numeric(10,2)   not null default 0 check (platform_fee >= 0), -- spread retido
  net_amount            numeric(10,2)   not null check (net_amount >= 0),             -- repasse ao organizador
  status                payment_status  not null default 'pending',
  paid_at               timestamptz,
  created_at            timestamptz     not null default now(),
  updated_at            timestamptz     not null default now()
);

-- ── Pixels de rastreamento (plano Marketing Premium) ─────────

create table pixels (
  id           uuid           primary key default gen_random_uuid(),
  tenant_id    uuid           not null references tenants(id) on delete cascade,
  platform     pixel_platform not null,
  pixel_id     text           not null,
  access_token text,                              -- para Conversions API server-side
  is_active    boolean        not null default true,
  created_at   timestamptz    not null default now(),
  unique (tenant_id, platform)
);

-- ── Afiliados / co-promotores (plano Marketing Premium) ──────

create table affiliates (
  id               uuid            primary key default gen_random_uuid(),
  tenant_id        uuid            not null references tenants(id) on delete cascade,
  event_id         uuid            references events(id) on delete cascade, -- null = todos os eventos
  name             text            not null,
  email            text            not null,
  referral_code    text            not null unique,
  commission_type  commission_type not null default 'percentage',
  commission_value numeric(10,2)   not null check (commission_value > 0),
  created_at       timestamptz     not null default now()
);

-- ── Índices para queries comuns ───────────────────────────────

create index on events (tenant_id, status);
create index on events (tenant_id, start_at);
create index on ticket_types (event_id);
create index on registrations (event_id, status);
create index on registrations (tenant_id, status);
create index on registrations (attendee_email);
create index on registrations (cart_abandoned_at) where cart_abandoned_at is not null;
create index on registrations (referral_code);
create index on payments (tenant_id, status);
create index on payments (registration_id);
create index on affiliates (referral_code);

-- ── Trigger updated_at ────────────────────────────────────────

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_events_updated_at
  before update on events
  for each row execute function update_updated_at();

create trigger trg_registrations_updated_at
  before update on registrations
  for each row execute function update_updated_at();

create trigger trg_payments_updated_at
  before update on payments
  for each row execute function update_updated_at();
