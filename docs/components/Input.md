# Input

> Atom | Text input field

## Import

```tsx
import { Input } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | Input type (text, email, password, etc.) |
| `error` | `boolean` | `false` | Error visual state |
| `className` | `string` | - | Additional classes |

Extends all native `<input>` attributes.

## Usage

```tsx
<Input placeholder="Enter your name" />
<Input type="email" placeholder="you@example.com" />
<Input type="password" />
<Input error aria-invalid="true" />
```

## Accessibility

- Native `<input>` element
- `aria-invalid="true"` on error
- Focus border uses `border-emphasis` token

## Tests: 10 | Stories: 7
