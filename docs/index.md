# Synkra DS - Pattern Library

> Design System for Lendario brand | v0.1.0

## Overview

Synkra DS is a component library built with **Atomic Design** methodology, using **Tailwind CSS v4**, **Radix UI** primitives, and **CVA** for variant management.

| Metric | Value |
|--------|-------|
| Components | 9 |
| Design Tokens | 170 |
| Test Coverage | 108 tests (100% passing) |
| Accessibility | WCAG AA compliant |
| CSS Approach | Tailwind v4 + CSS tokens |

## Architecture

```
Atoms → Molecules → Organisms → Templates → Pages
```

### Atoms (6)
- [Button](./components/Button.md) - Primary action element
- [Input](./components/Input.md) - Text input field
- [Checkbox](./components/Checkbox.md) - Binary toggle with Radix
- [Card](./components/Card.md) - Content container (6 subcomponents)
- [Switch](./components/Switch.md) - Toggle switch with Radix
- [Badge](./components/Badge.md) - Status indicator with gradients

### Molecules (1)
- [FormField](./components/FormField.md) - Label + Input + helper/error

### Organisms (2)
- [Sidebar](./components/Sidebar.md) - Navigation sidebar (6 subcomponents)
- [LoginForm](./components/LoginForm.md) - Authentication form

## Quick Start

```tsx
import { Button, Input, Badge } from "synkra-ds";

function App() {
  return (
    <div>
      <Badge variant="success">Active</Badge>
      <Input placeholder="Email" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

## Related Docs

- [Getting Started](./getting-started.md)
- [Token Reference](./tokens.md)
- [Accessibility Guide](./accessibility.md)
- [Component References](./component-references.md)
