# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Synkra DS** is a React component library (npm: `synkra-ds`) built with Atomic Design, Radix UI primitives, Tailwind CSS v4, and TypeScript strict mode. It ships ESM + CJS + DTS via tsup.

## Commands

```bash
npm run dev              # Storybook on localhost:6006
npm run build            # Build library (tsup → dist/)
npm run lint             # ESLint (flat config v9)
npm run typecheck        # tsc --noEmit
npm run test             # Vitest (all tests, single run)
npm run test:watch       # Vitest watch mode
npm run test:coverage    # Coverage with 90% threshold (branches/functions/lines/statements)
npm run build-storybook  # Static Storybook build
```

Run a single test file:
```bash
npx vitest run src/atoms/button/Button.test.tsx
```

## Architecture

### Atomic Design Layers

Components are organized in strict Atomic Design hierarchy under `src/`:

- **`atoms/`** — Primitive building blocks (Button, Input, Checkbox, Badge, Select, etc.)
- **`molecules/`** — Composed atoms (FormField, Tabs, Tooltip, Accordion, DropdownMenu, etc.)
- **`organisms/`** — Complex UI sections (Sidebar, LoginForm, DataTable, Dialog, Sheet, Toast, etc.)
- **`templates/`** — Page layouts (AuthLayout, DashboardLayout, SettingsPage, ErrorPage)

Each component follows the same file structure:
```
ComponentName/
├── ComponentName.tsx         # Implementation
├── ComponentName.test.tsx    # Tests
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                  # Named exports
```

### Key Patterns

**Component pattern**: All components use `React.forwardRef`, accept `className` merged via `cn()`, and expose typed props extending HTML attributes + CVA `VariantProps`.

**Variant system**: `class-variance-authority` (CVA) defines type-safe variants. Example:
```typescript
const buttonVariants = cva(baseStyles, {
  variants: { variant: { primary, secondary, ... }, size: { sm, md, lg } },
  defaultVariants: { variant: "primary", size: "md" }
});
```

**Radix composition**: Components built on Radix use the `asChild` prop (via `@radix-ui/react-slot`) for render delegation.

**Class merging**: Always use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for className composition.

### Design Tokens

`src/tokens/index.ts` exports 170+ tokens (colors, typography, spacing, radius, shadows, motion, z-index, breakpoints). Tokens are also available as CSS custom properties in `src/tokens/tokens.css`.

### Theming

`src/theme/ThemeProvider.tsx` provides dark/light/system theme via React Context. Dark is the default. Themes toggle the `light` class on `<html>` and persist to localStorage.

### Tailwind CSS v4

Uses CSS-first configuration via `@theme` directive in `src/styles/globals.css`. No `tailwind.config.js` — all custom values (colors, fonts, shadows, animations) are defined as CSS custom properties inside `@theme {}`.

### Exports & Package Entry Points

Main entry: `src/index.ts` re-exports everything via barrel files at each layer. Additional package exports:
- `synkra-ds/styles` → `src/styles/globals.css`
- `synkra-ds/fonts` → `src/styles/fonts.css`
- `synkra-ds/tokens/css` → `src/tokens/tokens.css`
- `synkra-ds/tokens/palette` → `src/tokens/palette-extended.css`

### TypeScript Path Aliases

```
@synkra-ds/* → src/*
@tokens/*    → src/tokens/*
@atoms/*     → src/atoms/*
@molecules/* → src/molecules/*
@organisms/* → src/organisms/*
```

## Testing

- **Framework**: Vitest + Testing Library + jsdom
- **Accessibility**: Every component test includes `vitest-axe` assertions (`expect(results).toHaveNoViolations()`)
- **Setup**: `src/lib/test-setup.ts` provides ResizeObserver polyfill (for Radix), custom localStorage (Node 22+ compat), and axe matchers
- **Coverage**: 90%+ threshold enforced on branches, functions, lines, and statements

## CI Pipeline

`.github/workflows/ci.yml` runs on push/PR to main: lint → typecheck → test:coverage → build → verify dist artifacts exist.

## Conventions

- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.
- New components must include `.tsx`, `.test.tsx`, `.stories.tsx`, and `index.ts`
- Stories use `tags: ["autodocs"]` for auto-generated documentation
- ESLint v9 flat config (no Prettier) — `@typescript-eslint/no-unused-vars` is warn level with `^_` pattern ignored
