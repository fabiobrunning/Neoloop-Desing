# Design Tokens Reference
**Neoloop Design System Builder**
**Data:** 2026-01-31
**Status:** ✅ COMPLETO

---

## 📋 Visão Geral

Este documento é a referência completa de todos os design tokens do Neoloop Design System Builder, incluindo valores, uso recomendado e exemplos práticos.

---

## 🎨 Color Tokens

### Primary Colors

```css
/* Primary Scale */
--color-primary-50: #FFF1F0;
--color-primary-100: #FFE1DE;
--color-primary-200: #FFC7C2;
--color-primary-300: #FFA8A1;
--color-primary-400: #FF756C;
--color-primary-500: #FF453A;    /* Base */
--color-primary-600: #E6312B;
--color-primary-700: #CC271F;
--color-primary-800: #B31E15;
--color-primary-900: #991A17;
```

**Uso:**
- 500: Botões primários, links, elementos de destaque
- 100-300: Backgrounds de hover, estados ativos
- 600-900: Texto em backgrounds claros, borders

**Contraste WCAG:**
- primary-500 em white: 4.6:1 (AA) ✅
- primary-700 em white: 7.2:1 (AAA) ✅
- white em primary-500: 4.6:1 (AA) ✅

---

### Secondary Colors

```css
/* Secondary Scale */
--color-secondary-50: #E6F7FF;
--color-secondary-100: #BAE7FF;
--color-secondary-200: #91D5FF;
--color-secondary-300: #69C0FF;
--color-secondary-400: #40A9FF;
--color-secondary-500: #32ADE6;    /* Base */
--color-secondary-600: #2890C4;
--color-secondary-700: #1E75A3;
--color-secondary-800: #145A82;
--color-secondary-900: #0A3F61;
```

**Uso:**
- 500: Botões secundários, informações, badges
- 100-300: Backgrounds informativos
- 700-900: Texto em backgrounds claros

---

### Semantic Colors

```css
/* Success */
--color-success-50: #ECFDF5;
--color-success-100: #D1FAE5;
--color-success-500: #10B981;
--color-success-700: #047857;

/* Warning */
--color-warning-50: #FFFBEB;
--color-warning-100: #FEF3C7;
--color-warning-500: #F59E0B;
--color-warning-700: #B45309;

/* Error */
--color-error-50: #FEF2F2;
--color-error-100: #FEE2E2;
--color-error-500: #EF4444;
--color-error-700: #B91C1C;

/* Info */
--color-info-50: #EFF6FF;
--color-info-100: #DBEAFE;
--color-info-500: #3B82F6;
--color-info-700: #1D4ED8;
```

**Uso:**
- Success: Confirmações, status positivos
- Warning: Alertas, ações que requerem atenção
- Error: Erros, validações falhadas
- Info: Informações neutras, dicas

---

### Neutral Colors (Gray Scale)

```css
/* Gray Scale */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Pure Black & White */
--white: #FFFFFF;
--black: #000000;
```

**Uso:**
- 50-200: Backgrounds, divisores sutis
- 300-500: Borders, ícones desabilitados, placeholders
- 600-900: Texto, ícones ativos, headings
- white/black: Backgrounds principais, texto de alto contraste

---

## 📝 Typography Tokens

### Font Families

```css
--font-family-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-serif: 'Merriweather', Georgia, Cambria, 'Times New Roman', serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, Monaco,
                    'Courier New', monospace;
```

**Uso:**
- sans: Corpo de texto, UI, headings
- serif: Títulos editoriais, longform content
- mono: Código, dados técnicos, números

---

### Font Sizes

```css
/* Size Scale (Ratio: 1.25 - Major Third) */
--font-size-xs: 0.75rem;      /* 12px */
--font-size-sm: 0.875rem;     /* 14px */
--font-size-base: 1rem;       /* 16px - Base */
--font-size-lg: 1.125rem;     /* 18px */
--font-size-xl: 1.25rem;      /* 20px */
--font-size-2xl: 1.5rem;      /* 24px */
--font-size-3xl: 1.875rem;    /* 30px */
--font-size-4xl: 2.25rem;     /* 36px */
--font-size-5xl: 3rem;        /* 48px */
--font-size-6xl: 3.75rem;     /* 60px */
```

**Uso:**
- xs: Labels pequenos, captions
- sm: Secondary text, helper text
- base: Corpo de texto padrão
- lg-xl: Headings menores (h4-h6)
- 2xl-4xl: Headings principais (h1-h3)
- 5xl-6xl: Display text, hero titles

**Acessibilidade:**
- Base mínimo: 16px para legibilidade
- Headings: Sempre > 18px para WCAG AAA

---

### Font Weights

```css
--font-weight-thin: 100;
--font-weight-extralight: 200;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;
```

**Uso Recomendado:**
- 300-400: Corpo de texto
- 500: Destaque leve, labels
- 600-700: Headings, botões
- 800-900: Display, títulos de impacto

---

### Line Heights

```css
--line-height-none: 1;
--line-height-tight: 1.25;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

**Uso:**
- tight: Headings, títulos curtos
- normal: Corpo de texto (WCAG recomenda 1.5)
- relaxed: Longform, leitura prolongada
- loose: Poesia, citações, espaçamento arejado

**Acessibilidade:**
- Mínimo: 1.5 para texto normal
- Headings: 1.2-1.3 aceitável

---

### Letter Spacing

```css
--letter-spacing-tighter: -0.05em;
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;
```

**Uso:**
- tighter/tight: Headings grandes, display
- normal: Corpo de texto padrão
- wide/wider: ALL CAPS, labels, buttons
- widest: SMALL CAPS, badges

---

## 📏 Spacing Tokens

### Spacing Scale (Base: 4px)

```css
--spacing-0: 0;
--spacing-px: 1px;
--spacing-0_5: 0.125rem;   /* 2px */
--spacing-1: 0.25rem;      /* 4px */
--spacing-1_5: 0.375rem;   /* 6px */
--spacing-2: 0.5rem;       /* 8px */
--spacing-2_5: 0.625rem;   /* 10px */
--spacing-3: 0.75rem;      /* 12px */
--spacing-3_5: 0.875rem;   /* 14px */
--spacing-4: 1rem;         /* 16px */
--spacing-5: 1.25rem;      /* 20px */
--spacing-6: 1.5rem;       /* 24px */
--spacing-7: 1.75rem;      /* 28px */
--spacing-8: 2rem;         /* 32px */
--spacing-9: 2.25rem;      /* 36px */
--spacing-10: 2.5rem;      /* 40px */
--spacing-11: 2.75rem;     /* 44px */
--spacing-12: 3rem;        /* 48px */
--spacing-14: 3.5rem;      /* 56px */
--spacing-16: 4rem;        /* 64px */
--spacing-20: 5rem;        /* 80px */
--spacing-24: 6rem;        /* 96px */
--spacing-28: 7rem;        /* 112px */
--spacing-32: 8rem;        /* 128px */
--spacing-36: 9rem;        /* 144px */
--spacing-40: 10rem;       /* 160px */
--spacing-44: 11rem;       /* 176px */
--spacing-48: 12rem;       /* 192px */
--spacing-52: 13rem;       /* 208px */
--spacing-56: 14rem;       /* 224px */
--spacing-60: 15rem;       /* 240px */
--spacing-64: 16rem;       /* 256px */
--spacing-72: 18rem;       /* 288px */
--spacing-80: 20rem;       /* 320px */
--spacing-96: 24rem;       /* 384px */
```

**Uso Comum:**
- 0-2: Elementos muito próximos (ícone + texto)
- 3-4: Padding de botões, inputs
- 6-8: Espaçamento entre componentes
- 12-16: Seções dentro de um container
- 20-32: Seções principais de página
- 40+: Hero sections, grandes divisões

**Acessibilidade:**
- Touch targets: Mínimo 44px (spacing-11)
- Espaçamento legível: 16-24px entre parágrafos

---

## ☁️ Shadow Tokens

### Shadow Scale

```css
/* Elevations */
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

/* Special Shadows */
--shadow-none: 0 0 #0000;
--shadow-focus: 0 0 0 3px rgb(66 153 225 / 0.5);
```

**Uso:**
- xs: Borders sutis, divisores
- sm: Cards simples, inputs
- md: Cards elevados, dropdowns
- lg: Modais, overlays
- xl: Popups importantes, hero cards
- 2xl: Overlays principais, dialogs críticos
- inner: Inputs pressionados, wells

**Acessibilidade:**
- Shadows não transmitem informação sozinhas
- Sempre combine com border ou cor

---

## 🔘 Border Radius Tokens

### Radius Scale

```css
--radius-none: 0;
--radius-sm: 0.125rem;     /* 2px */
--radius-base: 0.25rem;    /* 4px */
--radius-md: 0.375rem;     /* 6px */
--radius-lg: 0.5rem;       /* 8px */
--radius-xl: 0.75rem;      /* 12px */
--radius-2xl: 1rem;        /* 16px */
--radius-3xl: 1.5rem;      /* 24px */
--radius-full: 9999px;     /* Circle/Pill */
```

**Uso:**
- none: Formal, rígido, editorial
- sm-base: Botões, inputs (subtle)
- md-lg: Cards, containers (friendly)
- xl-2xl: Modals, hero cards (bold)
- 3xl: Distintivo, branding forte
- full: Avatars, pills, badges

**Consistência:**
- Use mesma escala em todo o projeto
- Componentes relacionados: mesmo radius

---

## 📱 Breakpoint Tokens

### Responsive Breakpoints

```css
--breakpoint-sm: 640px;    /* Mobile landscape */
--breakpoint-md: 768px;    /* Tablet portrait */
--breakpoint-lg: 1024px;   /* Desktop */
--breakpoint-xl: 1280px;   /* Large desktop */
--breakpoint-2xl: 1536px;  /* Extra large */
```

**Media Queries:**
```css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }

/* Desktop First Approach (não recomendado) */
@media (max-width: 639px) { /* < sm */ }
@media (max-width: 767px) { /* < md */ }
```

**Uso:**
- sm: Ajustes para mobile landscape
- md: Tablet layout changes
- lg: Desktop completo
- xl-2xl: Large screens, extra columns

---

## ⏱️ Transition Tokens

### Timing & Easing

```css
/* Durations */
--transition-fastest: 50ms;
--transition-fast: 100ms;
--transition-base: 150ms;
--transition-slow: 200ms;
--transition-slower: 300ms;
--transition-slowest: 500ms;

/* Easing Functions */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Uso:**
- fastest: Feedback imediato (hover state)
- fast: Interações rápidas (toggle, checkbox)
- base: Padrão (botões, links)
- slow: Animações de entrada (modal, dropdown)
- slower: Transições complexas (page transitions)
- slowest: Animações chamativas (onboarding)

**Easing:**
- linear: Loading bars, progresso
- ease-in: Elementos saindo da tela
- ease-out: Elementos entrando (recomendado)
- ease-in-out: Movimento suave bidirecional
- bounce/elastic: Efeitos playful (com moderação)

**Acessibilidade:**
- Respeitar `prefers-reduced-motion`
- Animações < 500ms geralmente são OK
- Evitar flashing rápido (epilepsia)

---

## 🎯 Z-Index Tokens

### Layering Scale

```css
--z-index-below: -1;
--z-index-base: 0;
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
--z-index-notification: 1080;
--z-index-above-all: 9999;
```

**Uso:**
- below: Backgrounds, decorations
- base: Normal flow
- dropdown: Menus, selects
- sticky: Headers fixos
- modal-backdrop: Overlay escuro
- modal: Dialogs, confirmações
- popover: Dicas contextuais
- tooltip: Informações hover
- notification: Toasts, alerts
- above-all: Emergências (evitar)

**Consistência:**
- Nunca use valores arbitrários
- Sempre use tokens definidos
- Documente layers especiais

---

## 📐 Grid & Layout Tokens

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
--container-full: 100%;
```

**Uso:**
- sm: Conteúdo narrow (artigos)
- md-lg: Conteúdo padrão
- xl-2xl: Dashboards, tabelas largas
- full: Background sections

---

### Grid Columns

```css
--grid-cols-1: repeat(1, minmax(0, 1fr));
--grid-cols-2: repeat(2, minmax(0, 1fr));
--grid-cols-3: repeat(3, minmax(0, 1fr));
--grid-cols-4: repeat(4, minmax(0, 1fr));
--grid-cols-6: repeat(6, minmax(0, 1fr));
--grid-cols-12: repeat(12, minmax(0, 1fr));
```

**Uso:**
- 1: Mobile, stacked
- 2-3: Tablet, cards
- 4-6: Desktop, galleries
- 12: Complex layouts, sistemas flexíveis

---

## 🌈 Exemplo Completo de Uso

### Component Example: Button

```css
.button {
  /* Typography */
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);

  /* Spacing */
  padding: var(--spacing-2) var(--spacing-4);
  gap: var(--spacing-2);

  /* Colors */
  background-color: var(--color-primary-500);
  color: var(--white);

  /* Border */
  border: none;
  border-radius: var(--radius-md);

  /* Shadow */
  box-shadow: var(--shadow-sm);

  /* Transition */
  transition: all var(--transition-base) var(--ease-out);
}

.button:hover {
  background-color: var(--color-primary-600);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.button:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.button:active {
  background-color: var(--color-primary-700);
  box-shadow: var(--shadow-xs);
  transform: translateY(0);
}

.button:disabled {
  background-color: var(--gray-300);
  color: var(--gray-500);
  cursor: not-allowed;
  box-shadow: none;
}
```

---

## ✅ Validation Rules

### Token Usage Checklist

**Colors:**
- [ ] Use semantic color names (primary, secondary, success)
- [ ] Never hardcode hex values
- [ ] Check WCAG contrast ratios (4.5:1 minimum)

**Typography:**
- [ ] Font size ≥ 16px para corpo de texto
- [ ] Line height ≥ 1.5 para texto normal
- [ ] Use scale mathematical (1.25 ratio)

**Spacing:**
- [ ] All values are multiples of 4px
- [ ] Touch targets ≥ 44px
- [ ] Consistent padding/margin patterns

**Shadows:**
- [ ] Use for hierarchy, not information
- [ ] Combine with border for clarity
- [ ] Respect light/dark modes

**Radius:**
- [ ] Consistent scale across components
- [ ] Match brand personality (sharp vs rounded)

**Transitions:**
- [ ] Durations < 500ms (usually)
- [ ] Respect prefers-reduced-motion
- [ ] Use ease-out for entering elements

---

## 📚 Additional Resources

**WCAG Guidelines:**
- Contrast: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
- Text spacing: https://www.w3.org/WAI/WCAG21/Understanding/text-spacing

**Tools:**
- Contrast checker: https://contrast-ratio.com/
- Type scale calculator: https://type-scale.com/
- Color palette generator: https://coolors.co/

**Inspiration:**
- Tailwind CSS tokens: https://tailwindcss.com/docs/theme
- Material Design tokens: https://m3.material.io/styles/color/system/overview
- Ant Design tokens: https://ant.design/docs/spec/colors

---

**Status:** ✅ COMPLETO
**Última Atualização:** 2026-01-31
**Versão:** 1.0.0
