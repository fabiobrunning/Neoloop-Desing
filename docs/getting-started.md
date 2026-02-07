# Getting Started

## Installation

```bash
npm install synkra-ds
```

## Setup

### 1. Import Global Styles

```tsx
// main.tsx or layout.tsx
import "synkra-ds/styles/globals.css";
```

### 2. Use Components

```tsx
import { Button, Input, FormField, Badge } from "synkra-ds";

function LoginPage() {
  return (
    <form>
      <FormField
        id="email"
        label="Email"
        required
        inputProps={{ type: "email", placeholder: "you@example.com" }}
      />
      <Button type="submit" variant="primary">
        Sign in
      </Button>
    </form>
  );
}
```

### 3. Use Design Tokens

```tsx
import { tokens } from "synkra-ds";

// Access token values
console.log(tokens.colors.primary); // "#D4AF37"

// Or use CSS custom properties directly
<div style={{ color: "var(--color-primary)" }} />
```

## Storybook

```bash
npm run storybook
```

Opens at `http://localhost:6006` with all component stories and controls.

## Project Structure

```
src/
├── atoms/          # Button, Input, Checkbox, Card, Switch, Badge
├── molecules/      # FormField, Label
├── organisms/      # Sidebar, LoginForm
├── tokens/         # Design tokens (CSS, YAML, JSON, TS)
├── styles/         # Global styles (Tailwind v4 @theme)
├── lib/            # Utilities (cn)
└── assets/         # Logos, icons
```

## Key Conventions

- **Zero hardcoded values** - All styling from design tokens
- **Radix primitives** - Headless, accessible components
- **CVA variants** - Type-safe variant management
- **forwardRef** - All components forward refs
- **WCAG AA** - Accessibility first
