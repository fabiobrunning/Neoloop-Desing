# Skeleton

Loading placeholder with pulse animation. Use to indicate content is being loaded.

## Import

```tsx
import { Skeleton } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"rectangle" \| "circle" \| "text"` | `"rectangle"` | Shape variant |
| `width` | `string \| number` | — | Width (px or CSS value) |
| `height` | `string \| number` | — | Height (px or CSS value) |

## Examples

```tsx
<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="text" width="80%" />
<Skeleton variant="rectangle" width="100%" height="200px" />
```

## Accessibility

- Uses `aria-hidden="true"` as it's purely decorative
