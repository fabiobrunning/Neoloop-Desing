# Neoloop Design System - Arquitetura de Escopo COMPLETO
**Backend System Architect - Brutal Audit & Complete Plan**
**Data:** 2026-01-30
**Status:** CRITICAL SCOPE ANALYSIS

---

## 🚨 AUDIT BRUTAL: Estado Atual vs Escopo Real

### O QUE FOI FEITO ATÉ AGORA (Sprint 1-2)

**Componentes Implementados:** 30 arquivos `.tsx`
**Linhas de Código:** ~20,000+ linhas (estimado do relatório)
**Completude Reportada:** 65% (17/26 tarefas)

**PORÉM... isso representa apenas uma FRAÇÃO do escopo total solicitado.**

---

## 📊 MATRIZ DE COMPLETUDE REAL

### 🎨 1. FUNDAÇÃO (15 áreas solicitadas)

| Item | Status | Arquivo Atual | Completude Real | Gap |
|------|--------|---------------|-----------------|-----|
| **Cores** | ✅ Parcial | ColorTokensView.tsx | 60% | Falta: Semantic mapping, auto-generation |
| **Gradientes** | ❌ Não existe | - | 0% | ZERO implementação |
| **Backgrounds** | ⚠️ Básico | BackgroundsView.tsx | 20% | Só UI, sem lógica de patterns |
| **Tipografia** | ✅ Parcial | TypographyView.tsx | 50% | Falta: Font pairing, variable fonts |
| **Ícones** | ✅ Bom | IconsView.tsx, IconsLibraryView.tsx | 75% | Falta: Custom upload validation |
| **Ilustrações** | ❌ Não existe | - | 0% | ZERO implementação |
| **Logos** | ⚠️ Básico | SocialLogosView.tsx | 10% | Só social, falta brand logos |
| **Sombras** | ⚠️ Básico | ShadowsView.tsx | 30% | Falta: Multi-layer shadows |
| **Bordas** | ❌ Não existe | - | 0% | ZERO implementação |
| **Radius** | ⚠️ Básico | BorderRadiusView.tsx | 40% | Falta: Component-specific mapping |
| **Grid** | ❌ Não existe | - | 0% | ZERO implementação |
| **Espaçamento** | ✅ Parcial | SpacingView.tsx | 60% | Falta: Responsive spacing |
| **Z-Index** | ❌ Não existe | - | 0% | ZERO implementação |
| **Opacidade** | ❌ Não existe | - | 0% | ZERO implementação |
| **Breakpoints** | ⚠️ Básico | BreakpointsView.tsx | 20% | Só definição, sem preview |

**TOTAL FUNDAÇÃO: 24% completo (3.6/15)**

---

### 🧩 2. COMPONENTES BÁSICOS (18 solicitados)

| Componente | Status | Arquivo Atual | Completude Real | Gap |
|------------|--------|---------------|-----------------|-----|
| **Button** | ✅ Bom | Button.tsx, ButtonShowcase.tsx | 80% | Falta: Icon variants completos |
| **Button Icon** | ⚠️ Parcial | (dentro de Button.tsx) | 40% | Precisa ser separado |
| **Link** | ❌ Não existe | - | 0% | ZERO implementação |
| **Input** | ✅ Parcial | FormInputs.tsx | 60% | Misturado com outros |
| **Textarea** | ✅ Parcial | FormInputs.tsx | 60% | Misturado com outros |
| **Select** | ✅ Parcial | FormInputs.tsx | 60% | Falta: Custom dropdown |
| **Checkbox** | ✅ Parcial | FormInputs.tsx | 60% | Misturado com outros |
| **Radio** | ✅ Parcial | FormInputs.tsx | 60% | Misturado com outros |
| **Switch** | ✅ Parcial | FormInputs.tsx | 60% | Misturado com outros |
| **Label** | ✅ Parcial | FormInputs.tsx | 50% | Precisa ser componente próprio |
| **Helper Text** | ⚠️ Básico | (inline em forms) | 30% | Não é componente reutilizável |
| **Mensagem Erro** | ⚠️ Básico | (inline em forms) | 30% | Não é componente reutilizável |
| **Badge** | ❌ Não existe | - | 0% | ZERO implementação |
| **Avatar** | ❌ Não existe | - | 0% | ZERO implementação |
| **Tooltip** | ❌ Não existe | - | 0% | ZERO implementação |
| **Progress Bar** | ❌ Não existe | - | 0% | ZERO implementação |
| **Loader** | ✅ Básico | LoadingSpinner.tsx | 50% | Só 1 variante, falta 5+ |
| **Skeleton** | ❌ Não existe | - | 0% | ZERO implementação |

**TOTAL COMPONENTES BÁSICOS: 32% completo (5.8/18)**

---

### 📦 3. ESTRUTURA (8 componentes solicitados)

| Componente | Status | Completude Real | Gap |
|------------|--------|-----------------|-----|
| **Card** | ✅ Bom | 80% | Bom estado, falta Card Grid |
| **Card Login** | ❌ Não existe | 0% | Precisa ser template específico |
| **Modal** | ❌ Não existe | 0% | ZERO implementação |
| **Drawer** | ❌ Não existe | 0% | ZERO implementação |
| **Sidebar** | ❌ Não existe | 0% | ZERO implementação |
| **Navbar** | ⚠️ Parcial (Navigation.tsx) | 30% | É navegação interna, não componente |
| **Footer** | ❌ Não existe | 0% | ZERO implementação |
| **Accordion** | ❌ Não existe | 0% | ZERO implementação |

**Componentes Adicionais Mencionados:**
| **Tabs** | ❌ Não existe | 0% | ZERO implementação |
| **Pagination** | ❌ Não existe | 0% | ZERO implementação |
| **Breadcrumb** | ❌ Não existe | 0% | ZERO implementação |

**TOTAL ESTRUTURA: 10% completo (0.8/8 originais, ~7% se contar os 11 totais)**

---

### 📊 4. DADOS (7 componentes solicitados)

| Componente | Status | Completude Real | Gap |
|------------|--------|-----------------|-----|
| **Tabela** | ❌ Não existe | 0% | ZERO implementação |
| **Tabela Responsiva** | ❌ Não existe | 0% | ZERO implementação |
| **Lista** | ❌ Não existe | 0% | ZERO implementação |
| **Gráficos** | ✅ Parcial (ChartsView.tsx) | 50% | Só Victory, falta outras libs |
| **Charts** | ✅ Parcial (ChartsLibraryView.tsx) | 50% | Mesmo que acima |
| **Empty State** | ❌ Não existe | 0% | ZERO implementação |
| **Date Picker** | ❌ Não existe | 0% | ZERO implementação |
| **Time Picker** | ❌ Não existe | 0% | ZERO implementação |
| **Upload** | ⚠️ Experimental (CustomIconsView.tsx) | 20% | Só para ícones, não genérico |

**TOTAL DADOS: 13% completo (0.9/7)**

---

### 🔔 5. FEEDBACK (10 tipos solicitados)

| Tipo | Status | Completude Real | Gap |
|------|--------|-----------------|-----|
| **Toast** | ❌ Não existe | 0% | ZERO implementação |
| **Alert** | ❌ Não existe | 0% | ZERO implementação |
| **Confirm Dialog** | ❌ Não existe | 0% | ZERO implementação |
| **Estado: Hover** | ⚠️ Via CSS | 40% | Não é sistema, só CSS inline |
| **Estado: Focus** | ⚠️ Via CSS | 40% | Não é sistema, só CSS inline |
| **Estado: Disabled** | ⚠️ Via CSS | 40% | Não é sistema, só CSS inline |
| **Estado: Loading** | ✅ Parcial | 60% | Button tem, falta outros |
| **Estado: Success** | ❌ Não existe | 0% | ZERO implementação |
| **Estado: Error** | ⚠️ Básico | 30% | Só em forms, não é sistema |
| **Estado: Warning** | ❌ Não existe | 0% | ZERO implementação |

**TOTAL FEEDBACK: 21% completo (2.1/10)**

---

### 🎞 6. MOVIMENTO (6 áreas solicitadas)

| Área | Status | Completude Real | Gap |
|------|--------|-----------------|-----|
| **Animações** | ⚠️ Experimental (AnimationsView.tsx) | 15% | Arquivo existe, mas só UI mockup |
| **Microinterações** | ❌ Não existe | 0% | ZERO implementação |
| **Cursor** | ❌ Não existe | 0% | ZERO implementação |
| **Transições** | ⚠️ Via CSS | 20% | CSS inline, não é sistema |
| **Easing** | ❌ Não existe | 0% | ZERO implementação |
| **Gestos Mobile** | ❌ Não existe | 0% | ZERO implementação |

**TOTAL MOVIMENTO: 6% completo (0.35/6)**

---

### 🧭 7. NAVEGAÇÃO (4 áreas solicitadas)

| Área | Status | Completude Real | Gap |
|------|--------|-----------------|-----|
| **Rotas** | ❌ Não existe | 0% | App usa state, não rotas |
| **Menus** | ⚠️ Parcial (Navigation.tsx) | 30% | Navegação interna, não menu component |
| **Menu Contextual** | ❌ Não existe | 0% | ZERO implementação |
| **Step Indicator** | ❌ Não existe | 0% | ZERO implementação |
| **Onboarding** | ❌ Não existe | 0% | ZERO implementação |

**TOTAL NAVEGAÇÃO: 6% completo (0.3/5, incluindo Onboarding mencionado)**

---

### ♿ 8. ACESSIBILIDADE (4 áreas solicitadas)

| Área | Status | Completude Real | Gap |
|------|--------|-----------------|-----|
| **Contraste** | ✅ Bom (ContrastCheckerView.tsx) | 70% | Falta AAA suggestions |
| **Foco Visível** | ⚠️ CSS básico | 30% | Não é sistema gerenciado |
| **ARIA Labels** | ❌ Não sistematizado | 10% | Alguns componentes têm, não é padrão |
| **Tamanho Toque** | ❌ Não validado | 0% | ZERO implementação |

**TOTAL ACESSIBILIDADE: 28% completo (1.1/4)**

---

### ⚙️ 9. TOKENS & SISTEMA (6 áreas solicitadas)

| Área | Status | Completude Real | Gap |
|------|--------|-----------------|-----|
| **Design Tokens** | ✅ Parcial | 50% | Existem, falta export standardizado |
| **Tokens Cor** | ✅ Parcial | 60% | ColorTokensView ok, falta semantic |
| **Tokens Espaço** | ✅ Parcial | 60% | SpacingView ok, falta responsive |
| **Tokens Fonte** | ✅ Parcial | 50% | TypographyView ok, falta variable fonts |
| **Tokens Animação** | ❌ Não existe | 0% | ZERO implementação |
| **Tokens Sombra** | ⚠️ Básico | 30% | ShadowsView básico |

**TOTAL TOKENS: 42% completo (2.5/6)**

---

## 📉 COMPLETUDE REAL POR CATEGORIA

```
FUNDAÇÃO:        ████░░░░░░ 24%  (3.6/15)
COMPONENTES:     ████░░░░░░ 32%  (5.8/18)
ESTRUTURA:       █░░░░░░░░░ 10%  (0.8/8)
DADOS:           █░░░░░░░░░ 13%  (0.9/7)
FEEDBACK:        ██░░░░░░░░ 21%  (2.1/10)
MOVIMENTO:       █░░░░░░░░░  6%  (0.35/6)
NAVEGAÇÃO:       █░░░░░░░░░  6%  (0.3/5)
ACESSIBILIDADE:  ███░░░░░░░ 28%  (1.1/4)
TOKENS:          ████░░░░░░ 42%  (2.5/6)
─────────────────────────────────────────
MÉDIA GERAL:     ██░░░░░░░░ 20%  (17.55/79)
```

**COMPLETUDE REAL DO PROJETO: ~20%**

**Não 65%. Não 23%. VINTE POR CENTO.**

O relatório anterior considerou apenas as 26 tarefas do roadmap original, mas o escopo REAL tem **79+ itens distintos** solicitados pelo usuário.

---

## 🏗️ PLANO ARQUITETURAL COMPLETO

### PRINCÍPIOS DE DESIGN

#### 1. Component Composition Over Duplication
```typescript
// MAU (estado atual de FormInputs.tsx)
<FormInputs> com Input + Textarea + Select + Checkbox + Radio + Switch misturados

// BOM (target architecture)
/components
  /primitives
    /Input
      Input.tsx
      Input.types.ts
      Input.styles.ts
    /Checkbox
    /Radio
    ...
  /composed
    /FormGroup
      FormGroup.tsx (usa primitives)
```

#### 2. Token-Driven Everything
```typescript
// Toda propriedade visual deve vir de tokens
interface ButtonProps {
  variant: keyof typeof tokens.components.button.variants
  size: keyof typeof tokens.components.button.sizes
  // NÃO: color="blue"
  // SIM: colorToken="primary-500"
}
```

#### 3. Accessibility by Default
```typescript
// Todo componente DEVE ter:
interface AccessibleComponent {
  ariaLabel?: string
  ariaDescribedBy?: string
  role?: string
  tabIndex?: number
  // + validação automática de contraste
  // + keyboard navigation
}
```

#### 4. Showcase as Documentation
```typescript
// Cada componente TEM showcase correspondente
Button.tsx → ButtonShowcase.tsx
Card.tsx → CardShowcase.tsx
// Showcases servem como:
// - Documentação visual
// - Playground de testes
// - Exemplos de uso
```

---

## 📁 ESTRUTURA DE ARQUIVOS TARGET

```
neo-design-system-builder/
├── src/
│   ├── tokens/                          # SINGLE SOURCE OF TRUTH
│   │   ├── foundation/
│   │   │   ├── colors.ts                # 15 color scales
│   │   │   ├── gradients.ts             # Linear, radial, conic
│   │   │   ├── typography.ts            # Scales + font pairing
│   │   │   ├── spacing.ts               # 4px base system
│   │   │   ├── shadows.ts               # Multi-layer shadows
│   │   │   ├── radius.ts                # Border radius system
│   │   │   ├── borders.ts               # Border width/style
│   │   │   ├── zindex.ts                # Z-index layers
│   │   │   ├── opacity.ts               # Opacity scale
│   │   │   ├── grid.ts                  # Grid definitions
│   │   │   ├── breakpoints.ts           # Responsive breakpoints
│   │   │   └── animations.ts            # Timing/easing
│   │   ├── semantic/
│   │   │   ├── colors-semantic.ts       # primary, success, error, etc
│   │   │   ├── spacing-semantic.ts      # section, component, inline
│   │   │   └── typography-semantic.ts   # heading, body, caption
│   │   └── components/
│   │       ├── button-tokens.ts         # Button-specific tokens
│   │       ├── card-tokens.ts
│   │       └── ...
│   │
│   ├── components/
│   │   ├── primitives/                  # ATOMIC COMPONENTS
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   ├── Button.styles.ts
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ButtonIcon/
│   │   │   ├── Link/
│   │   │   ├── Input/
│   │   │   ├── Textarea/
│   │   │   ├── Select/
│   │   │   ├── Checkbox/
│   │   │   ├── Radio/
│   │   │   ├── Switch/
│   │   │   ├── Label/
│   │   │   ├── HelperText/
│   │   │   ├── ErrorMessage/
│   │   │   ├── Badge/
│   │   │   ├── Avatar/
│   │   │   ├── Tooltip/
│   │   │   ├── ProgressBar/
│   │   │   ├── Loader/
│   │   │   └── Skeleton/
│   │   │
│   │   ├── composed/                    # COMPOSED COMPONENTS
│   │   │   ├── Card/
│   │   │   ├── CardLogin/
│   │   │   ├── Modal/
│   │   │   ├── Drawer/
│   │   │   ├── Sidebar/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── Accordion/
│   │   │   ├── Tabs/
│   │   │   ├── Pagination/
│   │   │   ├── Breadcrumb/
│   │   │   ├── Table/
│   │   │   ├── TableResponsive/
│   │   │   ├── List/
│   │   │   ├── Chart/
│   │   │   ├── EmptyState/
│   │   │   ├── DatePicker/
│   │   │   ├── TimePicker/
│   │   │   └── Upload/
│   │   │
│   │   ├── feedback/                    # FEEDBACK SYSTEM
│   │   │   ├── Toast/
│   │   │   ├── Alert/
│   │   │   ├── ConfirmDialog/
│   │   │   └── StateIndicator/          # Unified state system
│   │   │       ├── Success.tsx
│   │   │       ├── Error.tsx
│   │   │       ├── Warning.tsx
│   │   │       └── Loading.tsx
│   │   │
│   │   ├── navigation/                  # NAVIGATION SYSTEM
│   │   │   ├── Menu/
│   │   │   ├── MenuContextual/
│   │   │   ├── StepIndicator/
│   │   │   └── Onboarding/
│   │   │
│   │   └── showcases/                   # SHOWCASES (documentação visual)
│   │       ├── ButtonShowcase.tsx
│   │       ├── CardShowcase.tsx
│   │       └── ...
│   │
│   ├── views/                           # EDITOR VIEWS
│   │   ├── foundation/
│   │   │   ├── ColorTokensView.tsx
│   │   │   ├── GradientsView.tsx        # ❌ FALTA CRIAR
│   │   │   ├── BackgroundsView.tsx
│   │   │   ├── TypographyView.tsx
│   │   │   ├── IconsView.tsx
│   │   │   ├── IllustrationsView.tsx    # ❌ FALTA CRIAR
│   │   │   ├── LogosView.tsx            # ❌ FALTA CRIAR
│   │   │   ├── ShadowsView.tsx
│   │   │   ├── BordersView.tsx          # ❌ FALTA CRIAR
│   │   │   ├── BorderRadiusView.tsx
│   │   │   ├── GridView.tsx             # ❌ FALTA CRIAR
│   │   │   ├── SpacingView.tsx
│   │   │   ├── ZIndexView.tsx           # ❌ FALTA CRIAR
│   │   │   ├── OpacityView.tsx          # ❌ FALTA CRIAR
│   │   │   └── BreakpointsView.tsx
│   │   │
│   │   ├── components/
│   │   │   └── UIComponentsView.tsx     # Showcase de todos componentes
│   │   │
│   │   ├── data/
│   │   │   └── ChartsView.tsx
│   │   │
│   │   ├── animation/
│   │   │   ├── AnimationsView.tsx
│   │   │   ├── MicrointeractionsView.tsx # ❌ FALTA CRIAR
│   │   │   ├── CursorView.tsx           # ❌ FALTA CRIAR
│   │   │   ├── TransitionsView.tsx      # ❌ FALTA CRIAR
│   │   │   ├── EasingView.tsx           # ❌ FALTA CRIAR
│   │   │   └── GesturesView.tsx         # ❌ FALTA CRIAR
│   │   │
│   │   └── accessibility/
│   │       ├── ContrastCheckerView.tsx
│   │       ├── FocusValidatorView.tsx   # ❌ FALTA CRIAR
│   │       ├── ARIAValidatorView.tsx    # ❌ FALTA CRIAR
│   │       └── TouchTargetView.tsx      # ❌ FALTA CRIAR
│   │
│   ├── hooks/                           # CUSTOM HOOKS
│   │   ├── useTokens.ts                 # Acesso unificado a tokens
│   │   ├── useAccessibility.ts          # Validação a11y
│   │   ├── useResponsive.ts             # Breakpoints
│   │   ├── useAnimation.ts              # Animações
│   │   └── useExport.ts                 # Export de design system
│   │
│   ├── utils/                           # UTILITIES
│   │   ├── contrast-checker.ts          # WCAG calculations
│   │   ├── color-converter.ts           # RGB/HSL/HEX
│   │   ├── token-generator.ts           # Generate CSS vars
│   │   ├── export-formats.ts            # JSON/CSS/JS/TS
│   │   └── validators.ts                # Token validation
│   │
│   ├── types/                           # TYPESCRIPT TYPES
│   │   ├── tokens.ts                    # Token types
│   │   ├── components.ts                # Component types
│   │   ├── design-system.ts             # Design system types
│   │   └── export.ts                    # Export types
│   │
│   └── App.tsx                          # MAIN APP
│
├── assets/                              # STATIC ASSETS
│   ├── icons/                           # Icon library
│   ├── illustrations/                   # Illustrations library
│   ├── logos/                           # Logo library
│   └── fonts/                           # Font files
│
└── docs/                                # DOCUMENTATION
    └── (estrutura atual mantida)
```

---

## 🎯 ROADMAP DE IMPLEMENTAÇÃO - 5 FASES

### FASE 1: FOUNDATION COMPLETA (4-6 semanas)
**Objetivo:** Completar TODOS os 15 itens de fundação

**Entregas:**
- [ ] GradientsView.tsx - Editor de gradientes lineares/radiais/cônicos
- [ ] IllustrationsView.tsx - Biblioteca de ilustrações
- [ ] LogosView.tsx - Sistema de logos (brand + social)
- [ ] BordersView.tsx - Sistema de bordas (width, style, color)
- [ ] GridView.tsx - Sistema de grid (columns, gutter, max-width)
- [ ] ZIndexView.tsx - Sistema de camadas
- [ ] OpacityView.tsx - Escala de opacidade
- [ ] Refatorar BackgroundsView - Patterns, textures, overlays
- [ ] Refatorar ShadowsView - Multi-layer shadows
- [ ] Refatorar BreakpointsView - Preview responsivo

**Stack Técnico:**
- React + TypeScript
- Tailwind CSS (utility-first)
- Design tokens em CSS Variables
- Export para JSON/CSS/JS/TS

**Estimativa:** 120-150 horas

---

### FASE 2: COMPONENTES PRIMITIVOS (6-8 semanas)
**Objetivo:** Separar e completar TODOS os 18 componentes básicos

**Entregas:**
- [ ] Refatorar FormInputs.tsx em componentes separados:
  - Input/
  - Textarea/
  - Select/ (com custom dropdown)
  - Checkbox/
  - Radio/
  - Switch/
  - Label/
  - HelperText/
  - ErrorMessage/
- [ ] ButtonIcon/ - Separar de Button
- [ ] Link/ - Componente de link
- [ ] Badge/ - Badges e pills
- [ ] Avatar/ - Avatars (texto, imagem, iniciais)
- [ ] Tooltip/ - Sistema de tooltips
- [ ] ProgressBar/ - Progress linear/circular
- [ ] Loader/ - 5+ variantes de loading
- [ ] Skeleton/ - Skeleton screens

**Padrão de Implementação:**
```typescript
// Cada componente TEM:
ComponentName/
  ├── ComponentName.tsx       # Implementação
  ├── ComponentName.types.ts  # TypeScript interfaces
  ├── ComponentName.styles.ts # Tailwind classes (ou CSS)
  ├── ComponentName.test.tsx  # Unit tests
  └── index.ts                # Barrel export
```

**Estimativa:** 150-200 horas

---

### FASE 3: COMPONENTES COMPOSTOS + ESTRUTURA (6-8 semanas)
**Objetivo:** Criar TODOS os componentes de estrutura e dados

**Entregas:**
- [ ] CardLogin/ - Template de card de login
- [ ] Modal/ - Sistema de modals (sizes, animations)
- [ ] Drawer/ - Side drawers (left/right)
- [ ] Sidebar/ - Componente de sidebar
- [ ] Navbar/ - Navbar responsivo
- [ ] Footer/ - Footer component
- [ ] Accordion/ - Accordion/Collapsible
- [ ] Tabs/ - Tab system
- [ ] Pagination/ - Paginação
- [ ] Breadcrumb/ - Breadcrumbs
- [ ] Table/ - Tabela completa
- [ ] TableResponsive/ - Tabela mobile-friendly
- [ ] List/ - Listas (ordered, unordered, description)
- [ ] EmptyState/ - Empty states
- [ ] DatePicker/ - Seletor de data
- [ ] TimePicker/ - Seletor de hora
- [ ] Upload/ - Upload genérico (não só ícones)

**Estimativa:** 180-220 horas

---

### FASE 4: FEEDBACK + MOVIMENTO + NAVEGAÇÃO (4-6 semanas)
**Objetivo:** Sistemas de feedback, animação e navegação

**Entregas FEEDBACK:**
- [ ] Toast/ - Toast notifications
- [ ] Alert/ - Alert component
- [ ] ConfirmDialog/ - Confirmation dialogs
- [ ] StateIndicator/ - Sistema unificado de estados
  - Success/
  - Error/
  - Warning/
  - Loading/
  - (+ estados de hover, focus, disabled via CSS system)

**Entregas MOVIMENTO:**
- [ ] MicrointeractionsView.tsx - Editor de microinterações
- [ ] CursorView.tsx - Custom cursors
- [ ] TransitionsView.tsx - Sistema de transições
- [ ] EasingView.tsx - Easing functions
- [ ] GesturesView.tsx - Gestos mobile (swipe, pinch)
- [ ] Refatorar AnimationsView.tsx - Animações CSS/JS

**Entregas NAVEGAÇÃO:**
- [ ] Menu/ - Menu component
- [ ] MenuContextual/ - Context menus
- [ ] StepIndicator/ - Stepper/Wizard
- [ ] Onboarding/ - Onboarding flows
- [ ] Sistema de rotas (se necessário)

**Estimativa:** 120-160 horas

---

### FASE 5: ACESSIBILIDADE + EXPORT + POLISH (4-6 semanas)
**Objetivo:** Completar acessibilidade e polish final

**Entregas ACESSIBILIDADE:**
- [ ] FocusValidatorView.tsx - Validador de foco visível
- [ ] ARIAValidatorView.tsx - Validador de ARIA labels
- [ ] TouchTargetView.tsx - Validador de tamanho de toque (min 44x44px)
- [ ] Refatorar ContrastCheckerView - AAA suggestions
- [ ] Sistema automático de validação a11y em TODOS componentes

**Entregas EXPORT:**
- [ ] Export para CSS Variables
- [ ] Export para JSON (design tokens)
- [ ] Export para JavaScript/TypeScript
- [ ] Export para Tailwind config
- [ ] Export para SCSS/SASS
- [ ] Export para Figma Tokens (JSON)
- [ ] Sistema de versionamento de design systems

**Entregas POLISH:**
- [ ] Onboarding do app
- [ ] Tooltips em TODOS os controles
- [ ] Keyboard shortcuts (CMD+K, etc)
- [ ] Dark mode completo
- [ ] Performance optimization (lazy loading, memoization)
- [ ] Testes automatizados (unit + integration)

**Estimativa:** 120-150 horas

---

## 📊 ESTIMATIVAS TOTAIS

```
FASE 1: Foundation         120-150h   (4-6 semanas)
FASE 2: Primitivos         150-200h   (6-8 semanas)
FASE 3: Compostos          180-220h   (6-8 semanas)
FASE 4: Feedback+Movimento 120-160h   (4-6 semanas)
FASE 5: A11y+Export        120-150h   (4-6 semanas)
──────────────────────────────────────────────────
TOTAL:                     690-880h   (24-36 semanas)
                                      (6-9 MESES)
```

**Com 1 desenvolvedor full-time (40h/semana):**
- **Cenário otimista:** 6 meses
- **Cenário realista:** 7-8 meses
- **Cenário com imprevistos:** 9-10 meses

**Com 2 desenvolvedores:**
- **Cenário otimista:** 3-4 meses
- **Cenário realista:** 4-5 meses

---

## 🏛️ DECISÕES ARQUITETURAIS CRÍTICAS

### ADR-001: Monorepo vs Multi-Package
**Decisão:** Monorepo (single package)
**Razão:** Simplicidade inicial, menos overhead de build

**Futuro (v2.0):** Migrar para multi-package
```
@neoloop/tokens
@neoloop/components
@neoloop/icons
@neoloop/animations
```

---

### ADR-002: Styling Strategy
**Decisão:** Tailwind CSS + CSS Variables
**Razão:**
- Tailwind: Utility-first, consistency
- CSS Variables: Runtime theming, export flexibility

**Rejeição de alternativas:**
- ❌ CSS-in-JS (Styled Components): Bundle size
- ❌ Plain CSS: Falta de utilitários
- ❌ SCSS: Não oferece runtime theming

---

### ADR-003: Component State Management
**Decisão:** React useState + useContext para global state
**Razão:** Simplicidade, sem over-engineering

**Futuro:** Se necessário, migrar para Zustand ou Jotai

---

### ADR-004: Design Token Format
**Decisão:** JSON com export para CSS Variables
```json
{
  "color": {
    "primary": {
      "50": "#eff6ff",
      "100": "#dbeafe",
      // ...
      "900": "#1e3a8a"
    }
  }
}
```
**Export:**
```css
:root {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  /* ... */
}
```

---

### ADR-005: Accessibility Validation
**Decisão:** Validação automática on-save + manual tools
**Razão:** Prevenir erros + educar usuário

**Implementação:**
- Contrast ratio calculado automaticamente
- Warnings visuais (yellow/red)
- Sugestões de correção
- Bloqueio de export se critical errors

---

### ADR-006: Export Strategy
**Decisão:** Multiple formats, user choice
**Formatos:**
1. CSS Variables (default)
2. JSON (design tokens)
3. JavaScript object
4. TypeScript interfaces
5. Tailwind config
6. SCSS variables
7. Figma Tokens

**Razão:** Máxima compatibilidade com ecossistemas

---

## 🔧 TECH STACK DETALHADO

### Frontend
- **Framework:** React 18+ (Vite)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS 4+ (CSS Variables)
- **Icons:** Lucide React (3,820 ícones)
- **Charts:** Victory (atual) + Chart.js (futuro)
- **Animations:** Framer Motion (para microinterações)
- **Forms:** React Hook Form (para forms complexos)
- **State:** React useState + useContext (monolith state)

### Build & Dev Tools
- **Bundler:** Vite 5+
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode
- **Git Hooks:** Husky + lint-staged

### Deployment (Futuro - v1.1)
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Hosting:** Vercel (frontend) + Supabase (backend)
- **CDN:** Cloudflare (assets)
- **Analytics:** Plausible (privacy-first)

---

## 📋 ACCEPTANCE CRITERIA - Cada Componente DEVE

### Checklist Obrigatório
- [ ] TypeScript types completos
- [ ] Props interface documentada
- [ ] Acessibilidade (ARIA, keyboard nav)
- [ ] Responsive design
- [ ] Dark mode support
- [ ] Showcase component criado
- [ ] Unit tests (coverage > 80%)
- [ ] Documentação inline (JSDoc)
- [ ] Export de design tokens
- [ ] Validação de contraste (se aplicável)

### Quality Gates
- [ ] ESLint passa (zero warnings)
- [ ] TypeScript passa (zero errors)
- [ ] Tests passam (coverage > 80%)
- [ ] Build passa (zero errors)
- [ ] Bundle size < threshold (definir por componente)
- [ ] Lighthouse score > 90 (performance, accessibility)

---

## 🚀 METAS DE QUALIDADE

### Performance
- **Bundle inicial:** < 300 KB (gzipped)
- **Lazy loading:** < 50 KB por chunk
- **Time to Interactive:** < 2s (3G)
- **First Contentful Paint:** < 1s

### Acessibilidade
- **WCAG 2.1 AA:** 100%
- **WCAG 2.1 AAA:** > 80%
- **Keyboard navigation:** 100%
- **Screen reader compatible:** 100%

### Code Quality
- **TypeScript strict:** 100%
- **Test coverage:** > 80%
- **ESLint compliance:** 100%
- **Documentation:** > 90%

---

## 💰 CUSTO ESTIMADO (Se Projeto Externo)

**Desenvolvedor Senior Full-Stack (€60-80/h):**
```
690h × €70/h = €48,300 (mínimo)
880h × €70/h = €61,600 (máximo)
```

**Desenvolvedor Mid-Level (€40-50/h):**
```
690h × €45/h = €31,050 (mínimo)
880h × €45/h = €39,600 (máximo)
```

**Com 2 desenvolvedores (1 Senior + 1 Mid):**
```
Custo médio: €40,000 - €50,000
Tempo: 4-5 meses
```

---

## 📝 CONCLUSÃO BRUTAL

### O QUE TEMOS HOJE
- 30 arquivos de componentes
- ~20,000 linhas de código
- Sprint 1-2 completo (relatório diz 65%)

### O QUE FALTA FAZER
- **47+ componentes novos ou refatorações profundas**
- **10+ views de editor faltando**
- **6+ sistemas completos (Feedback, Movimento, Navegação)**
- **Sistema de export multi-formato**
- **Validação automática de acessibilidade**
- **690-880 horas adicionais**

### COMPLETUDE REAL
**20%** (não 65%)

### TEMPO NECESSÁRIO PARA 100%
**6-9 meses com 1 desenvolvedor full-time**
**ou**
**3-5 meses com 2 desenvolvedores**

---

## ✅ RECOMENDAÇÕES

### Opção 1: Reduzir Escopo (MVP Real)
Focar em:
- ✅ Foundation (cores, tipografia, espaçamento)
- ✅ 10 componentes mais usados (Button, Input, Card, Modal, Toast)
- ✅ Export básico (CSS + JSON)
- ✅ Acessibilidade básica (WCAG AA)

**Tempo:** 2-3 meses
**Valor:** MVP funcional e utilizável

### Opção 2: Implementação Faseada (Recomendado)
Seguir as 5 fases descritas acima.
**Releases incrementais:**
- v1.0 (MVP): Foundation + 10 componentes core
- v1.1: Componentes restantes
- v1.2: Feedback + Movimento
- v2.0: Full feature set

**Tempo:** 6-9 meses
**Valor:** Design system profissional completo

### Opção 3: Full Scope ASAP
Contratar time (2-3 devs) e executar todas as 5 fases em paralelo.
**Tempo:** 3-4 meses
**Custo:** €40,000 - €60,000
**Valor:** Design system enterprise-grade

---

**Arquiteto:** Backend System Architect
**Data:** 2026-01-30
**Status:** SCOPE ANALYSIS COMPLETE
**Próximo Passo:** Decisão de estratégia (Opção 1, 2 ou 3)
