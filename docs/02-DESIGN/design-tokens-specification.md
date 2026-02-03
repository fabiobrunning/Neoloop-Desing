# Design Tokens Specification - Neoloop Design System

**Version:** 1.0.0
**Status:** Final
**Last Updated:** 2026-01-30

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography System](#typography-system)
3. [Spacing System](#spacing-system)
4. [Shadow System](#shadow-system)
5. [Border Radius System](#border-radius-system)
6. [Z-Index Scale](#z-index-scale)
7. [Animation & Transitions](#animation--transitions)
8. [Breakpoints](#breakpoints)
9. [Token Export Formats](#token-export-formats)

---

## 1. Color System

### 1.1 Grayscale Palette (Primary)

Escala de cinza do preto ao branco com 11 valores para máxima flexibilidade.

| Token Name | Hex Value | RGB | Usage |
|------------|-----------|-----|-------|
| `gray-950` | `#000000` | `0, 0, 0` | Text primary, headings |
| `gray-900` | `#1A1A1A` | `26, 26, 26` | Text secondary, dark backgrounds |
| `gray-800` | `#333333` | `51, 51, 51` | Text muted, icons |
| `gray-700` | `#4D4D4D` | `77, 77, 77` | Borders dark, disabled text |
| `gray-600` | `#666666` | `102, 102, 102` | Placeholders, subtle text |
| `gray-500` | `#808080` | `128, 128, 128` | Dividers, neutral elements |
| `gray-400` | `#999999` | `153, 153, 153` | Disabled states, faded elements |
| `gray-300` | `#B3B3B3` | `179, 179, 179` | Borders light, subtle dividers |
| `gray-200` | `#CCCCCC` | `204, 204, 204` | Backgrounds light, hover states |
| `gray-100` | `#E6E6E6` | `230, 230, 230` | Subtle backgrounds, cards |
| `gray-50` | `#F5F5F5` | `245, 245, 245` | Page backgrounds, very light |
| `white` | `#FFFFFF` | `255, 255, 255` | Pure white, text on dark |

**Contrast Ratios (vs white):**
- `gray-950`: 21:1 (AAA Large & Small)
- `gray-900`: 17.5:1 (AAA Large & Small)
- `gray-800`: 12.6:1 (AAA Large & Small)
- `gray-700`: 9.3:1 (AAA Large, AA Small)
- `gray-600`: 7.0:1 (AA Large & Small)

### 1.2 Semantic Color Palette

#### Primary (Brand Identity)
| Token Name | Hex Value | RGB | Usage |
|------------|-----------|-----|-------|
| `primary-950` | `#000000` | `0, 0, 0` | Primary CTA, brand elements |
| `primary-900` | `#1A1A1A` | `26, 26, 26` | Hover states |
| `primary-800` | `#333333` | `51, 51, 51` | Active states |
| `primary-100` | `#E6E6E6` | `230, 230, 230` | Light backgrounds |
| `primary-50` | `#F5F5F5` | `245, 245, 245` | Very light accents |

#### Success (Green Spectrum)
| Token Name | Hex Value | RGB | Usage |
|------------|-----------|-----|-------|
| `success-700` | `#047857` | `4, 120, 87` | Success messages, confirmations |
| `success-600` | `#059669` | `5, 150, 105` | Success states |
| `success-500` | `#10B981` | `16, 185, 129` | Success primary |
| `success-100` | `#D1FAE5` | `209, 250, 229` | Success backgrounds |
| `success-50` | `#ECFDF5` | `236, 253, 245` | Very light success |

**Contrast Ratios:**
- `success-700` vs white: 5.8:1 (AA)
- `success-600` vs white: 4.3:1 (AA Large)

#### Warning (Amber Spectrum)
| Token Name | Hex Value | RGB | Usage |
|------------|-----------|-----|-------|
| `warning-700` | `#B45309` | `180, 83, 9` | Warning messages |
| `warning-600` | `#D97706` | `217, 119, 6` | Warning states |
| `warning-500` | `#F59E0B` | `245, 158, 11` | Warning primary |
| `warning-100` | `#FEF3C7` | `254, 243, 199` | Warning backgrounds |
| `warning-50` | `#FFFBEB` | `255, 251, 235` | Very light warning |

**Contrast Ratios:**
- `warning-700` vs white: 5.2:1 (AA)
- `warning-600` vs white: 4.0:1 (AA Large)

#### Error (Red Spectrum)
| Token Name | Hex Value | RGB | Usage |
|------------|-----------|-----|-------|
| `error-700` | `#B91C1C` | `185, 28, 28` | Error messages, destructive actions |
| `error-600` | `#DC2626` | `220, 38, 38` | Error states |
| `error-500` | `#EF4444` | `239, 68, 68` | Error primary |
| `error-100` | `#FEE2E2` | `254, 226, 226` | Error backgrounds |
| `error-50` | `#FEF2F2` | `254, 242, 242` | Very light error |

**Contrast Ratios:**
- `error-700` vs white: 7.3:1 (AA)
- `error-600` vs white: 5.9:1 (AA)

#### Info (Blue Spectrum)
| Token Name | Hex Value | RGB | Usage |
|------------|-----------|-----|-------|
| `info-700` | `#1D4ED8` | `29, 78, 216` | Info messages |
| `info-600` | `#2563EB` | `37, 99, 235` | Info states |
| `info-500` | `#3B82F6` | `59, 130, 246` | Info primary |
| `info-100` | `#DBEAFE` | `219, 234, 254` | Info backgrounds |
| `info-50` | `#EFF6FF` | `239, 246, 255` | Very light info |

**Contrast Ratios:**
- `info-700` vs white: 8.2:1 (AAA)
- `info-600` vs white: 6.5:1 (AA)

### 1.3 Functional Color Tokens

Semantic tokens que referenciam cores da paleta:

```css
/* Text colors */
--color-text-primary: var(--gray-950);
--color-text-secondary: var(--gray-700);
--color-text-muted: var(--gray-600);
--color-text-disabled: var(--gray-400);
--color-text-inverse: var(--white);

/* Background colors */
--color-bg-primary: var(--white);
--color-bg-secondary: var(--gray-50);
--color-bg-tertiary: var(--gray-100);
--color-bg-inverse: var(--gray-950);

/* Border colors */
--color-border-default: var(--gray-300);
--color-border-strong: var(--gray-500);
--color-border-subtle: var(--gray-200);

/* Interactive colors */
--color-interactive-default: var(--primary-950);
--color-interactive-hover: var(--primary-900);
--color-interactive-active: var(--primary-800);
--color-interactive-disabled: var(--gray-400);

/* Feedback colors */
--color-feedback-success: var(--success-600);
--color-feedback-warning: var(--warning-600);
--color-feedback-error: var(--error-600);
--color-feedback-info: var(--info-600);

/* Focus colors */
--color-focus-ring: var(--info-500);
--color-focus-ring-offset: var(--white);
```

---

## 2. Typography System

### 2.1 Font Families

| Token Name | Font Stack | Usage |
|------------|------------|-------|
| `font-family-primary` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | UI text, body copy |
| `font-family-mono` | `'JetBrains Mono', 'Fira Code', 'Consolas', monospace` | Code, technical content |
| `font-family-serif` | `'Crimson Pro', 'Georgia', serif` | Editorial content (optional) |

**Font Loading Strategy:**
- Primary: Google Fonts (Inter) with font-display: swap
- Fallback: System fonts for instant rendering
- Mono: Optional, load only when needed

### 2.2 Font Sizes

Base: 16px (1rem)

| Token Name | rem | px | Usage |
|------------|-----|-----|-------|
| `text-xs` | `0.75rem` | `12px` | Captions, labels, badges |
| `text-sm` | `0.875rem` | `14px` | Small text, secondary info |
| `text-base` | `1rem` | `16px` | Body text, default |
| `text-lg` | `1.125rem` | `18px` | Lead paragraphs, emphasis |
| `text-xl` | `1.25rem` | `20px` | Small headings, titles |
| `text-2xl` | `1.5rem` | `24px` | Section headings (H3) |
| `text-3xl` | `2rem` | `32px` | Page headings (H2) |
| `text-4xl` | `2.5rem` | `40px` | Hero headings (H1) |

**Scale Ratio:** 1.125 (Major Second)

### 2.3 Font Weights

| Token Name | Value | Usage |
|------------|-------|-------|
| `font-weight-regular` | `400` | Body text, default |
| `font-weight-medium` | `500` | Emphasis, buttons |
| `font-weight-semibold` | `600` | Subheadings, strong emphasis |
| `font-weight-bold` | `700` | Headings, important elements |

**Inter Font Weights Available:** 400, 500, 600, 700

### 2.4 Line Heights

| Token Name | Value | Usage |
|------------|-------|-------|
| `line-height-tight` | `1.25` | Headings, titles (H1-H3) |
| `line-height-normal` | `1.5` | Body text, paragraphs |
| `line-height-relaxed` | `1.75` | Long-form content, articles |

**Accessibility:** Minimum 1.5 for body text (WCAG SC 1.4.12)

### 2.5 Letter Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `tracking-tight` | `-0.025em` | Large headings (H1) |
| `tracking-normal` | `0` | Default text |
| `tracking-wide` | `0.025em` | Uppercase labels, buttons |

### 2.6 Typography Presets

Combinações pré-definidas para uso rápido:

```css
/* Heading 1 */
--typo-h1-size: var(--text-4xl);
--typo-h1-weight: var(--font-weight-bold);
--typo-h1-line-height: var(--line-height-tight);
--typo-h1-tracking: var(--tracking-tight);

/* Heading 2 */
--typo-h2-size: var(--text-3xl);
--typo-h2-weight: var(--font-weight-bold);
--typo-h2-line-height: var(--line-height-tight);
--typo-h2-tracking: var(--tracking-normal);

/* Heading 3 */
--typo-h3-size: var(--text-2xl);
--typo-h3-weight: var(--font-weight-semibold);
--typo-h3-line-height: var(--line-height-tight);
--typo-h3-tracking: var(--tracking-normal);

/* Body */
--typo-body-size: var(--text-base);
--typo-body-weight: var(--font-weight-regular);
--typo-body-line-height: var(--line-height-normal);
--typo-body-tracking: var(--tracking-normal);

/* Caption */
--typo-caption-size: var(--text-sm);
--typo-caption-weight: var(--font-weight-regular);
--typo-caption-line-height: var(--line-height-normal);
--typo-caption-tracking: var(--tracking-normal);

/* Label */
--typo-label-size: var(--text-sm);
--typo-label-weight: var(--font-weight-medium);
--typo-label-line-height: var(--line-height-normal);
--typo-label-tracking: var(--tracking-wide);
```

---

## 3. Spacing System

### 3.1 Base Unit

**Base:** 4px (0.25rem)

Todos os espaçamentos são múltiplos de 4px para consistência pixel-perfect.

### 3.2 Spacing Scale

| Token Name | rem | px | Usage |
|------------|-----|-----|-------|
| `spacing-0` | `0` | `0px` | Reset, no spacing |
| `spacing-1` | `0.25rem` | `4px` | Very tight, icon padding |
| `spacing-2` | `0.5rem` | `8px` | Tight, small gaps |
| `spacing-3` | `0.75rem` | `12px` | Compact spacing |
| `spacing-4` | `1rem` | `16px` | Default spacing |
| `spacing-5` | `1.25rem` | `20px` | Medium spacing |
| `spacing-6` | `1.5rem` | `24px` | Comfortable spacing |
| `spacing-8` | `2rem` | `32px` | Large gaps |
| `spacing-10` | `2.5rem` | `40px` | Section spacing |
| `spacing-12` | `3rem` | `48px` | Large sections |
| `spacing-14` | `3.5rem` | `56px` | Very large spacing |
| `spacing-16` | `4rem` | `64px` | Hero spacing, page sections |

### 3.3 Semantic Spacing Tokens

```css
/* Component internal spacing */
--space-component-xs: var(--spacing-1); /* 4px */
--space-component-sm: var(--spacing-2); /* 8px */
--space-component-md: var(--spacing-4); /* 16px */
--space-component-lg: var(--spacing-6); /* 24px */

/* Layout spacing */
--space-layout-xs: var(--spacing-4);  /* 16px */
--space-layout-sm: var(--spacing-6);  /* 24px */
--space-layout-md: var(--spacing-8);  /* 32px */
--space-layout-lg: var(--spacing-12); /* 48px */
--space-layout-xl: var(--spacing-16); /* 64px */

/* Stack spacing (vertical gaps) */
--space-stack-xs: var(--spacing-2);  /* 8px */
--space-stack-sm: var(--spacing-4);  /* 16px */
--space-stack-md: var(--spacing-6);  /* 24px */
--space-stack-lg: var(--spacing-10); /* 40px */

/* Inline spacing (horizontal gaps) */
--space-inline-xs: var(--spacing-2); /* 8px */
--space-inline-sm: var(--spacing-3); /* 12px */
--space-inline-md: var(--spacing-4); /* 16px */
--space-inline-lg: var(--spacing-6); /* 24px */
```

---

## 4. Shadow System

### 4.1 Elevation Levels

Sistema de elevação com 6 níveis (e0-e5) seguindo Material Design principles.

| Token Name | CSS Value | Usage |
|------------|-----------|-------|
| `shadow-none` (e0) | `none` | Flat elements, no elevation |
| `shadow-sm` (e1) | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Subtle lift, cards at rest |
| `shadow-base` (e2) | `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)` | Default elevation, hover states |
| `shadow-md` (e3) | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` | Dropdowns, popovers |
| `shadow-lg` (e4) | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` | Modals, drawers |
| `shadow-xl` (e5) | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)` | Large modals, prominent overlays |

### 4.2 Specialized Shadows

```css
/* Focus ring shadow */
--shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.5);

/* Inner shadows */
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

/* Colored shadows (for states) */
--shadow-success: 0 0 0 3px rgba(16, 185, 129, 0.3);
--shadow-warning: 0 0 0 3px rgba(245, 158, 11, 0.3);
--shadow-error: 0 0 0 3px rgba(239, 68, 68, 0.3);
```

### 4.3 Shadow Usage Guidelines

**Elevation Hierarchy:**
- e0: Base layer (page background, flat cards)
- e1: Slight lift (resting cards, buttons)
- e2: Interactive elements (hover states)
- e3: Floating elements (dropdowns, tooltips)
- e4: Overlay elements (modals, dialogs)
- e5: Top layer (large modals, important notifications)

---

## 5. Border Radius System

### 5.1 Radius Scale

| Token Name | Value | px | Usage |
|------------|-------|-----|-------|
| `radius-none` | `0` | `0px` | Sharp corners, no rounding |
| `radius-sm` | `0.125rem` | `2px` | Subtle rounding, small elements |
| `radius-base` | `0.25rem` | `4px` | Default rounding, buttons |
| `radius-md` | `0.375rem` | `6px` | Medium rounding, inputs |
| `radius-lg` | `0.5rem` | `8px` | Cards, containers |
| `radius-xl` | `0.75rem` | `12px` | Large cards, modals |
| `radius-2xl` | `1rem` | `16px` | Hero elements, featured cards |
| `radius-3xl` | `1.5rem` | `24px` | Very large elements |
| `radius-full` | `9999px` | `∞` | Pills, circular elements |

### 5.2 Semantic Radius Tokens

```css
/* Component-specific */
--radius-button: var(--radius-base);     /* 4px */
--radius-input: var(--radius-md);        /* 6px */
--radius-card: var(--radius-lg);         /* 8px */
--radius-modal: var(--radius-xl);        /* 12px */
--radius-avatar: var(--radius-full);     /* circular */
--radius-badge: var(--radius-full);      /* pill shape */
--radius-tooltip: var(--radius-base);    /* 4px */
```

---

## 6. Z-Index Scale

### 6.1 Layering System

Escala sistemática para gerenciar sobreposição de elementos.

| Token Name | Value | Usage |
|------------|-------|-------|
| `z-base` | `0` | Default layer, base content |
| `z-dropdown` | `1000` | Dropdown menus, selects |
| `z-sticky` | `1100` | Sticky headers, navigation |
| `z-fixed` | `1200` | Fixed elements (sidebars) |
| `z-popover` | `1300` | Popovers, tooltips |
| `z-overlay` | `1400` | Modal backdrops, overlays |
| `z-modal` | `1500` | Modal dialogs |
| `z-toast` | `1600` | Notifications, toasts |
| `z-tooltip` | `1700` | Tooltips (above all) |

### 6.2 Usage Guidelines

**Stacking Rules:**
1. Use semantic tokens, não valores diretos
2. Elementos interativos sempre acima de conteúdo estático
3. Notificações e tooltips sempre no topo
4. Modals bloqueiam interação com `z-overlay` + `z-modal`

---

## 7. Animation & Transitions

### 7.1 Duration Tokens

| Token Name | Value | Usage |
|------------|-------|-------|
| `duration-instant` | `0ms` | No animation |
| `duration-fast` | `150ms` | Quick interactions (hover, focus) |
| `duration-base` | `300ms` | Default transitions |
| `duration-slow` | `500ms` | Complex animations, modals |
| `duration-slower` | `700ms` | Large movements, page transitions |

### 7.2 Easing Functions

| Token Name | Value | Usage |
|------------|-------|-------|
| `ease-linear` | `linear` | Constant speed |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerating (most common) |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth start & end |
| `ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful bounce |

### 7.3 Transition Presets

```css
/* Default transition for interactive elements */
--transition-default: all var(--duration-fast) var(--ease-out);

/* Color transitions */
--transition-colors: background-color var(--duration-fast) var(--ease-out),
                     color var(--duration-fast) var(--ease-out),
                     border-color var(--duration-fast) var(--ease-out);

/* Transform transitions */
--transition-transform: transform var(--duration-base) var(--ease-out);

/* Shadow transitions */
--transition-shadow: box-shadow var(--duration-base) var(--ease-out);

/* Opacity fade */
--transition-fade: opacity var(--duration-base) var(--ease-out);
```

### 7.4 Animation Guidelines

**Performance Rules:**
- Prefer `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `margin`, `padding`
- Use `will-change` sparingly for critical animations
- Respect `prefers-reduced-motion` media query

---

## 8. Breakpoints

### 8.1 Responsive Breakpoints

Mobile-first approach com 5 breakpoints.

| Token Name | Min Width | Target Devices |
|------------|-----------|----------------|
| `bp-xs` | `0px` | Small phones (default) |
| `bp-sm` | `640px` | Large phones, small tablets |
| `bp-md` | `768px` | Tablets, small laptops |
| `bp-lg` | `1024px` | Laptops, desktops |
| `bp-xl` | `1280px` | Large desktops |
| `bp-2xl` | `1536px` | Ultra-wide screens |

### 8.2 Container Max Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### 8.3 Media Query Usage

```css
/* Mobile-first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 9. Token Export Formats

### 9.1 CSS Variables Format

Arquivo completo: `design-tokens.css`

```css
:root {
  /* Colors - Grayscale */
  --gray-950: #000000;
  --gray-900: #1A1A1A;
  /* ... (all color tokens) */

  /* Typography */
  --font-family-primary: 'Inter', sans-serif;
  --text-xs: 0.75rem;
  /* ... (all typography tokens) */

  /* Spacing */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  /* ... (all spacing tokens) */

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  /* ... (all shadow tokens) */
}
```

### 9.2 JSON Format (for JavaScript)

Arquivo: `design-tokens.json`

```json
{
  "color": {
    "gray": {
      "950": { "value": "#000000", "type": "color" },
      "900": { "value": "#1A1A1A", "type": "color" }
    },
    "primary": {
      "950": { "value": "#000000", "type": "color" }
    }
  },
  "typography": {
    "fontFamily": {
      "primary": { "value": "'Inter', sans-serif", "type": "fontFamily" }
    },
    "fontSize": {
      "xs": { "value": "0.75rem", "type": "fontSize" }
    }
  },
  "spacing": {
    "0": { "value": "0", "type": "spacing" },
    "1": { "value": "0.25rem", "type": "spacing" }
  }
}
```

### 9.3 TypeScript Types

Arquivo: `design-tokens.types.ts`

```typescript
export type ColorToken =
  | 'gray-950' | 'gray-900' | 'gray-800'
  | 'primary-950' | 'primary-900'
  | 'success-700' | 'success-600'
  | 'warning-700' | 'warning-600'
  | 'error-700' | 'error-600'
  | 'info-700' | 'info-600';

export type SpacingToken =
  | 'spacing-0' | 'spacing-1' | 'spacing-2' | 'spacing-3'
  | 'spacing-4' | 'spacing-5' | 'spacing-6' | 'spacing-8'
  | 'spacing-10' | 'spacing-12' | 'spacing-14' | 'spacing-16';

export type FontSizeToken =
  | 'text-xs' | 'text-sm' | 'text-base' | 'text-lg'
  | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl';

export type ShadowToken =
  | 'shadow-none' | 'shadow-sm' | 'shadow-base'
  | 'shadow-md' | 'shadow-lg' | 'shadow-xl';
```

### 9.4 Figma Tokens Format

Arquivo: `figma-tokens.json` (compatível com Figma Tokens plugin)

```json
{
  "global": {
    "color": {
      "gray": {
        "950": { "value": "#000000", "type": "color" }
      }
    },
    "spacing": {
      "0": { "value": "0", "type": "spacing" },
      "1": { "value": "4", "type": "spacing" }
    },
    "borderRadius": {
      "sm": { "value": "2", "type": "borderRadius" }
    }
  }
}
```

---

## Token Usage Examples

### Example 1: Button Component

```css
.button {
  /* Typography */
  font-family: var(--font-family-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);

  /* Spacing */
  padding: var(--spacing-3) var(--spacing-6);

  /* Colors */
  background-color: var(--color-interactive-default);
  color: var(--color-text-inverse);

  /* Border */
  border-radius: var(--radius-button);

  /* Shadow */
  box-shadow: var(--shadow-sm);

  /* Transition */
  transition: var(--transition-colors), var(--transition-shadow);
}

.button:hover {
  background-color: var(--color-interactive-hover);
  box-shadow: var(--shadow-base);
}
```

### Example 2: Card Component

```css
.card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-card);
  padding: var(--space-component-lg);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-shadow);
}

.card:hover {
  box-shadow: var(--shadow-md);
}
```

---

## Changelog

**v1.0.0 (2026-01-30)**
- Initial design tokens specification
- Complete color system with semantic tokens
- Typography scale and presets
- Spacing system with 4px grid
- Shadow elevation system (e0-e5)
- Border radius scale
- Z-index layering system
- Animation and transition tokens
- Responsive breakpoints
- Multiple export formats (CSS, JSON, TypeScript, Figma)
