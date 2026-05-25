-- ============================================================
-- Ticket Moove — Schema inicial
-- ============================================================

-- Organizações (tenants)
create table organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  owner_id    uuid not null references auth.users(id) on delete cascade,
  tier        text not null default 'basico' check (tier in ('basico', 'parceiro', 'premium')),
  fee_pct     numeric(5,2) not null default 7.00,
  created_at  timestamptz not null default now()
);

-- Eventos
create table events (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  title           text not null,
  slug            text not null,
  description     text,
  date            date not null,
  time            time,
  location        text not null,
  city            text not null,
  state           char(2) not null,
  capacity        int not null default 0,
  status          text not null default 'draft' check (status in ('draft', 'published', 'closed', 'cancelled')),
  banner_url      text,
  created_at      timestamptz not null default now(),
  unique (organization_id, slug)
);

-- Lotes (batches de preço por evento)
create table event_batches (
  id          uuid primary key default gen_random_uuid(),
  event_id    uuid not null references events(id) on delete cascade,
  name        text not null,
  price       numeric(10,2) not null default 0,
  capacity    int not null default 0,
  starts_at   timestamptz,
  ends_at     timestamptz,
  created_at  timestamptz not null default now()
);

-- Campos customizados do formulário de inscrição
create table event_fields (
  id          uuid primary key default gen_random_uuid(),
  event_id    uuid not null references events(id) on delete cascade,
  label       text not null,
  field_type  text not null default 'text' check (field_type in ('text', 'select', 'date', 'cpf', 'phone', 'number')),
  options     jsonb,          -- para type=select: ["P", "M", "G"]
  required    boolean not null default true,
  position    int not null default 0
);

-- Inscrições
create table registrations (
  id              uuid primary key default gen_random_uuid(),
  event_id        uuid not null references events(id) on delete cascade,
  batch_id        uuid references event_batches(id),
  status          text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'checked_in')),
  -- dados do atleta
  athlete_name    text not null,
  athlete_email   text not null,
  athlete_cpf     text not null,
  athlete_phone   text,
  athlete_dob     date,
  -- respostas dos campos customizados
  custom_fields   jsonb default '{}',
  -- controle
  checked_in_at   timestamptz,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table organizations   enable row level security;
alter table events          enable row level security;
alter table event_batches   enable row level security;
alter table event_fields    enable row level security;
alter table registrations   enable row level security;

-- Organizations: owner vê e edita só a própria
create policy "owner_all" on organizations
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Events: organização dona pode fazer tudo
create policy "org_owner_all" on events
  using (
    organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  )
  with check (
    organization_id in (
      select id from organizations where owner_id = auth.uid()
    )
  );

-- Eventos publicados são visíveis para todos (página pública)
create policy "public_read_published" on events
  for select using (status = 'published');

-- Batches e campos seguem a mesma regra dos eventos
create policy "org_owner_all" on event_batches
  using (
    event_id in (
      select id from events where organization_id in (
        select id from organizations where owner_id = auth.uid()
      )
    )
  );

create policy "public_read_batches" on event_batches
  for select using (
    event_id in (select id from events where status = 'published')
  );

create policy "org_owner_all" on event_fields
  using (
    event_id in (
      select id from events where organization_id in (
        select id from organizations where owner_id = auth.uid()
      )
    )
  );

create policy "public_read_fields" on event_fields
  for select using (
    event_id in (select id from events where status = 'published')
  );

-- Inscrições: org vê todas do seu evento; atleta cria anonimamente
create policy "org_read_own" on registrations
  for select using (
    event_id in (
      select id from events where organization_id in (
        select id from organizations where owner_id = auth.uid()
      )
    )
  );

create policy "org_update_own" on registrations
  for update using (
    event_id in (
      select id from events where organization_id in (
        select id from organizations where owner_id = auth.uid()
      )
    )
  );

create policy "public_insert" on registrations
  for insert with check (
    event_id in (select id from events where status = 'published')
  );
