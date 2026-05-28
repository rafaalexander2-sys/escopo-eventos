# TicketMoove — Correções da demo de produto

Documento de referência das correções aplicadas no protótipo **`ticketmoove-demo.html`**
(demo navegável de telas, HTML único, sem dependências além de Google Fonts).

> ⚠️ **Importante:** o `index.html` deste repositório é o **documento de escopo/pitch**
> (outro entregável). A demo do app vive em `ticketmoove-demo.html` — os dois não se misturam.

Data: 2026-05-28 · Branch: `claude/happy-archimedes-Ytl6N`

---

## Resumo dos pontos corrigidos

| # | Tela | Problema | Correção |
|---|------|----------|----------|
| 1 | Onboarding | Passo 2 (Dados Bancários) não aparecia — o botão "Próximo" pulava direto pro dashboard | Adicionado o Passo 2 completo com navegação entre passos |
| 2 | Dashboard | Faltavam dados, "Ações rápidas" e "Ocupação geral" | Replicado conforme prints 2 e 3 |
| 3 | Eventos | Colunas/dados divergentes, sem filtros e busca | Replicado conforme print 4 |
| 4 | Financeiro | Faltava o gráfico "Inscrições ao longo do tempo" | Gráfico adicionado + cards corrigidos (print 5) |
| 5 | Dashboard (extra) | Só números, pouco visual | Adicionados gráficos de receita e inscrições |

---

## 1. Onboarding — Passo 2 (Dados Bancários)

**Antes:** só existia o Passo 1 ("Dados da Organização"); o botão "Próximo"
chamava `showScreen('dashboard')`, então o Passo 2 nunca era exibido.

**Depois:**
- Dois painéis dentro da mesma tela: `#ob-step-1` (organização) e `#ob-step-2` (bancários).
- Botão "Próximo" → `onboardingStep(2)`; botão "Voltar" → `onboardingStep(1)`;
  "Finalizar configuração" → `showScreen('dashboard')`.
- O indicador de passos (stepper) atualiza: passo 1 vira ✓ verde, conector verde, passo 2 ativo.
- Passo 2 contém: callout de repasses (5 dias úteis), select de **Banco**, campos **Agência** e **Conta**.
- Ao reabrir o onboarding, `showScreen('onboarding')` reseta para o Passo 1.

## 2. Dashboard (prints 2 e 3)

- **4 métricas:** Total de eventos (12, +3 este mês), Inscrições totais (1.847, +124 esta semana),
  Receita do mês (R$ 38.450, +18%), Inscrições hoje (47, ao vivo).
- **Próximos eventos:** Corrida das Pedras 2026 (HOJE, 387/500, Confirmado, 23 ago),
  Triathlon Floripa (200/200, Encerrado, 12 out), Pedal do Vento (42/300, Rascunho, 05 nov),
  Maratona do Sol (98/400, Confirmado, 15 dez).
- **Ações rápidas:** Criar novo evento, Ver participantes, Relatório financeiro, Check-in do evento.
- **Ocupação geral:** Corrida das Pedras 77% (lime), Triathlon Floripa 100% (vermelho), Pedal do Vento 14% (lime).

## 3. Eventos (print 4)

- Cabeçalho "EVENTOS" + "5 eventos cadastrados" + botão "Novo evento".
- **Abas de filtro funcionais:** Todos / Publicado / Rascunho / Encerrado / Cancelado (`filterEvents`).
- **Busca por nome** (`searchEvents`).
- **Colunas:** Evento · Data · Cidade · Vagas · Inscrições (nº + barra de progresso) · Status.
- 5 linhas conforme o print (Corrida das Pedras, Triathlon Floripa, Pedal do Vento, Maratona do Sol, Ultra Serra Gaúcha).

## 4. Financeiro (print 5)

- Cabeçalho "FINANCEIRO" + "Relatório de receita e repasses" + seletor "Todos os eventos" + "Exportar extrato".
- **4 cards:** Receita bruta (R$ 57.338, +18% vs maio), Taxa plataforma (R$ 1.148, 2% do bruto),
  Valor líquido (R$ 56.190), A receber (R$ 56.190, Após o evento).
- **Gráfico "Inscrições ao longo do tempo"** com toggle **7d / 30d / 3m** (30d padrão);
  barras crescentes com as últimas destacadas em lime; eixo X com datas.
- Tabela "Receita por evento" mantida abaixo do gráfico.

## 5. Gráficos no Dashboard principal (pedido extra)

- "Receita — últimos 30 dias" (barras) e "Inscrições por semana" (barras), além da "Ocupação geral".

---

## Detalhes técnicos

- **Gráficos:** CSS puro (divs com altura %), renderizados por `renderBars(containerId, valores, opts)`.
  Sem bibliotecas externas — coerente com o resto da demo.
- **Funções JS adicionadas:** `onboardingStep`, `filterEvents`, `searchEvents`, `finRange`,
  `renderBars`, `renderDashboardCharts`. Os gráficos são renderizados sob demanda em `showScreen`.
- **Ícones novos** (Lucide inline): `info`, `activity`, `hash`.
- **Classes CSS novas:** `.ev-tab`, `.fin-range`, `.chart-bar`.

## Como visualizar

Abra `ticketmoove-demo.html` no navegador e use a barra de navegação do topo
(ou o mapa "Jornada") para percorrer as telas: Onboarding → Dashboard → Eventos → Financeiro.
