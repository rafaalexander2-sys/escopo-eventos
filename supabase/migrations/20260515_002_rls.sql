-- ============================================================
-- 002 · Row Level Security (RLS)
-- Isolamento por tenant — nenhum organizador acessa dados de outro
-- ============================================================

-- ── Funções auxiliares ────────────────────────────────────────

-- Retorna o tenant_id do usuário autenticado
create or replace function current_tenant_id()
returns uuid language sql security definer stable as $$
  select tenant_id from profiles where id = auth.uid()
$$;

-- Retorna o papel (role) do usuário autenticado
create or replace function current_user_role()
returns user_role language sql security definer stable as $$
  select role from profiles where id = auth.uid()
$$;

-- ── Habilita RLS em todas as tabelas ─────────────────────────

alter table tenants              enable row level security;
alter table tenant_branding      enable row level security;
alter table profiles             enable row level security;
alter table events               enable row level security;
alter table ticket_types         enable row level security;
alter table form_fields          enable row level security;
alter table registrations        enable row level security;
alter table registration_answers enable row level security;
alter table payments             enable row level security;
alter table pixels               enable row level security;
alter table affiliates           enable row level security;

-- ── tenants ───────────────────────────────────────────────────

create policy "superadmin acessa todos os tenants" on tenants
  using (current_user_role() = 'superadmin');

create policy "admin acessa apenas o seu tenant" on tenants
  using (id = current_tenant_id());

-- ── tenant_branding ───────────────────────────────────────────

-- Leitura pública — o Portal precisa carregar o branding sem autenticação
create policy "leitura pública do branding" on tenant_branding
  for select using (true);

create policy "admin gerencia branding do seu tenant" on tenant_branding
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todo branding" on tenant_branding
  using (current_user_role() = 'superadmin');

-- ── profiles ─────────────────────────────────────────────────

create policy "usuário vê o próprio perfil" on profiles
  using (id = auth.uid());

create policy "admin vê perfis do seu tenant" on profiles
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todos os perfis" on profiles
  using (current_user_role() = 'superadmin');

-- ── events ───────────────────────────────────────────────────

-- Eventos publicados são visíveis sem autenticação (Portal público)
create policy "leitura pública de eventos publicados" on events
  for select using (status = 'published');

create policy "admin gerencia eventos do seu tenant" on events
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todos os eventos" on events
  using (current_user_role() = 'superadmin');

-- ── ticket_types ──────────────────────────────────────────────

create policy "leitura pública de ingressos ativos" on ticket_types
  for select using (
    is_active = true
    and exists (
      select 1 from events
      where id = ticket_types.event_id and status = 'published'
    )
  );

create policy "admin gerencia ingressos do seu tenant" on ticket_types
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todos os ingressos" on ticket_types
  using (current_user_role() = 'superadmin');

-- ── form_fields ───────────────────────────────────────────────

create policy "leitura pública dos campos de formulário" on form_fields
  for select using (
    exists (
      select 1 from events
      where id = form_fields.event_id and status = 'published'
    )
  );

create policy "admin gerencia campos do seu tenant" on form_fields
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todos os campos" on form_fields
  using (current_user_role() = 'superadmin');

-- ── registrations ─────────────────────────────────────────────

-- Qualquer pessoa pode se inscrever em evento publicado (sem login)
create policy "inscrição pública em eventos publicados" on registrations
  for insert with check (
    exists (
      select 1 from events
      where id = registrations.event_id and status = 'published'
    )
  );

create policy "admin gerencia inscrições do seu tenant" on registrations
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todas as inscrições" on registrations
  using (current_user_role() = 'superadmin');

-- ── registration_answers ──────────────────────────────────────

-- Insert permitido para quem criou a inscrição (sem login, via função server-side)
create policy "insert de respostas junto com inscrição" on registration_answers
  for insert with check (
    exists (
      select 1 from registrations
      where id = registration_answers.registration_id
    )
  );

create policy "admin lê respostas do seu tenant" on registration_answers
  for select using (
    exists (
      select 1 from registrations r
      where r.id = registration_answers.registration_id
        and r.tenant_id = current_tenant_id()
    )
  );

create policy "superadmin acessa todas as respostas" on registration_answers
  using (current_user_role() = 'superadmin');

-- ── payments ─────────────────────────────────────────────────

create policy "admin vê pagamentos do seu tenant" on payments
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todos os pagamentos" on payments
  using (current_user_role() = 'superadmin');

-- ── pixels ───────────────────────────────────────────────────

create policy "admin gerencia pixels do seu tenant" on pixels
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todos os pixels" on pixels
  using (current_user_role() = 'superadmin');

-- ── affiliates ───────────────────────────────────────────────

create policy "admin gerencia afiliados do seu tenant" on affiliates
  using (tenant_id = current_tenant_id());

create policy "superadmin acessa todos os afiliados" on affiliates
  using (current_user_role() = 'superadmin');
