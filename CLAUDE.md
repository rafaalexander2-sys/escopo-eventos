# Plataforma de Eventos Endurance — CLAUDE.md

> Documento de referência para desenvolvimento assistido por IA. Atualizar sempre que houver decisões relevantes.

---

## Visão Geral do Projeto

Plataforma SaaS para gestão de inscrições em **eventos endurance** (corridas de rua, triathlon, ciclismo) posicionada como **parceiro real do organizador** — não apenas uma ferramenta de inscrição. A plataforma atua como braço de marketing e crescimento do organizador: taxa menor, repasse rápido, atendimento humano, ferramentas de captação e performance embutidas.

**Status atual:** Decisões estratégicas alinhadas. Construção do MVP em paralelo à validação com organizadores.
**Sócios:** Rafael Alexander (tech/produto/marketing) · Cássio Silva Miranda (estratégia/comercial/negócio)
**Documentos:** `index.html` (Escopo MVP v0) · `reuniao-210526.html` (Briefing de reunião)
**Branch ativo:** `claude/review-partner-document-cYrOx`

---

## Decisões Tomadas na Reunião (21 Mai 2026)

Reunião de alinhamento entre sócios. Principais resoluções:

### ✅ Nicho: Endurance, com porta aberta para adjacentes
Mercado esportivo confirmado como foco. Corporativo descartado para MVP (ciclo de venda mais longo, decisão mais burocrática, estrutura maior necessária). A plataforma será posicionada para o endurance, mas se vier um organizador corporativo, ele é bem-vindo — o posicionamento simplesmente não falará com ele diretamente.

### ✅ Diferencial: Ser parceiro, não só plataforma
O diferencial central não é white label nem captação isoladamente — é a **combinação** de taxa menor + repasse rápido + atendimento próximo + ferramentas de performance. A plataforma atua como um braço de marketing do organizador. O cara não contrata só uma ferramenta; ele contrata alguém que vai junto no evento.

### ✅ Modelo de negócio: Tiers de taxa por inscrição
Sem mensalidade fixa. Só % por inscrição, com três níveis:

| Tier | Taxa | O que entrega |
|---|---|---|
| **Básico** | ~7% | Plataforma padrão (inscrição, pagamento, QR code, dashboard) |
| **Parceiro** | ~10–12% | Básico + apoio de marketing/performance (matching o que o cara já paga na Ticket Sports, mas com muito mais entrega) |
| **Premium** | ~15% | Parceiro + app white label, comunidade, marketplace de produtos, ecossistema completo |

**Lógica do tier Parceiro:** o organizador já paga 10% na Ticket Sports sem receber nada além da plataforma. No tier Parceiro ele paga igual mas recebe apoio real de performance/captação.

### ✅ Captação = marketing como serviço, não mídia bancada pela plataforma
O investimento em mídia paga é do organizador. A plataforma oferece a expertise em performance (Rafael) e as ferramentas (automação, dashboard, reativação de base). A taxa maior do tier Parceiro remunera esse trabalho. Analogia com Amazon: ao divulgar um evento, a plataforma ganha visibilidade de marca junto.

### ✅ Validar e construir em paralelo
Não é esperar validação para começar. É construir o MVP ao mesmo tempo em que se conversa com organizadores. Os primeiros 2–3 clientes não precisam gerar receita — o objetivo é validar que a plataforma funciona de verdade antes de escalar.

### ✅ Oferta de inauguração para primeiros clientes
Taxa reduzida (ex: 4% em vez de 7%) para os primeiros clientes que toparem ser "clientes fundadores". Limite claro de vagas. Cria senso de urgência e protege a capacidade técnica de suportar os primeiros eventos simultaneamente.

### ✅ White label como upsell, não gancho de entrada
Confirmado: white label vai para o tier Premium. Organizadores com marca consolidada (Yescom, Race83, etc.) pagarão mais por isso. Para entrada, o gancho é taxa + repasse + atendimento.

### ✅ Divisão de papéis
- **Rafael:** construção do produto (tech), marketing digital e performance pós-MVP
- **Cássio:** estratégia de negócio, planejamento, comercial, análise de mercado, benchmarks
- **Aline** (parceira de Rafael): design/branding/logo — entra quando o nome for definido

### ✅ Cadência de trabalho
- Reunião mensal longa (1–2h) para alinhamento estratégico
- Comunicação assíncrona entre reuniões (documentos + WhatsApp)
- Próxima reunião: daqui a 15 dias (início de junho 2026)
- Cássio ficará 1 mês em SP sozinho (julho); família vai depois — ritmo pode variar nesse período

### ✅ Equity / Formalização de sociedade
Formalizar só após validação e primeiros sinais de receita. Quem entrar depois (eventual sócio técnico ou investidor) entra em condições diferentes, já que não esteve na nascente do projeto. Por enquanto: sociedade informal, foco em construir.

### ✅ Escopo geográfico: circunstancial
Sem estratégia geográfica rígida por enquanto. A prioridade é falar com organizadores que qualquer um dos dois sócios consiga acessar. Nordeste identificado como fronteira de crescimento (9% → 22% em 1 ano), mas não é pré-condição de entrada.

---

## O Problema que o Produto Resolve

Três dores claras no mercado endurance:

1. **Taxa alta e repasse lento** — Ticket Sports cobra ~10% e retém dinheiro após o evento; Sympla cobra 3,49% extra para antecipar o repasse. Organizador com fluxo de caixa travado.
2. **Organizador invisível** — plataformas grandes são self-service. O organizador profissional é um número numa lista de 2.500 eventos. Nenhuma ajuda para encher a próxima edição.
3. **Captação manual e ineficiente** — a base de participantes de edições anteriores existe mas é mal aproveitada. O organizador faz planilha + grupo de WhatsApp + e-mail manual. Não há funil estruturado, sem automação, sem dado.

---

## Modelo de Negócio

**Receita:** percentual por inscrição vendida (sem mensalidade). Três tiers:

- **Básico (~7%):** plataforma + checkout + dashboard + QR code. O organizador opera sozinho.
- **Parceiro (~10–12%):** básico + apoio de performance/captação (Rafael aplica skills de marketing digital no evento do organizador). Taxa igual à Ticket Sports, entrega muito maior.
- **Premium (~15%):** parceiro + app white label, marketplace de produtos, comunidade de atletas, ecossistema completo. Para organizadores com marca consolidada.

**Pagamentos — política de repasse:**
- **Pix:** repasse mais rápido (risco de chargeback baixo)
- **Cartão de crédito:** repasse em 30 dias (proteção contra chargeback); antecipação disponível com acréscimo
- **Boleto:** avaliar se mantém ou remove (baixa aderência no endurance)
- **Pix parcelado:** explorar como substituto ao boleto parcelado — alta conversão, baixo risco

**Gateway:** PagSeguro/PagBank como referência (usado pela concorrência direta). Benchmark técnico pendente entre PagSeguro e Asaas.

---

## Novas Features Identificadas na Reunião

### Marketplace de produtos do organizador
O organizador vende no mesmo checkout: camiseta, kit, medal, produtos licenciados do evento. A plataforma cobra taxa sobre as vendas de produto também. Alta aderência no endurance (atletas gastam muito em gear). No futuro: dropship de produtos esportivos terceiros dentro da plataforma.

### Transferência de titularidade (mercado secundário autorizado)
Inspirado no mercado australiano/asiático: atleta que não pode ir ao evento vende/transfere a inscrição dentro da própria plataforma. Plataforma cobra uma segunda taxa no mesmo ingresso. Acaba com o mercado informal de grupos de WhatsApp.

### App white label (roadmap — não MVP)
No tier Premium: app próprio do organizador (não só link). Dentro do app: comunidade, publicação de resultado pós-evento, integração com ferramentas de fitness (Strava, etc.), experiência do participante ao longo do evento.

---

## Arquitetura do Produto

Três camadas independentes, mesmo backend multi-tenant. RLS por tenant no Supabase.

| Camada | Descrição | URL |
|---|---|---|
| Landing | Site institucional da plataforma | `plataforma.com.br` |
| Admin | Painel do organizador | `app.plataforma.com.br` |
| Portal | Página pública white label | `{slug}.plataforma.com.br` |
| Futuro | Domínio próprio do cliente | `eventos.cliente.com` |

---

## Stack Técnica

| Camada | Tecnologia | Custo MVP |
|---|---|---|
| Frontend | React + Vite | Grátis |
| Deploy | Cloudflare Pages (SSL wildcard, CDN global) | Grátis |
| Banco / Auth | Supabase (PostgreSQL + Auth + Storage + Edge Functions) | Grátis até 500 MB |
| Pagamentos | PagSeguro ou Asaas (benchmark pendente) | A definir |
| E-mail | Resend (3.000/mês grátis) | Grátis |
| QR Code | qrcode.js (client-side) | Grátis |

**Custo real do MVP:** praticamente zero. Único gasto inicial: domínio.
**Dev:** Rafael + Claude (AI) como par de desenvolvimento. Rafael estudando a arquitetura certa antes de escrever código.

---

## Features do MVP

### Módulo Superadmin
- Gestão de organizadores (criar, suspender, configurar tiers)
- Dashboard financeiro consolidado (volume, spread retido, repasses)
- Visão de todos os eventos ativos

### Módulo Admin (painel do organizador)
- Criação e edição de eventos (título, data, local, capacidade, imagem)
- Formulário de inscrição customizável por evento
- Gestão de participantes (lista, check-in, exportar CSV)
- Dashboard por evento (inscrições tempo real, conversão, receita)
- Recuperação de carrinho (e-mail automático para inscrições abandonadas)
- Reativação de base (e-mail automático para inscritos da edição anterior)
- Marketplace de produtos do evento (checkout integrado)
- Relatório financeiro (bruto, taxa, líquido, repasses)

### Módulo Portal (página pública)
- Página do evento com marca do organizador
- Inscrição gratuita ou paga (formulário + checkout)
- Confirmação com QR Code por e-mail
- Vitrine de eventos do organizador
- Transferência de titularidade (mercado secundário)
- Mobile-first

---

## Dados de Mercado — Endurance Brasil

### Corridas de Rua
- **13–14 milhões de corredores** ativos; ~3 milhões participam de provas pagas
- **2.827 provas homologadas em 2024** → **5.241 em 2025 (+85%)**
- Mercado movimenta **R$ 1,1 bilhão/ano**
- Ticket médio Ticket Sports: **R$ 112,45/inscrição**
- **46% dos inscritos em 2025 eram primeira vez** — mercado crescendo pela base
- Sudeste: 51% dos participantes; **Nordeste: 9% → 22,3%** em 1 ano

### Triathlon ← nicho de entrada prioritário
- **25.000+ praticantes**, 206 eventos em 2024, **56 organizadores distintos**
- Ticket médio: **R$ 250–500** (2–4x corrida de rua)
- Crescimento de **62,4% em menos de 3 anos**
- 56 organizadores no Brasil inteiro = dá para mapear e falar com todos

### Ciclismo
- 176 eventos em 2024, ticket médio: **R$ 226,81**

### TAM
- GMV total endurance: **R$ 200–300 milhões/ano**
- Take rate referência 10%: **R$ 20–30 milhões/ano de receita para as plataformas**

### Ticket Sports (incumbente)
| Métrica | Dado |
|---|---|
| GMV 2024 | R$ 300 milhões (+75% vs 2023) |
| Receita 2024 | R$ 20 milhões |
| Take rate | ~10% |
| Inscrições 2024 | 1,8 milhão |
| Eventos | 2.500 |
| Market share maratonas | 60% das 54 maiores do Brasil |
| **Adquirida por Ingresse** | **Set/2024 — janela de 12–18 meses aberta agora** |

---

## Benchmark de Concorrentes

| Plataforma | Taxa | White Label | Repasse | Nicho |
|---|---|---|---|---|
| Ticket Sports/Ingresse | ~10% | Não | Pós-evento | Endurance |
| Sympla | ~10% + 3,49% antecip. | Não | 3+ dias úteis | Geral |
| Eventbrite | ~17,99% efetivo | Não | 14+ dias | Geral (saindo do BR) |
| E-inscrição | 6,9% (mín. R$1,90) | Não | N/I | Cristão |

---

## Próximos Passos (pós-reunião 21/Mai)

### Rafael (produto + tech)
- [ ] Definir arquitetura técnica correta antes de codar (backend, banco, auth)
- [ ] Começar construção do MVP (Rafael + Claude como par de dev)
- [ ] Mapear capacidade simultânea do MVP (quantos clientes/eventos suporta sem upgrade de infra)
- [ ] Definir nome da plataforma → briefar Aline para logo/design system

### Cássio (negócio + estratégia)
- [ ] Desenhar planejamento estratégico (visão 12 meses, 24 meses)
- [ ] Mapear primeiros 30 organizadores endurance para prospectar
- [ ] Iniciar conversas de validação (meta: 15 conversas nas próximas 4–6 semanas)
- [ ] Benchmark técnico de taxas: confirmar o que Ticket Sports cobra no cartão vs pix vs boleto

### Ambos
- [ ] Definir critérios de "red flag" para cada etapa (o que nos faria pausar ou pivotar)
- [ ] Próxima reunião: ~início de junho 2026

---

## Decisões Pendentes (TBD)

- [x] **Nome da plataforma** — **Ticket Moove** ✅ (definido em 24/Mai/2026)
- [ ] **Gateway de pagamento** — PagSeguro ou Asaas? Benchmark pendente
- [ ] **Política de boleto** — manter, remover ou substituir por Pix parcelado?
- [ ] **Notificações** — WhatsApp, e-mail ou SMS para lembretes de evento?
- [ ] **Critérios de red flag** — o que define pausa/pivot em cada marco (3, 6, 12 meses)?
- [ ] **LGPD** — parecer jurídico antes do lançamento público

---

## Histórico de Decisões

| Data | Decisão | Justificativa |
|---|---|---|
| Mai 2026 | Supabase como backend | PostgreSQL + Auth + Storage + Edge Functions num lugar, grátis até escalar |
| Mai 2026 | Cloudflare Pages como deploy | SSL wildcard automático necessário para subdomínios dos tenants |
| Mai 2026 | Stripe descartado | Sem boleto nativo; entra só em expansão internacional |
| Mai 2026 | PayPal descartado | Sem Pix |
| Mai 2026 | Nicho endurance confirmado | Ciclo de venda corporativo muito longo para bootstrap; esportivo: 2–3 decisores, decisão mais rápida |
| 21/Mai/2026 | White label = tier premium, não entrada | No endurance o atleta compra pelo nome do evento, não da plataforma; entrada pelo preço e atendimento |
| 21/Mai/2026 | Modelo de tiers de taxa confirmado | ~7% básico / ~10–12% parceiro / ~15% premium — sem mensalidade |
| 21/Mai/2026 | Validar e construir em paralelo | Não esperar validação total; primeiros clientes validam a plataforma, não necessariamente geram receita |
| 21/Mai/2026 | Marketplace de produtos no MVP | Alta aderência no endurance; segunda fonte de receita no mesmo checkout |
| 21/Mai/2026 | Transferência de titularidade no roadmap | Mercado secundário autorizado gera segunda taxa no mesmo ingresso |
| 24/Mai/2026 | Nome da plataforma: **Ticket Moove** | Reflete o mercado esportivo (movimento, endurance) e contém "Ticket" como referência ao produto |

---

## Como Trabalhar Neste Repo

```bash
# Branch de desenvolvimento ativo
git checkout claude/review-partner-document-cYrOx

# Documentos de referência:
# index.html          — escopo MVP v0 (Rafael)
# reuniao-210526.html — briefing de reunião com dados de mercado
# CLAUDE.md           — este arquivo, sempre atualizado
```
