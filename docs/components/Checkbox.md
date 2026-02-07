# Checkbox

> Atom | Binary toggle with Radix

## Import

```tsx
import { Checkbox } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| "indeterminate"` | - | Controlled state |
| `defaultChecked` | `boolean` | `false` | Initial checked state |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |
| `error` | `boolean` | `false` | Error visual state |

## Usage

```tsx
<Checkbox aria-label="Accept terms" />
<Checkbox defaultChecked />
<Checkbox checked="indeterminate" />
<Checkbox error />
```

## Accessibility

- Built on `@radix-ui/react-checkbox`
- `role="checkbox"` with proper `aria-checked`
- Keyboard: Space to toggle

## Tests: 8 | Stories: 6
