# Alert

Contextual feedback messages for user actions and system states.

## Import

```tsx
import { Alert } from "synkra-ds";
```

## Variants

| Variant | Usage |
|---------|-------|
| `default` | General informational messages |
| `success` | Positive confirmation |
| `warning` | Caution / attention needed |
| `error` | Error / failure state |
| `info` | Neutral informational |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "success" \| "warning" \| "error" \| "info"` | `"default"` | Visual style |
| `title` | `string` | — | Optional title text |
| `hideIcon` | `boolean` | `false` | Hide the variant icon |
| `children` | `ReactNode` | — | Alert description content |
| `className` | `string` | — | Additional CSS classes |

## Examples

```tsx
<Alert variant="success" title="Saved!">
  Your changes have been saved successfully.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

## Accessibility

- Uses `role="alert"` for screen reader announcements
- Icons are `aria-hidden="true"` (decorative)
- Semantic heading for title
