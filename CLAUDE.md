# Plataforma de Eventos White Label — CLAUDE.md

> Documento de referência para desenvolvimento assistido por IA. Atualizar sempre que houver decisões relevantes.

---

## Visão Geral do Projeto

Plataforma SaaS multi-tenant para gestão de eventos com **white label completo** — o participante vê apenas a marca do organizador, nunca a marca da plataforma. Produto voltado ao mercado brasileiro, com foco inicial em eventos corporativos e científicos.

**Status atual:** Fase de planejamento/escopo. Nenhum código escrito ainda.
**Documento base:** `index.html` (Escopo MVP v0 — Mai 2026)
**Branch ativo:** `claude/review-partner-document-cYrOx`

---

## O Problema que o Produto Resolve

Três lacunas claras identificadas no mercado:

1. **Sem white label de verdade** — nenhum concorrente permite que o organizador use sua própria marca
2. **Dashboards ruins** — painéis limitados, lentos, sem informação acionável
3. **Abandono de carrinho ignorado** — eventos perdem receita por não recuperar inscrições abandonadas

---

## Arquitetura do Produto

Três camadas independentes, mesmo backend multi-tenant. Cada organizador tem espaço isolado (RLS por tenant no Supabase).

| Camada | Descrição | URL |
|--------|-----------|-----|
| Landing | Site institucional da plataforma | `plataforma.com.br` |
| Admin | Painel do organizador | `app.plataforma.com.br` |
| Portal | Página pública white label | `{slug}.plataforma.com.br` |
| Futuro | Domínio próprio do cliente (pós-MVP) | `eventos.cliente.com` |

---

## Stack Técnica

| Camada | Tecnologia | Custo MVP |
|--------|------------|-----------|
| Frontend | React + Vite | Grátis |
| Deploy | Cloudflare Pages (SSL wildcard, CDN global) | Grátis |
| Banco / Auth | Supabase (PostgreSQL + Auth + Storage + Edge Functions) | Grátis até 500 MB |
| Pagamentos | **A definir** (ver seção abaixo) | A definir |
| E-mail | Resend (3.000/mês grátis) | Grátis |
| QR Code | qrcode.js (client-side) | Grátis |

---

## Gateway de Pagamento (Decisão Pendente)

### Candidatos principais
- **PagSeguro** — validado por concorrentes diretos, alta conversão no BR, Pix + boleto + split marketplace, ~3,99% no cartão
- **Asaas** — fintech BR focada em SaaS, split nativo, API em PT bem documentada, ~2,99% no cartão

### Fallback técnico
- **Mercado Pago** — Pix nativo, split disponível, suporte ao dev limitado

### Descartados
- PayPal (sem Pix), Appmax (foco em afiliados), Stripe (sem boleto nativo — entra só em expansão internacional)

**Status:** Definição aguardando benchmark técnico com concorrentes.

---

## Features do MVP

### Módulo Superadmin (acesso exclusivo dos fundadores)
- Gestão de organizadores (criar, suspender, configurar planos)
- Dashboard financeiro consolidado (volume, spread retido, repasses)
- Visão de todos os eventos ativos (status, inscrições, receita)
- Configuração de planos e taxas

### Módulo Admin (painel do organizador)
- Configuração de marca white label (logo, cores, slug, domínio)
- Criação e edição de eventos (título, data, local, capacidade, imagem)
- Formulário de inscrição customizável (campos configuráveis por evento)
- Gestão de participantes (lista, check-in, exportar CSV)
- Dashboard por evento (inscrições em tempo real, conversão, receita)
- Recuperação de carrinho (e-mail automático para inscrições abandonadas)
- Relatório financeiro (bruto, taxa da plataforma, líquido)

### Módulo Portal (página pública — zero rastro da plataforma)
- Página do evento com marca do organizador (info, agenda, palestrantes, local)
- Inscrição gratuita ou paga (formulário + checkout integrado)
- Confirmação com QR Code por e-mail (envio automático pós-inscrição)
- Vitrine de eventos do organizador (todos os eventos ativos em uma página)
- Mobile-first e carregamento rápido

---

## Roadmap MVP (8–10 semanas)

| Semana | Entrega |
|--------|---------|
| 1–2 | Base multi-tenant + autenticação (RLS no Supabase, auth de organizadores, subdomínio via Cloudflare) |
| 3–4 | CRUD de eventos + portal público (admin básico, página branded, inscrição gratuita) |
| 5–6 | Checkout e pagamentos (integração gateway, split automático, QR code no e-mail) |
| 7–8 | White label completo (upload de logo, picker de cor, preview em tempo real) |
| 9–10 | Dashboard + superadmin + polimento (métricas tempo real, recuperação de carrinho, testes com primeiro cliente) |

---

## Benchmark de Concorrentes

| Plataforma | Nota RA | Taxa | White Label | Repasse | Nicho |
|------------|---------|------|-------------|---------|-------|
| Sympla | 8.5/10 (1.700 recl.) | ~10% + 3,49% antecip. | Não | 3+ dias úteis | Geral |
| Eventbrite | Não recomendada (0% respondidas) | ~17,99% efetivo | Não | 14+ dias | Geral |
| Even3 | 8.6/10 (68 recl.) | Não divulgada | Não | Não informado | Acadêmico |
| E-inscrição | 7.91/10 (20 recl.) | 6,9% (mín. R$1,90) | Não | Não informado | Cristão |
| Ticket Gospel | Sem nota (3 recl.) | Não divulgada | Não | Não informado | Evangélico |
| Tiketo | Sem dados | Grátis p/ gratuitos | Não | Não informado | Geral |

### Dores recorrentes identificadas
1. **Repasse lento** — Sympla retém dinheiro pós-evento e cobra 3,49% para antecipar
2. **Taxas opacas** — Eventbrite anuncia uma taxa e cobra 17,99% efetivo
3. **Suporte péssimo** — Eventbrite 0% respondidas no RA; E-inscrição responde em 40 dias
4. **Zero white label** — nenhum concorrente oferece identidade visual própria
5. **E-inscrição domina nicho cristão** — mas sem white label, suporte lento, sem recuperação de carrinho
6. **Eventbrite abandona o BR** — ativamente saindo do mercado, usuários buscando alternativa

---

## Decisões Pendentes (TBD)

### Técnicas / Produto
- [ ] **Gateway de pagamento** — Asaas ou PagSeguro? Benchmark em andamento
- [ ] **Domínio próprio por cliente** — MVP usa subdomínio; CNAME customizado pós-validação
- [ ] **Certificado de participação** — baixo custo, alto valor (esp. eventos científicos) — MVP ou backlog?
- [ ] **Notificações** — e-mail, WhatsApp ou SMS; quem paga o custo por disparo?
- [ ] **Métricas de produto** — Posthog ou Mixpanel?

### Negócio / Comercial (a validar com o sócio — Cássio)
- [ ] **Billing do organizador** — só spread, mensalidade fixa, ou híbrido?
- [ ] **Limites por plano** — cota de eventos, participantes, armazenamento
- [ ] **Cancelamento e reembolso** — quem absorve a taxa do gateway? qual prazo?
- [ ] **Onboarding** — self-service ou conversa comercial primeiro?
- [ ] **LGPD** — parecer jurídico necessário antes do lançamento
- [ ] **Nicho de entrada** — corporativos e científicos identificados; estratégia de aquisição do primeiro cliente
- [ ] **Nome da plataforma** — não definido ainda
- [ ] **Go-to-market** — self-service + inbound como direção inicial; playbook a construir

---

## Ideias de Nome

### Favoritos (semântica forte)
- **Ágora** — praça pública grega, lugar de encontro, peso cultural
- **Palco** — direto, aspiracional para o organizador
- **Lota** — de lotação/sold out, aspiracional

### Tech / Internacional
- **Venuu** — Venue + "u" (você)
- **Evolo** — Evolve + evento
- **Gathero** — "to gather", reunir
- **Eventix** — evento + sufixo tech -ix

### Raízes latinas
- **Présens** — latim praesens (presente, ao vivo)
- **Ovação** — Ovation, o sentimento do evento bem-sucedido
- **Reuna** — de reunir

---

## Modelo de Negócio (Em Definição)

O modelo de monetização ainda não está definido. Candidatos:

1. **Só spread** — plataforma retém % de cada ingresso vendido (mais simples, alinha incentivos)
2. **Mensalidade fixa** — assinatura mensal por plano (previsibilidade de receita)
3. **Híbrido** — mensalidade + spread reduzido (modelo de mercado mais comum em SaaS de pagamentos)

---

## Contexto da Reunião (Mai 2026)

- Sócios: Rafael Alexander (tech/produto) + Cássio Silva Miranda (estratégia/comercial)
- Reunião de alinhamento em andamento — 21 Mai 2026
- Cássio enviou documento v0.1 "Projeto SaaS — Concepção" com visão diferente do escopo original

---

## Documento do Cássio — Síntese (v0.1, 21 Mai 2026)

**Tese central:** Plataforma de inscrição para eventos **endurance** (corrida, triathlon, ciclismo) que diferencia por **captação de inscritos** — ajuda o organizador a encher o evento, não só processa inscrição.

**Diferenças em relação ao escopo original de Rafael:**

| Dimensão | Escopo Rafael | Documento Cássio |
|---|---|---|
| Nicho | Generalista (corporativo, científico, religioso) | Endurance específico |
| Diferencial | White label (técnico) | Captação de inscritos (serviço/produto) |
| Stage | Stack definida, roadmap 10 semanas | Validar antes de construir |
| Modelo receita | TBD (spread/mensalidade/híbrido) | Só % por inscrição, sem mensalidade |
| Concorrência | Sympla, Eventbrite (mercado geral) | Ticket Sports, Sympla (endurance) |
| White label | Diferencial central | Não mencionado |
| Capital | Não definido | R$ 1.000 bootstrap |
| Horizonte | 10 semanas para MVP | 3-6 meses de validação |

**Próximos passos propostos por Cássio:**
1. Alinhamento entre sócios (horas, papéis, equity, critérios de revisão)
2. Desenho do MVP em papel (3–5 telas críticas, regras de negócio)
3. Validação: 30 organizadores prospectados, 15 conversas, aprendizado consolidado
4. Decisão informada sobre desenvolvimento técnico ou pivot

---

## Dados de Mercado — Endurance Brasil (pesquisa Mai 2026)

### Corridas de Rua
- **13–14 milhões de corredores** ativos no Brasil; ~3 milhões participam de provas pagas
- **2.827 provas homologadas em 2024** → **5.241 em 2025 (+85%)**
- Mercado movimenta **R$ 1,1 bilhão/ano**
- Ticket médio plataforma líder: **R$ 112,45 por inscrição**
- 45% dos inscritos em 2025 eram **primeira vez num evento** (mercado em expansão de base)
- Sudeste: 51% dos participantes; **Nordeste cresceu de 9% para 22,3%** (fronteira de expansão)

### Triathlon
- **25.000+ praticantes**, 206 eventos em 2024, **56 organizadores distintos**
- Ticket médio: **R$ 250–500** (2–4x o ticket de corrida)
- Crescimento de **62,4% em menos de 3 anos**
- 60% dos triatletas no Sudeste; SP sozinho com 49,9%

### Ciclismo
- 176 eventos em 2024, ticket médio: **R$ 226,81**

### TAM — Mercado de Inscrições Endurance (Brasil)
- **GMV total: R$ 200–300 milhões/ano**
- Take rate de referência ~10% → **R$ 20–30 milhões de receita potencial total para as plataformas**

### Ticket Sports (incumbente dominante)
| Métrica | Dado |
|---|---|
| GMV 2024 | R$ 300 milhões (+75% vs 2023) |
| Receita 2024 | R$ 20 milhões |
| Take rate | ~10% |
| Inscrições 2024 | 1,8 milhão |
| Eventos | 2.500 |
| Market share maratonas | 60% das 54 maiores do Brasil |
| **Adquirida por Ingresse** | **Setembro 2024** — janela de oportunidade |

### Sympla (player horizontal)
- 336.000+ organizadores, 46 milhões de compradores
- 400.000+ eventos em 2023
- Taxa: até 12% ou mínimo R$ 3,99/ingresso

---

## Análise Estratégica e Provocações

### Janela de oportunidade: aquisição da Ticket Sports pela Ingresse (Set 2024)
Toda aquisição gera turbulência interna, reorganização e possível degradação de atendimento. A janela de 12–18 meses pós-aquisição é provavelmente a melhor oportunidade que existirá para um entrante no mercado endurance.

### Triathlon como nicho dentro do nicho
206 eventos, 56 organizadores, ticket 3x maior. Pequeno o suficiente para validar rápido, grande o suficiente para sustentar negócio. Muito menos competição que o mercado geral de corridas.

### Nordeste como flanqueamento geográfico
Ticket Sports concentrada no Sudeste. Nordeste cresceu de 9% para 22,3% em 1 ano. Organizadores nordestinos têm menos voz, menos opções, maior disposição a ouvir novos players.

### "Captação" precisa ser definida antes da primeira conversa
Três interpretações completamente diferentes:
1. **Consultoria de marketing** — não escala, mas valida rápido
2. **Ferramenta de reativação de base** — feature de produto, demora para construir
3. **Tráfego próprio da plataforma** — leva anos, inviável em bootstrap

### 46% dos inscritos são atletas de primeira vez
Valida a hipótese de captação do Cássio: o organizador realmente precisa de ajuda para encher eventos com novos participantes. A dor é real e atual.

### White label e captação não se excluem
O documento do Cássio não menciona white label — mas nenhum concorrente no endurance oferece isso. Pode ser diferencial invisível (organizadores não percebem que querem) ou irrelevante para esse nicho (atleta vai ao evento pelo nome da prova, não pela plataforma).

---

## Decisões Que Bloqueiam Tudo (a resolver na reunião de hoje)

- [ ] **Nicho ou generalista?** Endurance específico vs. white label para qualquer evento
- [ ] **Diferencial técnico ou de serviço?** White label (semanas para construir) vs. captação (consultoria ou produto?)
- [ ] **Validar antes ou construir em paralelo?** Cássio está metodologicamente certo, mas validação pura mata side projects por inércia
- [ ] **Escopo geográfico inicial** — nacional desde o início ou concentração regional (Nordeste? SP?)
- [ ] **Acordo formal entre sócios** — horas, papéis, equity, critérios de revisão aos 3 e 6 meses

---

## Histórico de Decisões

| Data | Decisão | Justificativa |
|------|---------|---------------|
| Mai 2026 | Supabase como backend | PostgreSQL + Auth + Storage + Edge Functions em um lugar, grátis até escalar |
| Mai 2026 | Cloudflare Pages como deploy | SSL wildcard automático necessário para subdomínios dos tenants |
| Mai 2026 | Stripe descartado para MVP | Sem boleto nativo; entra só em expansão internacional |
| Mai 2026 | PayPal descartado | Sem Pix |
| Mai 2026 | Appmax descartado | Foco em afiliados, não em eventos |

---

## Como Trabalhar Neste Repo

```bash
# Branch de desenvolvimento ativo
git checkout claude/review-partner-document-cYrOx

# O escopo completo do MVP está em:
# index.html — documento HTML navegável com toda a especificação
```

**Antes de iniciar desenvolvimento:** As decisões pendentes na seção TBD precisam ser respondidas pelo sócio (especialmente billing model, gateway de pagamento e nicho de entrada).
