# Phase 1: Architecture Foundation
**Project:** Neoloop Design System Builder
**Phase:** 1 - Foundation (Weeks 1-2)
**Date:** 2026-01-30
**Architect:** @architect
**Status:** Complete Specification

---

## TABLE OF CONTENTS

1. [Design Token System Architecture](#1-design-token-system-architecture)
2. [Component Architecture Specification](#2-component-architecture-specification)
3. [Tech Stack Finalization](#3-tech-stack-finalization)
4. [Architecture Decision Records](#4-architecture-decision-records)
5. [Performance Baseline](#5-performance-baseline)
6. [Implementation Roadmap](#6-implementation-roadmap)

---

## 1. DESIGN TOKEN SYSTEM ARCHITECTURE

### 1.1 Token Structure Overview

```
Design Tokens
├── Primitive Tokens (Foundation)
│   ├── Colors (palette)
│   ├── Typography (raw values)
│   ├── Spacing (base units)
│   ├── Shadows (elevation)
│   ├── Border Radius (rounding)
│   └── Animation (timing, easing)
│
├── Semantic Tokens (Contextual)
│   ├── Colors (primary, secondary, success, etc.)
│   ├── Typography (heading, body, caption)
│   └── Spacing (container, section, element)
│
└── Component Tokens (Specific)
    ├── Button tokens
    ├── Card tokens
    ├── Form tokens
    └── ...79 components
```

---

### 1.2 Color Tokens Architecture

```typescript
// src/tokens/colors.ts

export interface ColorToken {
  id: string
  name: string
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  category: ColorCategory
  tone: number // 50-900
  contrast: {
    white: number // WCAG contrast ratio
    black: number
    aa: boolean   // Passes WCAG AA (4.5:1)
    aaa: boolean  // Passes WCAG AAA (7:1)
  }
}

export type ColorCategory =
  | 'red-pink'
  | 'orange-yellow'
  | 'green'
  | 'teal-cyan'
  | 'blue-indigo'
  | 'purple-violet'
  | 'neutral'

export interface ColorPalette {
  categories: Record<ColorCategory, ColorToken[]>
  semantic: {
    primary: ColorToken[]     // User-selected primary color (50-900)
    secondary: ColorToken[]   // User-selected secondary
    tertiary: ColorToken[]    // Optional tertiary
    success: ColorToken[]     // Success states
    warning: ColorToken[]     // Warning states
    error: ColorToken[]       // Error states
    info: ColorToken[]        // Info states
  }
}

// Structure: 7 columns × 10 tones = 70 colors
// Each tone: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
export const colorPalette: ColorPalette = {
  categories: {
    'red-pink': [
      { id: 'red-50', name: 'Rose Quartz', hex: '#FFF5F5', tone: 50, /* ... */ },
      { id: 'red-100', name: 'Blush', hex: '#FED7D7', tone: 100, /* ... */ },
      // ...10 colors total
    ],
    'orange-yellow': [
      { id: 'orange-50', name: 'Cream', hex: '#FFFAF0', tone: 50, /* ... */ },
      // ...10 colors
    ],
    'green': [
      { id: 'green-50', name: 'Mint', hex: '#F0FFF4', tone: 50, /* ... */ },
      // ...10 colors
    ],
    'teal-cyan': [
      { id: 'teal-50', name: 'Sky', hex: '#E6FFFA', tone: 50, /* ... */ },
      // ...10 colors
    ],
    'blue-indigo': [
      { id: 'blue-50', name: 'Ice', hex: '#EBF8FF', tone: 50, /* ... */ },
      // ...10 colors
    ],
    'purple-violet': [
      { id: 'purple-50', name: 'Lavender', hex: '#FAF5FF', tone: 50, /* ... */ },
      // ...10 colors
    ],
    'neutral': [
      { id: 'gray-50', name: 'White Smoke', hex: '#FAFAFA', tone: 50, /* ... */ },
      { id: 'gray-100', name: 'Light Gray', hex: '#F5F5F5', tone: 100, /* ... */ },
      // ...10 colors from white to black
    ],
  },
  semantic: {
    // Populated when user selects colors
    primary: [],
    secondary: [],
    tertiary: [],
    success: [],
    warning: [],
    error: [],
    info: [],
  }
}

// CSS Variables Export
export function generateColorCSS(palette: ColorPalette): string {
  return `
:root {
  /* Primitive Colors - Red/Pink */
  --color-red-50: #FFF5F5;
  --color-red-100: #FED7D7;
  /* ...all 70 colors */

  /* Semantic Colors (dynamic based on user selection) */
  --color-primary-50: var(--color-blue-50);
  --color-primary-500: var(--color-blue-500);
  --color-primary-900: var(--color-blue-900);

  --color-secondary-50: var(--color-purple-50);
  --color-secondary-500: var(--color-purple-500);
  --color-secondary-900: var(--color-purple-900);

  /* State Colors */
  --color-success: var(--color-green-500);
  --color-warning: var(--color-orange-500);
  --color-error: var(--color-red-500);
  --color-info: var(--color-blue-500);

  /* Surface Colors */
  --color-background: var(--color-gray-50);
  --color-surface: #FFFFFF;
  --color-surface-elevated: var(--color-gray-100);

  /* Text Colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-disabled: var(--color-gray-400);
}

[data-theme="dark"] {
  --color-background: var(--color-gray-900);
  --color-surface: var(--color-gray-800);
  --color-surface-elevated: var(--color-gray-700);
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-300);
  --color-text-disabled: var(--color-gray-600);
}
`
}
```

---

### 1.3 Typography Tokens Architecture

```typescript
// src/tokens/typography.ts

export interface FontFamily {
  id: string
  name: string
  category: 'sans-serif' | 'serif' | 'monospace'
  googleFontsName: string
  fallback: string
  variants: FontVariant[]
  previewText: string
}

export interface FontVariant {
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  style: 'normal' | 'italic'
  display: string // "Light", "Regular", "Bold", etc.
}

export interface TypographyScale {
  xs: { fontSize: string; lineHeight: string }
  sm: { fontSize: string; lineHeight: string }
  base: { fontSize: string; lineHeight: string }
  lg: { fontSize: string; lineHeight: string }
  xl: { fontSize: string; lineHeight: string }
  '2xl': { fontSize: string; lineHeight: string }
  '3xl': { fontSize: string; lineHeight: string }
  '4xl': { fontSize: string; lineHeight: string }
  '5xl': { fontSize: string; lineHeight: string }
  '6xl': { fontSize: string; lineHeight: string }
}

export const fontFamilies: FontFamily[] = [
  {
    id: 'neue-einstellung',
    name: 'Neue Einstellung',
    category: 'sans-serif',
    googleFontsName: 'Inter', // Similar alternative
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    variants: [
      { weight: 300, style: 'normal', display: 'Light' },
      { weight: 400, style: 'normal', display: 'Regular' },
      { weight: 500, style: 'normal', display: 'Medium' },
      { weight: 700, style: 'normal', display: 'Bold' },
      { weight: 400, style: 'italic', display: 'Italic' },
    ],
    previewText: 'Neoloop'
  },
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    category: 'serif',
    googleFontsName: 'Playfair Display',
    fallback: 'Georgia, "Times New Roman", serif',
    variants: [
      { weight: 400, style: 'normal', display: 'Regular' },
      { weight: 500, style: 'normal', display: 'Medium' },
      { weight: 700, style: 'normal', display: 'Bold' },
      { weight: 900, style: 'normal', display: 'Black' },
      { weight: 400, style: 'italic', display: 'Italic' },
    ],
    previewText: 'Neoloop'
  },
  // ... 6 more font families
]

export const typographyScale: TypographyScale = {
  xs: { fontSize: '0.75rem', lineHeight: '1rem' },      // 12px/16px
  sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },  // 14px/20px
  base: { fontSize: '1rem', lineHeight: '1.5rem' },     // 16px/24px
  lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },  // 18px/28px
  xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },   // 20px/28px
  '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },    // 24px/32px
  '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' }, // 30px/36px
  '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' }, // 36px/40px
  '5xl': { fontSize: '3rem', lineHeight: '1' },         // 48px
  '6xl': { fontSize: '3.75rem', lineHeight: '1' },      // 60px
}

// Font Weight Scale
export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

// Letter Spacing
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

// CSS Variables Export
export function generateTypographyCSS(): string {
  return `
:root {
  /* Font Families */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-serif: 'Playfair Display', Georgia, serif;
  --font-family-mono: 'Roboto Mono', 'Courier New', monospace;

  /* Font Sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;

  /* Line Heights */
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Font Weights */
  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  /* Letter Spacing */
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}
`
}
```

---

### 1.4 Spacing Tokens Architecture

```typescript
// src/tokens/spacing.ts

export interface SpacingScale {
  0: string
  0.5: string
  1: string
  1.5: string
  2: string
  2.5: string
  3: string
  3.5: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
  10: string
  11: string
  12: string
  14: string
  16: string
  20: string
  24: string
  28: string
  32: string
  36: string
  40: string
  44: string
  48: string
  52: string
  56: string
  60: string
  64: string
  72: string
  80: string
  96: string
}

// 4px base system
export const spacingScale: SpacingScale = {
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
}

export function generateSpacingCSS(): string {
  return `
:root {
  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-0_5: 0.125rem;
  --spacing-1: 0.25rem;
  --spacing-1_5: 0.375rem;
  --spacing-2: 0.5rem;
  --spacing-2_5: 0.625rem;
  --spacing-3: 0.75rem;
  --spacing-3_5: 0.875rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-8: 2rem;
  --spacing-9: 2.25rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;
  --spacing-40: 10rem;
  --spacing-48: 12rem;
  --spacing-56: 14rem;
  --spacing-64: 16rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;
}
`
}
```

---

### 1.5 Shadow Tokens Architecture

```typescript
// src/tokens/shadows.ts

export interface ShadowToken {
  id: string
  name: string
  value: string
  description: string
  elevation: number // 0-6
}

export const shadowTokens: ShadowToken[] = [
  {
    id: 'shadow-xs',
    name: 'Extra Small',
    value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    description: 'Subtle shadow for minimal elevation',
    elevation: 1
  },
  {
    id: 'shadow-sm',
    name: 'Small',
    value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    description: 'Small shadow for cards and buttons',
    elevation: 2
  },
  {
    id: 'shadow-md',
    name: 'Medium',
    value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    description: 'Medium shadow for elevated elements',
    elevation: 3
  },
  {
    id: 'shadow-lg',
    name: 'Large',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    description: 'Large shadow for prominent elements',
    elevation: 4
  },
  {
    id: 'shadow-xl',
    name: 'Extra Large',
    value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    description: 'Extra large shadow for modals',
    elevation: 5
  },
  {
    id: 'shadow-2xl',
    name: '2X Large',
    value: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    description: 'Maximum shadow for overlays',
    elevation: 6
  },
  {
    id: 'shadow-inner',
    name: 'Inner',
    value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    description: 'Inset shadow for pressed states',
    elevation: 0
  },
]

export function generateShadowCSS(): string {
  return `
:root {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --shadow-none: 0 0 #0000;
}
`
}
```

---

### 1.6 Border Radius Tokens Architecture

```typescript
// src/tokens/radius.ts

export interface RadiusToken {
  id: string
  name: string
  value: string
  pixels: number
}

export const radiusTokens: RadiusToken[] = [
  { id: 'radius-none', name: 'None', value: '0', pixels: 0 },
  { id: 'radius-sm', name: 'Small', value: '0.125rem', pixels: 2 },
  { id: 'radius-base', name: 'Base', value: '0.25rem', pixels: 4 },
  { id: 'radius-md', name: 'Medium', value: '0.375rem', pixels: 6 },
  { id: 'radius-lg', name: 'Large', value: '0.5rem', pixels: 8 },
  { id: 'radius-xl', name: 'Extra Large', value: '0.75rem', pixels: 12 },
  { id: 'radius-2xl', name: '2X Large', value: '1rem', pixels: 16 },
  { id: 'radius-3xl', name: '3X Large', value: '1.5rem', pixels: 24 },
  { id: 'radius-full', name: 'Full', value: '9999px', pixels: 9999 },
]

export function generateRadiusCSS(): string {
  return `
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
}
`
}
```

---

### 1.7 Animation Tokens Architecture

```typescript
// src/tokens/animations.ts

export interface AnimationToken {
  id: string
  name: string
  duration: number // milliseconds
  timingFunction: string
  description: string
}

export const animationDurations = {
  'instant': 0,
  'fast': 100,
  'base': 200,
  'slow': 300,
  'slower': 500,
  'slowest': 700,
}

export const animationEasing = {
  'linear': 'linear',
  'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}

export function generateAnimationCSS(): string {
  return `
:root {
  /* Durations */
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --duration-slowest: 700ms;

  /* Easing Functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Common Transitions */
  --transition-base: var(--duration-base) var(--ease-in-out);
  --transition-fast: var(--duration-fast) var(--ease-in-out);
  --transition-slow: var(--duration-slow) var(--ease-in-out);
}
`
}
```

---

### 1.8 Z-Index Tokens Architecture

```typescript
// src/tokens/zIndex.ts

export const zIndexLayers = {
  'base': 0,
  'dropdown': 1000,
  'sticky': 1020,
  'fixed': 1030,
  'modal-backdrop': 1040,
  'modal': 1050,
  'popover': 1060,
  'tooltip': 1070,
  'notification': 1080,
}

export function generateZIndexCSS(): string {
  return `
:root {
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-notification: 1080;
}
`
}
```

---

## 2. COMPONENT ARCHITECTURE SPECIFICATION

### 2.1 Component Directory Structure

```
src/
├── components/
│   ├── primitives/         # Atomic components (79 total)
│   │   ├── buttons/
│   │   │   ├── Button.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── ButtonGroup.tsx
│   │   │   └── Button.types.ts
│   │   ├── forms/
│   │   │   ├── Input.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Switch.tsx
│   │   │   ├── Slider.tsx
│   │   │   └── forms.types.ts
│   │   ├── cards/
│   │   │   ├── Card.tsx
│   │   │   ├── CardHeader.tsx
│   │   │   ├── CardBody.tsx
│   │   │   ├── CardFooter.tsx
│   │   │   └── Card.types.ts
│   │   ├── feedback/
│   │   │   ├── Alert.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── feedback.types.ts
│   │   ├── navigation/
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Stepper.tsx
│   │   │   └── navigation.types.ts
│   │   ├── overlays/
│   │   │   ├── Modal.tsx
│   │   │   ├── Drawer.tsx
│   │   │   ├── Popover.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   └── overlays.types.ts
│   │   ├── layout/
│   │   │   ├── Container.tsx
│   │   │   ├── Grid.tsx
│   │   │   ├── Stack.tsx
│   │   │   ├── Divider.tsx
│   │   │   └── layout.types.ts
│   │   ├── typography/
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Code.tsx
│   │   │   └── typography.types.ts
│   │   └── data-display/
│   │       ├── Table.tsx
│   │       ├── Avatar.tsx
│   │       ├── Tag.tsx
│   │       ├── Stat.tsx
│   │       └── data-display.types.ts
│   │
│   ├── patterns/           # Composite components
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── LoginForm.tsx
│   │   ├── SearchBar.tsx
│   │   └── patterns.types.ts
│   │
│   └── views/              # Feature-specific views
│       ├── ColorSelector.tsx
│       ├── TypographySelector.tsx
│       ├── IconSelector.tsx
│       └── views.types.ts
│
├── tokens/                 # Design tokens
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   ├── radius.ts
│   ├── animations.ts
│   ├── zIndex.ts
│   └── index.ts
│
├── hooks/                  # Custom React hooks
│   ├── useTheme.ts
│   ├── useMediaQuery.ts
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── hooks.types.ts
│
├── utils/                  # Utility functions
│   ├── cn.ts              # classNames utility (clsx + tailwind-merge)
│   ├── color.ts           # Color manipulation
│   ├── contrast.ts        # WCAG contrast calculation
│   └── export.ts          # JSON/CSS export
│
├── types/                  # TypeScript types
│   ├── tokens.ts
│   ├── components.ts
│   └── index.ts
│
└── styles/                 # Global styles
    ├── globals.css
    ├── tokens.css
    └── reset.css
```

---

### 2.2 Component API Patterns

#### 2.2.1 Base Component Interface

```typescript
// src/types/components.ts

import { ReactNode, HTMLAttributes } from 'react'

export interface BaseComponentProps extends HTMLAttributes<HTMLElement> {
  /** Child elements */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Test ID for testing */
  testId?: string
  /** Accessibility label */
  ariaLabel?: string
}

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'
export type ComponentState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading'
```

---

#### 2.2.2 Button Component API

```typescript
// src/components/primitives/buttons/Button.types.ts

import { BaseComponentProps, ComponentSize, ComponentVariant } from '@/types/components'
import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: ComponentVariant
  /** Size of the button */
  size?: ComponentSize
  /** Full width button */
  fullWidth?: boolean
  /** Loading state */
  isLoading?: boolean
  /** Disabled state */
  isDisabled?: boolean
  /** Icon on the left */
  leftIcon?: React.ReactNode
  /** Icon on the right */
  rightIcon?: React.ReactNode
  /** Icon only mode */
  iconOnly?: boolean
}

// src/components/primitives/buttons/Button.tsx
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import { ButtonProps } from './Button.types'

const buttonVariants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
  outline: 'border-2 border-gray-300 bg-transparent hover:bg-gray-50',
  ghost: 'bg-transparent hover:bg-gray-100',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  link: 'bg-transparent text-primary-500 hover:underline',
}

const buttonSizes = {
  xs: 'h-6 px-2 text-xs',
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
  xl: 'h-14 px-8 text-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      className,
      testId,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled || isLoading}
        aria-label={ariaLabel}
        data-testid={testId}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-medium rounded-md',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && 'w-full',
          iconOnly && 'aspect-square p-0',
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size={size} />}
        {leftIcon && !isLoading && <span className="inline-flex">{leftIcon}</span>}
        {!iconOnly && children}
        {rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

---

#### 2.2.3 Composition Pattern Example

```typescript
// src/components/primitives/cards/Card.tsx

import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types/components'

export interface CardProps extends BaseComponentProps {
  variant?: 'elevated' | 'outlined' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'elevated', padding = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          variant === 'elevated' && 'shadow-md bg-white',
          variant === 'outlined' && 'border-2 border-gray-200 bg-white',
          variant === 'flat' && 'bg-gray-50',
          padding === 'sm' && 'p-3',
          padding === 'md' && 'p-4',
          padding === 'lg' && 'p-6',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const CardHeader = forwardRef<HTMLDivElement, BaseComponentProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('border-b border-gray-200 pb-3 mb-3', className)} {...props}>
      {children}
    </div>
  )
)

export const CardBody = forwardRef<HTMLDivElement, BaseComponentProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1', className)} {...props}>
      {children}
    </div>
  )
)

export const CardFooter = forwardRef<HTMLDivElement, BaseComponentProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('border-t border-gray-200 pt-3 mt-3', className)} {...props}>
      {children}
    </div>
  )
)

// Usage:
<Card variant="elevated">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### 2.3 Variant System Design

```typescript
// src/utils/variants.ts

/**
 * CVA-like variant system for component styling
 * Inspired by class-variance-authority but simplified
 */

type VariantConfig<T> = {
  variants: {
    [key: string]: {
      [value: string]: string
    }
  }
  defaultVariants?: Partial<T>
  compoundVariants?: Array<{
    [K in keyof T]?: T[K]
  } & {
    className: string
  }>
}

export function createVariants<T extends Record<string, any>>(
  base: string,
  config: VariantConfig<T>
) {
  return (props: T) => {
    const { variants, defaultVariants = {}, compoundVariants = [] } = config

    // Start with base classes
    const classes = [base]

    // Apply variant classes
    Object.entries(props).forEach(([key, value]) => {
      if (variants[key] && variants[key][value]) {
        classes.push(variants[key][value])
      }
    })

    // Apply default variants if not provided
    Object.entries(defaultVariants).forEach(([key, value]) => {
      if (!(key in props) && variants[key] && variants[key][value as string]) {
        classes.push(variants[key][value as string])
      }
    })

    // Apply compound variants
    compoundVariants.forEach((compoundVariant) => {
      const { className, ...conditions } = compoundVariant
      const matches = Object.entries(conditions).every(
        ([key, value]) => props[key] === value
      )
      if (matches) {
        classes.push(className)
      }
    })

    return cn(...classes)
  }
}

// Usage Example:
const buttonVariants = createVariants<{
  variant: 'primary' | 'secondary' | 'outline'
  size: 'sm' | 'md' | 'lg'
  fullWidth: boolean
}>('inline-flex items-center justify-center rounded-md font-medium transition-colors', {
  variants: {
    variant: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
      outline: 'border-2 border-gray-300 bg-transparent hover:bg-gray-50',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
  compoundVariants: [
    {
      variant: 'primary',
      size: 'lg',
      className: 'shadow-lg',
    },
  ],
})
```

---

## 3. TECH STACK FINALIZATION

### 3.1 Core Dependencies

```json
{
  "name": "neoloop-design-system",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\"",
    "prepare": "husky install"
  },
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "lucide-react": "^0.563.0",
    "recharts": "^3.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/node": "^22.14.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.5.6",
    "autoprefixer": "^10.4.23",
    "vitest": "^2.0.0",
    "@vitest/ui": "^2.0.0",
    "eslint": "^9.0.0",
    "eslint-config-prettier": "^10.0.0",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-jsx-a11y": "^6.10.0",
    "prettier": "^3.4.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.2.0"
  }
}
```

---

### 3.2 TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "skipLibCheck": true,

    /* Strict Type Checking */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Advanced Checks */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,

    /* Module Resolution */
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,

    /* Emit */
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,
    "noEmit": true,

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@tokens/*": ["src/tokens/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

### 3.3 Tailwind CSS v4 Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Will be populated dynamically from design tokens
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          // ... same structure
        },
      },
      spacing: {
        // Design token spacing
      },
      fontSize: {
        // Design token typography
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        base: 'var(--radius-base)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
        slowest: 'var(--duration-slowest)',
      },
      transitionTimingFunction: {
        'ease-in': 'var(--ease-in)',
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
        'bounce': 'var(--ease-bounce)',
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
        notification: 'var(--z-notification)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

### 3.4 ESLint Configuration

```javascript
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
    },
  }
)
```

---

### 3.5 Vitest Setup

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.types.ts',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@tokens': path.resolve(__dirname, './src/tokens'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
})
```

---

## 4. ARCHITECTURE DECISION RECORDS

### ADR-001: Why Tailwind CSS v4

**Context:**
Need a CSS solution for a design system builder that exports tokens and components.

**Decision:**
Use Tailwind CSS v4 with CSS Variables for design tokens.

**Rationale:**
- Utility-first approach aligns with component-based architecture
- JIT compiler ensures fast builds
- CSS Variables enable runtime theming (light/dark mode)
- Easy export: users get both Tailwind config AND CSS variables
- v4 has improved type safety and better DX
- Large ecosystem and excellent documentation

**Consequences:**
- Positive: Fast development, small bundle size, easy token export
- Positive: Built-in responsive design utilities
- Positive: Excellent TypeScript support
- Negative: Learning curve for team members unfamiliar with Tailwind
- Negative: Can lead to verbose className strings (mitigated by cn utility)

**Alternatives Considered:**
- CSS Modules: More verbose, harder to theme dynamically
- Styled Components: Runtime overhead, harder to export
- Vanilla CSS: Too much boilerplate, no type safety

**Status:** Accepted

---

### ADR-002: Token Organization Strategy

**Context:**
Design tokens need to be organized for both internal use and export.

**Decision:**
Three-layer token system: Primitive → Semantic → Component

**Rationale:**
- **Primitive tokens** (raw values): Reusable across projects
- **Semantic tokens** (contextual): Provide meaning (primary, success, etc.)
- **Component tokens** (specific): Scoped to individual components

Example:
```
Primitive:  --color-blue-500: #3B82F6
Semantic:   --color-primary: var(--color-blue-500)
Component:  --button-bg-primary: var(--color-primary)
```

**Consequences:**
- Positive: Clear hierarchy, easy to understand
- Positive: Flexible: change semantic tokens without touching primitives
- Positive: Export-friendly: users can choose their own semantic mapping
- Negative: More files to maintain
- Negative: Indirection can be confusing initially

**Status:** Accepted

---

### ADR-003: Component Composition Pattern

**Context:**
Need a scalable pattern for 79+ components.

**Decision:**
Adopt Radix UI-inspired composition pattern with forwardRef and compound components.

**Pattern:**
```typescript
<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

**Rationale:**
- Flexibility: Users compose components as needed
- Accessibility: Built-in ARIA attributes
- Type Safety: TypeScript ensures correct usage
- Tree-shakable: Only import what you use
- Testable: Each sub-component is independently testable

**Consequences:**
- Positive: Maximum flexibility for users
- Positive: Small bundle size (tree-shaking)
- Positive: Accessible by default
- Negative: More complex API than monolithic components
- Negative: Requires good documentation

**Alternatives Considered:**
- Monolithic components (one prop for everything): Less flexible
- Renderless components: Too low-level for design system

**Status:** Accepted

---

## 5. PERFORMANCE BASELINE

### 5.1 Bundle Size Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Initial JS Bundle** | < 150 KB | Gzipped main bundle |
| **Initial CSS Bundle** | < 30 KB | Gzipped global CSS + tokens |
| **Total Initial Load** | < 180 KB | JS + CSS combined |
| **Lazy-loaded chunks** | < 50 KB each | Component modules |
| **Vendor bundle** | < 100 KB | React + deps |

**Strategy:**
- Code splitting by route/view
- Lazy load components on demand
- Tree-shake unused utilities
- Minify and compress assets

---

### 5.2 Lighthouse Targets

| Category | Score | Priority |
|----------|-------|----------|
| **Performance** | ≥ 90 | Critical |
| **Accessibility** | ≥ 95 | Critical |
| **Best Practices** | ≥ 90 | High |
| **SEO** | ≥ 90 | Medium |

**Key Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

---

### 5.3 Storybook Performance Targets

| Metric | Target |
|--------|--------|
| **Story load time** | < 200ms per story |
| **Build time** | < 30s full build |
| **Hot reload time** | < 500ms |
| **Bundle size** | < 2 MB total |

---

## 6. IMPLEMENTATION ROADMAP

### Week 1: Foundation Setup

#### Day 1-2: Project Structure
- [ ] Create `src/tokens/` with all token files
- [ ] Create `src/components/primitives/` structure
- [ ] Set up TypeScript path aliases
- [ ] Configure Tailwind CSS v4
- [ ] Set up ESLint + Prettier + Husky

#### Day 3-4: Design Tokens Implementation
- [ ] Implement color tokens (70 colors)
- [ ] Implement typography tokens (8 fonts)
- [ ] Implement spacing tokens (4px system)
- [ ] Implement shadow tokens (7 elevations)
- [ ] Implement radius tokens (9 values)
- [ ] Implement animation tokens
- [ ] Implement z-index tokens
- [ ] Generate CSS variables export

#### Day 5: Testing Setup
- [ ] Configure Vitest
- [ ] Set up React Testing Library
- [ ] Create test utilities
- [ ] Write first unit tests

---

### Week 2: Core Components

#### Day 1-2: Primitive Components (Batch 1)
- [ ] Button (all variants)
- [ ] IconButton
- [ ] ButtonGroup
- [ ] Input
- [ ] TextArea
- [ ] Select

#### Day 3-4: Primitive Components (Batch 2)
- [ ] Card + sub-components
- [ ] Alert
- [ ] Badge
- [ ] Toast
- [ ] Progress
- [ ] Spinner

#### Day 5: Documentation
- [ ] Component API docs
- [ ] Usage examples
- [ ] Performance audit
- [ ] Create ADRs

---

### Success Criteria

**Phase 1 Complete When:**
- [ ] All 7 design token categories implemented
- [ ] CSS Variables export functional
- [ ] 12+ primitive components built
- [ ] TypeScript strict mode with 0 errors
- [ ] ESLint + Prettier configured
- [ ] Vitest setup with 70% coverage goal
- [ ] All ADRs documented
- [ ] Performance targets defined
- [ ] Tailwind CSS v4 integrated
- [ ] Component architecture validated

---

## APPENDIX

### A. Utility Functions

```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// src/utils/contrast.ts
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val /= 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function meetsWCAGAA(hex1: string, hex2: string): boolean {
  return getContrastRatio(hex1, hex2) >= 4.5
}

export function meetsWCAGAAA(hex1: string, hex2: string): boolean {
  return getContrastRatio(hex1, hex2) >= 7
}

// src/utils/color.ts
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}
```

---

**Document Status:** Complete
**Next Steps:** Begin Week 1 implementation
**Review Date:** End of Week 2

---

*This architecture foundation document serves as the blueprint for Phase 1 development.*
