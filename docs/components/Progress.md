# Progress

Displays a progress bar indicating completion status.

## Import

```tsx
import { Progress } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value (0-100) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Bar height |
| `color` | `"primary" \| "success" \| "warning" \| "error" \| "info"` | `"primary"` | Indicator color |
| `indeterminate` | `boolean` | `false` | Indeterminate loading animation |

## Examples

```tsx
<Progress value={75} color="success" />
<Progress indeterminate size="sm" />
```

## Accessibility

- Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Indeterminate state omits `aria-valuenow` per spec
