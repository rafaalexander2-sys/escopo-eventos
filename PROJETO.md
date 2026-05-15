# Plataforma de Eventos White Label — Estado do Projeto

Documento vivo. Atualizado em Mai/2026. Acesse de qualquer dispositivo.

---

## O que já foi feito

### 1. Escopo do produto (`index.html`)
Documento de escopo completo em HTML com:
- Problema de mercado (white label, dashboards ruins, abandono de carrinho)
- Arquitetura do produto (3 camadas)
- Stack técnica escolhida
- Análise de concorrentes (Sympla, Eventbrite, Even3, E-inscrição, Ticket Gospel, Tiketo)
- Módulo Marketing Premium inspirado na Ticket Fairy (AU) — pixels, CAC, ROAS, referral
- Roadmap de 10 semanas
- Decisões pendentes

### 2. Banco de dados (`supabase/migrations/`)

**`20260515_001_schema.sql`** — 11 tabelas:

| Tabela | Descrição |
|---|---|
| `tenants` | Cada organizador é um tenant (identificado pelo slug) |
| `tenant_branding` | Logo, cores, domínio próprio (white label) |
| `profiles` | Usuários do painel (admin, staff, superadmin) |
| `events` | Eventos criados pelos organizadores |
| `ticket_types` | Tipos de ingresso por evento (gratuito, pago, VIP…) |
| `form_fields` | Campos customizáveis do formulário de inscrição |
| `registrations` | Inscrições com QR code e código de referral gerados automaticamente |
| `registration_answers` | Respostas ao formulário customizado |
| `payments` | Transações com gateway, spread e repasse separados |
| `pixels` | Pixels por plataforma — plano Marketing Premium |
| `affiliates` | Co-promotores com comissão automática — plano Marketing Premium |

**`20260515_002_rls.sql`** — Row Level Security:
- Admin só acessa dados do próprio tenant
- Superadmin acessa tudo
- Portal público lê eventos publicados sem autenticação
- Participantes se inscrevem sem precisar ter conta

### 3. Frontend (`app/`)

Stack: **React + Vite + TypeScript + React Router v6 + Supabase JS**

```
app/
├── src/
│   ├── App.tsx              ← detecta subdomínio e escolhe a camada
│   ├── lib/
│   │   ├── subdomain.ts     ← landing / admin / portal
│   │   ├── supabase.ts      ← client do Supabase
│   │   └── mock.ts          ← dados fictícios para desenvolvimento
│   └── apps/
│       ├── landing/         ← plataforma.com.br (institucional)
│       ├── admin/           ← app.plataforma.com.br (painel)
│       │   ├── admin.css
│       │   ├── AdminApp.tsx
│       │   ├── layout/AdminLayout.tsx   ← sidebar + Outlet
│       │   └── pages/
│       │       ├── Login.tsx
│       │       ├── Dashboard.tsx        ← 4 métricas + inscrições recentes
│       │       └── Events.tsx           ← lista com busca + badges de status
│       └── portal/          ← {slug}.plataforma.com.br (público white label)
├── .env.example
└── package.json
```

#### Rotas do Admin implementadas

| Rota | Tela |
|---|---|
| `/login` | Login |
| `/dashboard` | Dashboard com métricas e inscrições recentes |
| `/events` | Lista de eventos com busca e status |
| `/events/new` | Criar evento (placeholder) |
| `/events/:id` | Detalhe do evento (placeholder) |
| `/registrations` | Todas as inscrições (placeholder) |
| `/financial` | Financeiro (placeholder) |
| `/settings/branding` | White Label (placeholder) |
| `/settings` | Configurações (placeholder) |

#### Como rodar localmente

```bash
cd app
cp .env.example .env
# Preenche VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
# VITE_APP_MODE=admin para testar o painel
npm install
npm run dev
```

> Sem conta no Supabase ainda? Coloca qualquer URL no `.env` — o mock funciona sem conexão real.

---

## Próximas telas a construir

### Admin (painel do organizador)
- [ ] `NewEvent.tsx` — formulário de criação de evento (título, data, local, capacidade, imagem)
- [ ] `EventDetail.tsx` — visão geral do evento com métricas individuais
- [ ] `Registrations.tsx` — lista completa de inscritos com check-in e export CSV
- [ ] `Financial.tsx` — relatório de receita bruta / taxa / líquido
- [ ] `Branding.tsx` — upload de logo, picker de cor, preview em tempo real

### Portal (público white label)
- [ ] `EventPage.tsx` — página pública do evento com marca do organizador
- [ ] `RegistrationForm.tsx` — formulário de inscrição + checkout
- [ ] `Confirmation.tsx` — confirmação com QR code

---

## Decisões pendentes (negócio)

| Item | Status |
|---|---|
| Gateway de pagamento (PagSeguro vs Asaas) | Pendente benchmark |
| Modelo de cobrança (spread / mensalidade / híbrido) | Pendente |
| Precificação do plano Marketing Premium | Pendente |
| Limites por plano (eventos, participantes, storage) | Pendente |
| Cancelamento e reembolso — quem absorve a taxa? | Pendente |
| Certificado de participação — entra no MVP? | Pendente |
| LGPD — parecer jurídico | Pendente |
| Nome comercial da plataforma | Pendente |

---

## Arquitetura para alta escala (caminho de migração)

O MVP foi desenhado para crescer sem reescrever. A migração acontece em fases conforme a receita justifica.

### Fase 1 — MVP (agora)
```
Cloudflare Pages  →  React SPA
Supabase          →  PostgreSQL + Auth + Storage + Edge Functions
PagSeguro/Asaas   →  pagamentos + split
Resend            →  e-mails transacionais
PostHog           →  analytics + funil
```
**Custo: ~R$ 0/mês até escalar**

---

### Fase 2 — Crescimento (10k–50k inscrições/mês)
Quando: primeiros clientes pagantes, receita cobrindo infra.

```diff
+ Redis (Upstash)        ← cache de sessão, rate limiting, filas de e-mail
+ Cloudflare R2          ← storage de imagens (sai do Supabase Storage)
+ Supabase Edge Functions ← lógica server-side (webhooks de pagamento, QR code, Conversions API)
+ Sentry                 ← monitoramento de erros em produção
```

**Por que Redis:** carrinho abandonado precisa de TTL e filas de disparo de e-mail com delay. Supabase sozinho não resolve bem isso.

---

### Fase 3 — Escala (50k–500k inscrições/mês)
Quando: eventos com 10k+ acessos simultâneos, SLA exigido por clientes enterprise.

```diff
+ PostgreSQL read replica   ← leituras do Portal público saem da replica, escritas no primário
+ Cloudflare Waiting Room   ← fila virtual para abertura de inscrições de eventos grandes (resolve o problema que derrubou a Sympla)
+ Separação de serviços     ← checkout vira serviço isolado (falha sem derrubar o painel)
+ CDN agressivo             ← páginas de evento em cache estático com revalidação
+ Logs centralizados        ← Grafana + Loki ou Datadog
```

**Ponto crítico:** o momento de maior risco é a abertura de inscrições de um evento grande. O Waiting Room resolve isso antes que você precise migrar o banco.

---

### Fase 4 — Enterprise (500k+ inscrições/mês)
Quando: clientes que exigem SLA 99.9%, multi-região, compliance avançado.

```diff
+ Multi-região              ← Cloudflare + Supabase replicado por região
+ Microsserviços            ← payments-service, notification-service, analytics-service separados
+ Message broker            ← RabbitMQ ou AWS SQS para eventos assíncronos
+ Aurora Serverless         ← banco escala automaticamente com o tráfego
+ SOC 2 / ISO 27001         ← certificações para clientes enterprise
```

---

### Resumo: o que NÃO muda entre fases

| O que fica igual | Por quê |
|---|---|
| React + Vite no Cloudflare Pages | CDN global, zero ops, free tier generoso |
| Estrutura de RLS multi-tenant | O isolamento por tenant é a fundação — não muda |
| Supabase Auth | Trocar auth no meio do produto é custoso; só migra se necessário |
| Rotas de subdomínio | A lógica de slug está no frontend, independente do backend |

**A regra:** só migra quando o custo da solução atual > custo da migração. Supabase aguenta muito mais do que parece.

---

## Stack da Sympla (referência de mercado)

Pesquisa realizada em Mai/2026:

| Camada | Tecnologia identificada |
|---|---|
| Frontend legado | PHP + jQuery |
| Frontend moderno | React / Vue.js (migração em andamento) |
| Backend | PHP + Python, microserviços |
| Infra | AWS |
| Escala | Queue-it — fila virtual para 5k–18k usuários/minuto |
| Analytics | Mixpanel + Looker |
| Retargeting | Criteo |
| Pagamentos | Parceria Mastercard + Yuno (orquestrador LatAm) |
| Suporte | Intercom |

**Vantagem nossa:** nascemos sem dívida técnica. Eles estão migrando de PHP para React enquanto operam — nós começamos em React.

---

## Referência internacional — Ticket Fairy (AU)

Plataforma australiana que transformou ferramentas de marketing no diferencial do produto:
- Pixels de Meta, Google, TikTok, Reddit e Spotify gerenciados dentro da plataforma
- Dashboard de CAC e ROAS por canal em tempo real
- Conversions API server-side (atribuição sem depender de cookies)
- Sistema de referral — cada inscrito recebe link rastreado e vira promoter

Inspiração direta para o **plano Marketing Premium** da nossa plataforma.
