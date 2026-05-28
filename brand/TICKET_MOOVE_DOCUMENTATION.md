# Ticket Moove - Documentação Completa do Sistema

**Plataforma SaaS para Registro de Eventos Esportivos de Endurance**

Data: 27 de maio de 2026  
Versão: 1.0.0

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Design System](#design-system)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Telas Implementadas](#telas-implementadas)
5. [Componentes](#componentes)
6. [Fluxos de Navegação](#fluxos-de-navegação)
7. [Como Executar](#como-executar)

---

## 🎯 Visão Geral

**Ticket Moove** é uma plataforma completa para gestão de eventos esportivos de endurance, oferecendo duas jornadas principais:

- **Atleta**: Inscrição, check-in, tracking de performance
- **Organizador**: Criação de eventos, gestão de participantes, dashboard financeiro

### Características Principais

- Interface dark neon com estética esportiva moderna
- 11 telas navegáveis e funcionais
- Sistema de design completo e documentado
- Mais de 30 componentes UI reutilizáveis
- Responsivo e otimizado para mobile

---

## 🎨 Design System

### Paleta de Cores

#### Cores Principais
- **Primary (Lima Elétrico)**: `#CCFF00` - Cor de destaque principal, usada em CTAs e elementos importantes
- **Accent (Azul Elétrico)**: `#039EFF` - Cor secundária para elementos de apoio e highlights

#### Fundos
- **Background Dark**: `#0A0A0A` - Fundo principal da aplicação
- **Background Elevated**: `#1A1A1A` - Cards, modais e elementos elevados
- **Background Muted**: `#2A2A2A` - Elementos secundários

#### Cores Funcionais
- **Success**: `#00FF88` - Verde neon para sucesso
- **Warning**: `#FFD700` - Dourado para avisos
- **Error**: `#FF3366` - Rosa neon para erros
- **Info**: `#00D4FF` - Ciano para informações

#### Escala de Grays
- `gray-50`: `#FAFAFA`
- `gray-100`: `#F5F5F5`
- `gray-200`: `#E5E5E5`
- `gray-300`: `#D4D4D4`
- `gray-400`: `#A3A3A3`
- `gray-500`: `#737373`
- `gray-600`: `#525252`
- `gray-700`: `#404040`
- `gray-800`: `#262626`
- `gray-900`: `#171717`

### Tipografia

#### Famílias de Fonte

**Display/Headings - Barlow Condensed**
- Uso: Títulos, headers, números grandes
- Peso: 700 (Bold)
- Estilo: Condensado, esportivo, impactante

**Interface - Inter**
- Uso: Corpo de texto, labels, UI geral
- Pesos: 400 (Regular), 500 (Medium), 600 (Semibold)
- Estilo: Limpa, legível, moderna

**Monospace - JetBrains Mono**
- Uso: Dados técnicos, códigos, métricas
- Peso: 400 (Regular)
- Estilo: Monospace, técnica

#### Escala de Tamanhos

```css
/* Display */
--font-size-display-xl: 72px;
--font-size-display-lg: 60px;
--font-size-display-md: 48px;
--font-size-display-sm: 36px;

/* Headings */
--font-size-h1: 32px;
--font-size-h2: 24px;
--font-size-h3: 20px;
--font-size-h4: 18px;

/* Body */
--font-size-base: 16px;
--font-size-sm: 14px;
--font-size-xs: 12px;
```

### Espaçamento

Sistema baseado em múltiplos de 4px:

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

### Bordas e Sombras

```css
/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);
--shadow-neon-primary: 0 0 20px rgba(204, 255, 0, 0.3);
--shadow-neon-accent: 0 0 20px rgba(3, 158, 255, 0.3);
```

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Arquivos

```
/src
├── app/
│   ├── App.tsx              # Componente principal com navegação
│   └── components/          # Componentes reutilizáveis
│       ├── figma/
│       │   └── ImageWithFallback.tsx
│       └── [outros componentes]
├── styles/
│   ├── theme.css           # Design tokens e variáveis CSS
│   ├── fonts.css           # Importações de fontes
│   └── index.css           # Estilos globais
└── imports/                # Assets importados
```

### Tecnologias Utilizadas

- **React 18**: Framework principal
- **TypeScript**: Tipagem estática
- **Tailwind CSS v4**: Framework de utilitários CSS
- **Lucide React**: Biblioteca de ícones
- **Vite**: Build tool e dev server
- **pnpm**: Gerenciador de pacotes

---

## 📱 Telas Implementadas

### 1. Login / Autenticação

**Arquivo**: `src/app/App.tsx` (Screen: `login`)

**Funcionalidades**:
- Formulário de login com email e senha
- Toggle entre modo atleta e organizador
- Link para registro de nova conta
- Validação de campos
- Animação de entrada suave

**Elementos Visuais**:
- Logo Ticket Moove com gradiente neon
- Background dark com grid pattern sutil
- Botões com efeito neon hover
- Cards elevados com blur backdrop

**Navegação**:
- Login como Atleta → Dashboard Atleta
- Login como Organizador → Dashboard Organizador
- Criar conta → Registro

---

### 2. Registro / Sign Up

**Arquivo**: `src/app/App.tsx` (Screen: `register`)

**Funcionalidades**:
- Formulário completo de registro
- Campos: Nome, Email, Senha, Confirmar Senha
- Seleção de tipo de usuário (Atleta/Organizador)
- Validação em tempo real
- Termos e condições

**Elementos Visuais**:
- Layout similar ao login para consistência
- Ícones para cada campo de formulário
- Feedback visual de validação
- Botão CTA com gradiente neon

**Navegação**:
- Registro bem-sucedido → Onboarding
- Já tem conta → Login

---

### 3. Onboarding Atleta

**Arquivo**: `src/app/App.tsx` (Screen: `onboarding-athlete`)

**Funcionalidades**:
- 3 slides de apresentação:
  1. **Descubra Eventos**: Explore corridas e competições
  2. **Check-in Rápido**: QR code e confirmação instantânea
  3. **Acompanhe Performance**: Stats e histórico
- Navegação entre slides
- Indicadores de progresso
- Opção "Pular" e "Começar"

**Elementos Visuais**:
- Ilustrações com ícones grandes (96px)
- Texto em Barlow Condensed para títulos
- Botões de navegação com estados hover
- Dots de progresso interativos

**Navegação**:
- Pular → Dashboard Atleta
- Finalizar → Dashboard Atleta

---

### 4. Onboarding Organizador

**Arquivo**: `src/app/App.tsx` (Screen: `onboarding-organizer`)

**Funcionalidades**:
- 3 slides de apresentação:
  1. **Crie Eventos**: Configuração completa e rápida
  2. **Gerencie Inscrições**: Dashboard em tempo real
  3. **Análises Detalhadas**: Métricas e relatórios
- Mesma navegação do onboarding atleta
- Conteúdo específico para organizadores

**Elementos Visuais**:
- Paleta de ícones focada em gestão
- Layout consistente com onboarding atleta
- Cores accent para diferenciação

**Navegação**:
- Pular → Dashboard Organizador
- Finalizar → Dashboard Organizador

---

### 5. Dashboard Atleta

**Arquivo**: `src/app/App.tsx` (Screen: `athlete-dashboard`)

**Funcionalidades**:

**Header**:
- Logo e navegação
- Busca de eventos
- Notificações e perfil do usuário

**Estatísticas Principais** (4 cards):
- Total de Corridas: 12 (+2 este mês)
- Eventos Futuros: 3
- Total de KMs: 487 km
- Melhor Tempo: 3h 42min

**Eventos em Destaque** (3 cards):
1. **Ultra Trail São Paulo 2026**
   - 85km • 15 Jun 2026
   - Status: Inscrito
   - Vagas: 234/500
   - Badge: Ultras

2. **Maratona do Rio**
   - 42km • 22 Jun 2026
   - Status: Lista de Espera
   - Vagas: 1200/1200
   - Badge: Road

3. **Desafio das Montanhas**
   - 63km • 05 Jul 2026
   - Status: Confirmado
   - Vagas: 89/150
   - Badge: Trail

**Próximos Check-ins**:
- Lista de eventos com datas e locais
- Botões de ação rápida

**Elementos Visuais**:
- Cards com background elevated
- Badges coloridos por categoria
- Ícones lucide-react
- Gradientes sutis em headers

**Navegação**:
- Ver detalhes do evento
- Fazer check-in
- Explorar mais eventos

---

### 6. Dashboard Organizador

**Arquivo**: `src/app/App.tsx` (Screen: `organizer-dashboard`)

**Funcionalidades**:

**Métricas Principais** (4 cards):
- Eventos Ativos: 5
- Total de Inscritos: 1,234
- Receita Total: R$ 45.670,00 (+12% este mês)
- Taxa de Ocupação: 87%

**Eventos Ativos** (3 cards):
1. **Ultra Trail São Paulo 2026**
   - 234 inscritos de 500 vagas
   - R$ 23.400,00 em vendas
   - Check-ins: 0/234
   - Progresso visual de ocupação

2. **Maratona Corporativa Tech**
   - 450 inscritos de 600 vagas
   - R$ 13.500,00 em vendas
   - Check-ins: 0/450

3. **Trail Running Experience**
   - 180 inscritos de 200 vagas
   - R$ 8.770,00 em vendas
   - Check-ins: 0/180

**Ações Rápidas**:
- Criar Novo Evento
- Gerenciar Inscrições
- Ver Relatórios
- Configurações

**Elementos Visuais**:
- Layout espelhado ao dashboard atleta
- Cores accent para diferenciação
- Barras de progresso para ocupação
- Métricas financeiras em destaque

**Navegação**:
- Criar Evento → Formulário de Criação
- Ver Evento → Detalhes do Evento
- Gerenciar → Gestão de Participantes

---

### 7. Criação de Evento (Organizador)

**Arquivo**: `src/app/App.tsx` (Screen: `create-event`)

**Funcionalidades**:

**Formulário Completo**:
- **Informações Básicas**:
  - Nome do evento
  - Descrição completa
  - Data e hora
  - Local/Cidade

- **Detalhes Técnicos**:
  - Distância (km)
  - Categoria (Trail, Road, Ultra, Mountain)
  - Nível de dificuldade
  - Elevação acumulada (D+)

- **Inscrições**:
  - Limite de participantes
  - Valor da inscrição
  - Data de encerramento
  - Política de reembolso

- **Logística**:
  - Ponto de encontro
  - Horário de largada
  - Tempo limite
  - Itens obrigatórios

**Validação**:
- Campos obrigatórios marcados
- Validação de datas futuras
- Validação de valores numéricos
- Preview antes de publicar

**Elementos Visuais**:
- Formulário em duas colunas
- Inputs com ícones
- Selects customizados
- Botões de ação em destaque

**Navegação**:
- Salvar Rascunho
- Publicar Evento → Dashboard Organizador
- Cancelar → Dashboard Organizador

---

### 8. Detalhes do Evento (Atleta)

**Arquivo**: `src/app/App.tsx` (Screen: `event-details`)

**Funcionalidades**:

**Header do Evento**:
- Banner/imagem do evento
- Badge de categoria
- Nome e localização
- Botão de inscrição destacado

**Informações Principais**:
- Data e horário
- Distância e elevação
- Vagas disponíveis (234/500)
- Valor da inscrição
- Status da inscrição

**Detalhes Técnicos**:
- Descrição completa
- Percurso e mapa
- Regulamento
- Pontos de apoio
- Itens obrigatórios

**Organizador**:
- Nome e logo
- Rating e avaliações
- Eventos anteriores
- Contato

**Inscritos**:
- Lista de participantes
- Filtros por categoria
- Estatísticas de atletas

**Elementos Visuais**:
- Layout hero com imagem
- Tabs para navegação de conteúdo
- Cards informativos
- Call-to-action fixo no mobile

**Navegação**:
- Inscrever-se → Checkout
- Voltar → Dashboard
- Compartilhar evento

---

### 9. Check-in Mobile

**Arquivo**: `src/app/App.tsx` (Screen: `checkin`)

**Funcionalidades**:

**Scanner QR Code**:
- Área de captura de câmera
- Detecção automática de QR
- Feedback visual de sucesso/erro
- Modo manual para código

**Informações do Atleta**:
- Nome completo
- Número de peito
- Categoria
- Foto de perfil
- Status de check-in

**Validação**:
- Verificação de inscrição
- Confirmação de pagamento
- Checklist de itens obrigatórios
- Assinatura de termo

**Histórico**:
- Últimos check-ins realizados
- Timestamp de cada operação
- Status de cada atleta

**Elementos Visuais**:
- Interface otimizada para mobile
- Botões grandes para touch
- Feedback de sucesso com animação
- Estados de loading

**Navegação**:
- Confirmar Check-in → Sucesso
- Voltar → Dashboard
- Próximo Atleta

---

### 10. Lista de Participantes (Organizador)

**Arquivo**: `src/app/App.tsx` (Screen: `participants`)

**Funcionalidades**:

**Filtros e Busca**:
- Busca por nome/email
- Filtro por categoria
- Filtro por status (Confirmado, Pendente, Cancelado)
- Filtro por check-in (Realizado/Pendente)
- Ordenação customizada

**Tabela de Participantes**:
Colunas:
- Número de peito
- Nome do atleta
- Email
- Categoria
- Status de pagamento
- Check-in
- Ações

**Dados de Exemplo** (10 participantes):
1. Carlos Silva - #001 - Road - Confirmado - Check-in realizado
2. Ana Santos - #002 - Trail - Confirmado - Pendente
3. Pedro Oliveira - #003 - Ultra - Pendente - Pendente
4. Maria Costa - #004 - Road - Confirmado - Check-in realizado
5. João Ferreira - #005 - Trail - Confirmado - Pendente
6. Lucia Alves - #006 - Mountain - Confirmado - Pendente
7. Roberto Lima - #007 - Road - Cancelado - N/A
8. Fernanda Cruz - #008 - Ultra - Confirmado - Check-in realizado
9. Miguel Torres - #009 - Trail - Pendente - Pendente
10. Paula Rocha - #010 - Road - Confirmado - Pendente

**Ações em Massa**:
- Exportar lista (CSV/PDF)
- Enviar email para selecionados
- Marcar check-in em lote
- Gerar números de peito

**Estatísticas**:
- Total: 234 inscritos
- Confirmados: 198 (85%)
- Pendentes: 28 (12%)
- Cancelados: 8 (3%)
- Check-ins: 89 (38%)

**Elementos Visuais**:
- Tabela responsiva
- Badges de status coloridos
- Ações inline e dropdown
- Paginação e contadores

**Navegação**:
- Ver perfil do atleta
- Editar inscrição
- Voltar → Dashboard

---

### 11. Gestão Financeira (Organizador)

**Arquivo**: `src/app/App.tsx` (Screen: `finance`)

**Funcionalidades**:

**Resumo Financeiro** (4 cards):
- **Receita Total**: R$ 45.670,00
  - Crescimento: +12% vs mês anterior
  
- **Receita Confirmada**: R$ 38.950,00
  - Pagamentos processados
  
- **Receita Pendente**: R$ 6.720,00
  - Aguardando confirmação
  
- **Taxa Média**: R$ 195,00
  - Por inscrição

**Gráfico de Receita**:
- Evolução mensal dos últimos 6 meses
- Comparativo mês a mês
- Projeções futuras
- Filtros por período

**Eventos por Receita**:
Tabela detalhada:
1. **Ultra Trail São Paulo**
   - Inscritos: 234
   - Receita: R$ 23.400,00
   - Média: R$ 100,00
   - Status: Ativo

2. **Maratona Corporativa**
   - Inscritos: 450
   - Receita: R$ 13.500,00
   - Média: R$ 30,00
   - Status: Ativo

3. **Trail Experience**
   - Inscritos: 180
   - Receita: R$ 8.770,00
   - Média: R$ 48,70
   - Status: Ativo

**Transações Recentes**:
- Lista de últimas 20 transações
- Filtros por status (Aprovado, Pendente, Cancelado, Reembolsado)
- Detalhes: Data, atleta, evento, valor, método de pagamento
- Exportação de relatórios

**Análises**:
- Taxa de conversão
- Receita por categoria de evento
- Métodos de pagamento mais usados
- Períodos de maior venda

**Elementos Visuais**:
- Cards com métricas destacadas
- Gráficos interativos
- Tabelas com ordenação
- Indicadores de crescimento (setas e percentuais)
- Cores success/warning/error para status

**Navegação**:
- Ver detalhes da transação
- Exportar relatórios
- Configurar métodos de pagamento
- Voltar → Dashboard

---

## 🧩 Componentes

### Componentes Base

#### Button
- Variantes: Primary, Secondary, Outline, Ghost
- Tamanhos: SM, MD, LG
- Estados: Default, Hover, Active, Disabled
- Com/sem ícone

#### Input
- Tipos: Text, Email, Password, Number, Date
- Com prefixo/sufixo
- Estados de validação
- Labels e hints

#### Select
- Dropdown customizado
- Multi-select
- Busca integrada
- Grupos de opções

#### Badge
- Variantes: Primary, Accent, Success, Warning, Error
- Tamanhos: SM, MD, LG
- Com/sem ícone

#### Card
- Elevação e sombras
- Header/Body/Footer
- Variants: Default, Bordered, Elevated

### Componentes Compostos

#### Navigation
- Top nav com logo e menu
- Mobile hamburger menu
- Breadcrumbs
- Tabs

#### Stats Card
- Métrica principal grande
- Label descritivo
- Indicador de tendência
- Ícone temático

#### Event Card
- Imagem/banner
- Título e metadata
- Badges de categoria
- CTAs de ação
- Progress bars

#### Table
- Headers customizáveis
- Ordenação por coluna
- Paginação
- Ações inline
- Seleção múltipla
- Responsiva com scroll horizontal

#### Modal
- Overlay com backdrop blur
- Animação de entrada/saída
- Header/Body/Footer
- Tamanhos: SM, MD, LG, XL

#### Toast/Notification
- Variantes: Success, Warning, Error, Info
- Auto-dismiss
- Com ações
- Empilhamento

---

## 🔄 Fluxos de Navegação

### Fluxo do Atleta

```
Login
  ↓
Onboarding (primeira vez)
  ↓
Dashboard Atleta
  ├→ Ver Evento → Detalhes do Evento
  │                ↓
  │             Inscrever-se
  │                ↓
  │             Dashboard (atualizado)
  ├→ Check-in → Scanner QR → Confirmação
  └→ Perfil → Editar dados → Salvar
```

### Fluxo do Organizador

```
Login
  ↓
Onboarding (primeira vez)
  ↓
Dashboard Organizador
  ├→ Criar Evento → Formulário → Publicar
  │                                ↓
  │                         Dashboard (atualizado)
  ├→ Ver Evento → Gerenciar Participantes
  │                     ↓
  │               Check-in manual
  │                     ↓
  │               Lista atualizada
  └→ Financeiro → Relatórios → Exportar
```

### Navegação Principal

Todas as telas incluem:
- **Header fixo**: Logo, busca, notificações, perfil
- **Navegação lateral** (desktop): Menu principal
- **Bottom nav** (mobile): Ícones de navegação rápida
- **Breadcrumbs**: Localização atual
- **Botão voltar**: Sempre disponível

---

## 🎨 Padrões de Design

### Hierarquia Visual

1. **Títulos**: Barlow Condensed Bold, tamanho grande, cor primary
2. **Subtítulos**: Inter Semibold, tamanho médio, cor gray-300
3. **Corpo**: Inter Regular, tamanho base, cor gray-400
4. **Dados técnicos**: JetBrains Mono, cor accent

### Estados Interativos

**Hover**:
- Buttons: Brighten +10%, scale 1.02
- Cards: Elevação aumenta, borda accent sutil
- Links: Underline, cor primary

**Active/Pressed**:
- Scale 0.98
- Brilho reduzido

**Focus**:
- Outline neon (primary ou accent)
- Box shadow neon

**Disabled**:
- Opacity 50%
- Cursor not-allowed
- Sem interações

### Feedback Visual

**Loading**:
- Spinners com gradiente neon
- Skeleton screens
- Progress bars

**Sucesso**:
- Toast verde neon
- Ícone de check animado
- Confetti (ações importantes)

**Erro**:
- Toast rosa neon
- Shake animation
- Mensagem clara de ação

**Info**:
- Toast ciano
- Ícone informativo
- Dismiss automático

---

## 📊 Dados e Estados

### Dados Mockados

Todos os dados são exemplos realistas para demonstração:
- **Atletas**: 10 perfis com nomes, emails, categorias
- **Eventos**: 5 eventos com datas, locais, vagas
- **Transações**: 20 transações financeiras
- **Estatísticas**: Métricas calculadas dinamicamente

### Estados da Aplicação

- **Loading**: Carregamento inicial
- **Empty**: Sem dados disponíveis
- **Error**: Falha ao carregar
- **Success**: Dados carregados
- **Updating**: Atualizando dados

### Persistência

Atualmente sem backend:
- Estados gerenciados via React hooks (useState)
- Navegação via state machine
- Sem localStorage (pode ser adicionado)

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- pnpm 8+

### Instalação

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

### Build para Produção

```bash
# Criar build otimizado
pnpm build

# Preview do build
pnpm preview
```

### Estrutura de Comandos

```bash
# Desenvolvimento
pnpm dev           # Inicia dev server
pnpm build         # Build de produção
pnpm preview       # Preview do build
pnpm lint          # Linter
pnpm type-check    # Verificação de tipos TypeScript
```

---

## 📦 Dependências

### Principais

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "lucide-react": "latest",
  "tailwindcss": "^4.0.0"
}
```

### Dev Dependencies

```json
{
  "@types/react": "^18.3.1",
  "@types/react-dom": "^18.3.1",
  "typescript": "^5.6.3",
  "vite": "^6.0.0"
}
```

---

## 🎯 Próximos Passos

### Backend Integration
- [ ] Conectar API REST ou GraphQL
- [ ] Autenticação JWT
- [ ] Persistência de dados
- [ ] Upload de imagens

### Funcionalidades Adicionais
- [ ] Chat entre organizador e atletas
- [ ] Sistema de notificações push
- [ ] Integração com Strava/Garmin
- [ ] Pagamento online (Stripe/PayPal)
- [ ] Certificados automáticos
- [ ] Resultados e rankings ao vivo

### Melhorias UI/UX
- [ ] Animações com Framer Motion
- [ ] Dark/Light mode toggle
- [ ] Temas customizáveis
- [ ] PWA (instalável)
- [ ] Offline support

### Performance
- [ ] Code splitting
- [ ] Lazy loading de rotas
- [ ] Image optimization
- [ ] Caching estratégico

### Testes
- [ ] Unit tests (Vitest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Accessibility tests

---

## 📝 Notas Técnicas

### Performance

- Componentes otimizados com React.memo
- CSS-in-JS evitado em favor de Tailwind
- Imagens lazy-loaded
- Fonts preloaded

### Acessibilidade

- Semântica HTML5
- ARIA labels em elementos interativos
- Navegação por teclado
- Contraste de cores WCAG AA

### Responsividade

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly (botões 44x44px mínimo)
- Scroll behaviors otimizados

### SEO

- Meta tags apropriadas
- Structured data para eventos
- URLs semânticas
- Sitemap

---

## 👥 Personas

### Atleta - Carlos, 32 anos
- Corredor amador de trail running
- Participa de 1-2 eventos por mês
- Busca praticidade no check-in
- Acompanha métricas de performance

### Organizador - Ana, 45 anos
- Organiza eventos há 8 anos
- 3-5 eventos simultâneos
- Precisa de dashboard centralizado
- Foco em gestão financeira eficiente

---

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto:
- Documentação: Este arquivo
- Issues: GitHub repository
- Email: suporte@ticketmoove.com

---

## 📄 Licença

© 2026 Ticket Moove. Todos os direitos reservados.

---

**Documentação gerada em**: 27 de maio de 2026  
**Versão do sistema**: 1.0.0  
**Última atualização**: Implementação completa de 11 telas navegáveis com design system dark neon