# Badge

> Atom | Status indicator with gradients

## Import

```tsx
import { Badge } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "outline" \| "success" \| "warning" \| "error" \| "info" \| "gradient"` | `"default"` | Visual variant |
| `gradient` | `"badge" \| "purple-blue" \| "hibiscus" \| "green-mint" \| "gold-sunset"` | `"badge"` | Gradient preset (only for `variant="gradient"`) |

## Usage

```tsx
<Badge>Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="gradient" gradient="gold-sunset">Premium</Badge>
```

## Variants

| Variant | Background | Text |
|---------|-----------|------|
| default | `bg-primary` | `text-inverse` |
| secondary | `bg-bg-surface` | `text-secondary` |
| outline | `border-border` | `text-primary` |
| success | `bg-success/15` | `text-success` |
| warning | `bg-warning/15` | `text-warning` |
| error | `bg-error/15` | `text-error` |
| info | `bg-info/15` | `text-info` |
| gradient | Custom gradient | `text-white` |

## Gradient Presets

- **badge**: Red → Yellow (`#ff3b57 → #ffda1a`)
- **purple-blue**: Purple → Blue (`#8962f8 → #1ea5fc`)
- **hibiscus**: Pink → Red (`#fb0049 → #f12e6d`)
- **green-mint**: Green → Mint (`#80e220 → #a2ec8e`)
- **gold-sunset**: Gold → Orange (`#D4AF37 → #fc4e12`)

## Tests: 6 | Stories: 11
