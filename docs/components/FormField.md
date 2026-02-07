# FormField

> Molecule | Label + Input + helper/error

## Import

```tsx
import { FormField } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Connects label to input |
| `label` | `string` | **required** | Label text |
| `helperText` | `string` | - | Hint below input |
| `error` | `string` | - | Error message (replaces helper) |
| `required` | `boolean` | `false` | Shows `*` indicator |
| `inputProps` | `InputProps` | - | Props forwarded to Input atom |

## Usage

```tsx
<FormField
  id="email"
  label="Email"
  required
  inputProps={{ type: "email", placeholder: "you@example.com" }}
/>

<FormField
  id="name"
  label="Full Name"
  helperText="As it appears on your ID"
  inputProps={{ placeholder: "John Doe" }}
/>

<FormField
  id="password"
  label="Password"
  error="Password must be at least 8 characters"
  inputProps={{ type: "password" }}
/>
```

## Composition

Composes: `Label` (Radix) + `Input` atom

- Label auto-associated via `htmlFor`
- Helper/error connected via `aria-describedby`
- Error message uses `role="alert"` for screen reader announcement

## Tests: 15 | Stories: 6
