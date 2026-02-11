# Synkra DS

Token-based React component library built with Atomic Design, Tailwind CSS v4, and Radix UI.

[![npm version](https://img.shields.io/npm/v/synkra-ds)](https://www.npmjs.com/package/synkra-ds)
[![CI](https://github.com/fabiobrunning/Neoloop-Desing/actions/workflows/ci.yml/badge.svg)](https://github.com/fabiobrunning/Neoloop-Desing/actions/workflows/ci.yml)

## Installation

```bash
npm install synkra-ds
```

## Setup

```tsx
// 1. Import global styles in your app entry
import "synkra-ds/styles";

// 2. Use components
import { Button, Input, Card, Badge } from "synkra-ds";
```

## Components

**40+ components** organized by Atomic Design:

| Layer | Components |
|-------|-----------|
| **Atoms** | Button, Input, Label, Badge, Avatar, Card, Checkbox, RadioGroup, Select, Switch, Textarea, Alert, Progress, Skeleton, Separator, Slider, Toggle, Logo, SocialIcon, PaymentIcon |
| **Molecules** | FormField, Tabs, Tooltip, Popover, DropdownMenu, Breadcrumb, Accordion, NavigationMenu |
| **Organisms** | Sidebar, LoginForm, SignupForm, Dialog, AlertDialog, Sheet, Toast, DataTable, Navbar, Footer, Pagination |
| **Templates** | AuthLayout, DashboardLayout, SettingsPage, ErrorPage |
| **Utilities** | cn(), ChartConfig (10-color palette) |

## Design Tokens

170+ tokens as CSS custom properties and TypeScript exports:

```tsx
import { tokens } from "synkra-ds";

tokens.colors.primary.blue    // "#2B4BEE"
tokens.typography.sizes.base   // "1rem"
tokens.spacing[4]              // "1rem"
```

Or use CSS variables directly:

```css
color: var(--color-primary);
font-size: var(--text-base);
```

## Theming

Built-in dark/light mode with `ThemeProvider`:

```tsx
import { ThemeProvider, ThemeToggle } from "synkra-ds";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ThemeToggle />
      {/* your app */}
    </ThemeProvider>
  );
}
```

## Development

```bash
npm run dev          # Storybook at localhost:6006
npm test             # Run tests
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run build        # Build with tsup
```

## Tech Stack

- **React 18** + TypeScript
- **Tailwind CSS v4** (CSS-first config)
- **Radix UI** primitives (accessible, unstyled)
- **CVA** (class-variance-authority) for type-safe variants
- **Vitest** + Testing Library + vitest-axe for a11y
- **Storybook 8** with autodocs
- **tsup** (ESM + CJS + .d.ts)

## License

MIT
