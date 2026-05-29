# TicketMoove — Handoff completo (correções da demo)

> **Propósito deste arquivo:** registro completo do trabalho para que tudo sobreviva mesmo
> sem este chat. Contém o contexto, o que foi corrigido, os dados de cada tela e como retomar
> em uma nova conversa. **Tudo que importa está commitado no repositório.**

- **Repositório:** `rafaalexander2-sys/escopo-eventos`
- **Branch de trabalho:** `claude/happy-archimedes-Ytl6N`
- **Data:** 2026-05-28/29

---

## 0. Contexto rápido (para uma nova sessão)

Este repositório tem **dois arquivos HTML independentes**:

| Arquivo | O que é |
|---------|---------|
| `index.html` | Documento de **escopo/pitch** ("Plataforma de Eventos — White Label"). Fundo branco, estilo Apple. **NÃO mexer ao falar do app.** |
| `ticketmoove-demo.html` | **Demo navegável do app TicketMoove** (tema escuro, verde-limão). É aqui que ficam as telas: onboarding, dashboard, eventos, financeiro, etc. |

A demo é um **HTML único**, sem build e sem bibliotecas externas (só Google Fonts).
Ícones são SVG Lucide inline (objeto `ICONS` no `<script>`). Gráficos são **CSS puro**.
Navegação entre telas via `showScreen('id')`. A barra do topo e o mapa "Jornada" listam todas as telas.

> Por que houve um "reinício": a conversa original travou com o erro
> `400 ... thinking blocks in the latest assistant message cannot be modified`
> (limitação da API com extended thinking + histórico). Por isso o trabalho migrou para cá.

---

## 1. Telas corrigidas (5 pontos pedidos)

| # | Tela | Problema | Correção |
|---|------|----------|----------|
| 1 | Onboarding | Passo 2 (Dados Bancários) não aparecia — "Próximo" ia direto ao dashboard | Passo 2 criado, com navegação entre passos |
| 2 | Dashboard | Faltavam dados, "Ações rápidas" e "Ocupação geral" | Replicado conforme prints |
| 3 | Eventos | Colunas/dados divergentes, sem filtros nem busca | Replicado, com filtros e busca funcionais |
| 4 | Financeiro | Faltava o gráfico "Inscrições ao longo do tempo" | Gráfico (7d/30d/3m) + cards corrigidos |
| 5 | Dashboard (extra) | Só números, pouco visual | Gráficos de receita e inscrições adicionados |

---

## 2. Dados exatos de cada tela (referência para reconstruir)

### Onboarding (`#screen-onboarding`)
- **Passo 1 — Dados da Organização:** Nome (Race83 Eventos), Slug (race83 → ticketmoove.com.br/race83), CNPJ. Botão "Próximo" → `onboardingStep(2)`.
- **Passo 2 — Dados Bancários** (`#ob-step-2`): "Passo 2 de 2 · Para receber os repasses das inscrições".
  - Callout lime: "Os repasses são feitos em até **5 dias úteis** após o evento."
  - Select **Banco** (BB, Caixa, Bradesco, Itaú, Santander, Nubank, Inter, C6), **Agência** (0001), **Conta** (12345-6).
  - Botões: **Voltar** → `onboardingStep(1)` · **Finalizar configuração** → `showScreen('dashboard')`.
  - Stepper: ao ir pro passo 2, o "1" vira ✓ verde e o conector fica verde.

### Dashboard (`#screen-dashboard`)
- **Métricas (4):** Total de eventos **12** (+3 este mês) · Inscrições totais **1.847** (+124 esta semana) · Receita do mês **R$ 38.450** (+18%) · Inscrições hoje **47** (ao vivo, vermelho).
- **Gráficos:** "Receita — últimos 30 dias" (barras) e "Inscrições por semana" (4 barras).
- **Próximos eventos:**
  - Corrida das Pedras 2026 · badge **HOJE** · 387/500 · Confirmado · 23 ago
  - Triathlon Floripa · 200/200 · Encerrado · 12 out
  - Pedal do Vento · 42/300 · Rascunho · 05 nov
  - Maratona do Sol · 98/400 · Confirmado · 15 dez
- **Ações rápidas:** Criar novo evento · Ver participantes · Relatório financeiro · Check-in do evento.
- **Ocupação geral:** Corrida das Pedras **77%** (lime) · Triathlon Floripa **100%** (vermelho) · Pedal do Vento **14%** (lime).

### Eventos (`#screen-events-list`)
- Cabeçalho: "EVENTOS" + "5 eventos cadastrados" + botão "Novo evento".
- **Abas (funcionais):** Todos · Publicado · Rascunho · Encerrado · Cancelado (`filterEvents`).
- **Busca por nome** (`searchEvents`).
- **Colunas:** Evento · Data · Cidade · Vagas · Inscrições (nº + barra) · Status.

| Evento | Data | Cidade | Vagas | Inscrições | Status |
|--------|------|--------|-------|-----------|--------|
| Corrida das Pedras 2026 | 23/08/2026 | São Paulo, SP | 500 | 387 (77%) | Confirmado |
| Triathlon Floripa | 12/10/2026 | Florianópolis, SC | 200 | 200 (100%) | Encerrado |
| Pedal do Vento | 05/11/2026 | Curitiba, PR | 300 | 42 (14%) | Rascunho |
| Maratona do Sol | 15/12/2026 | Fortaleza, CE | 400 | 98 (24%) | Confirmado |
| Ultra Serra Gaúcha | 20/01/2027 | Gramado, RS | 150 | 0 (0%) | Rascunho |

### Financeiro (`#screen-financeiro`)
- Cabeçalho: "FINANCEIRO" + "Relatório de receita e repasses" + select "Todos os eventos" + "Exportar extrato".
- **Cards (4):** Receita bruta **R$ 57.338** (+18% vs maio) · Taxa plataforma **R$ 1.148** (2% do bruto) · Valor líquido **R$ 56.190** · A receber **R$ 56.190** (Após o evento).
- **Gráfico "Inscrições ao longo do tempo":** toggle **7d / 30d / 3m** (30d padrão), barras crescentes com as últimas em lime, eixo X com datas.
- Tabela "Receita por evento" mantida abaixo.

---

## 3. Detalhes técnicos das mudanças

- **Funções JS adicionadas** (no `<script>` final):
  - `onboardingStep(n)` — alterna Passo 1/2 e atualiza o stepper.
  - `filterEvents(status, btn)` / `searchEvents(term)` — filtro por status e busca na tabela de eventos.
  - `finRange(range, btn)` — troca o dataset do gráfico financeiro (7d/30d/3m).
  - `renderBars(containerId, values, opts)` — desenha barras (CSS puro). `opts.highlightFrom` define a partir de qual índice as barras ficam lime.
  - `renderDashboardCharts()` — renderiza os dois gráficos do dashboard.
  - `showScreen` agora chama: `onboardingStep(1)` ao abrir onboarding, `renderDashboardCharts()` no dashboard, `finRange('30d')` no financeiro.
- **Ícones novos:** `info`, `activity`, `hash` (no objeto `ICONS`).
- **CSS novo:** `.ev-tab`, `.fin-range`, `.chart-bar`.
- **Datasets do gráfico financeiro:** objeto `FIN_DATA` com `7d`, `30d`, `3m` (valores, índice de destaque `hl`, rótulos do eixo `axis`).

## 4. Validações feitas
- `node --check` no JS extraído → **sintaxe OK**.
- `<div>` balanceados (374/374), **sem IDs duplicados**.
- ⚠️ Ambiente sem navegador headless → não foi possível gerar screenshots. Conferir abrindo o arquivo.

---

## 5. Como retomar em uma nova conversa

1. Aponte para a branch **`claude/happy-archimedes-Ytl6N`** do repo `rafaalexander2-sys/escopo-eventos`.
2. O app está em **`ticketmoove-demo.html`**; o escopo em `index.html` (não confundir).
3. Para ver: abra `ticketmoove-demo.html` no navegador e navegue pela barra do topo.
4. Histórico do que foi feito: este arquivo + a mensagem de commit na branch.

### Pendências / próximos passos sugeridos
- [ ] Conferência visual contra os prints (ajustes finos de espaçamento/cores se necessário).
- [ ] Abrir Pull Request (ainda **não** foi aberto).
- [ ] (Opcional) Telas não citadas nos prints seguem com os dados originais da demo.
