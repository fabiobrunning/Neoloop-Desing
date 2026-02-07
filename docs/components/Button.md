# Button

> Atom | Primary action element

## Import

```tsx
import { Button } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg" \| "icon"` | `"md"` | Size variant |
| `loading` | `boolean` | `false` | Shows spinner, disables button |
| `asChild` | `boolean` | `false` | Renders as child element (Radix Slot) |
| `disabled` | `boolean` | `false` | Disables interaction |

## Usage

```tsx
<Button variant="primary">Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button loading>Saving...</Button>
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

## Variants

- **primary**: Gold background (`bg-primary`), inverse text
- **secondary**: Surface background, secondary text
- **outline**: Border only, transparent background
- **ghost**: Transparent, hover reveals surface
- **destructive**: Red/error color scheme
- **link**: Text-only, underline on hover

## Accessibility

- Native `<button>` element
- `aria-busy="true"` when loading
- Focus ring with `border-emphasis` token
- Keyboard: Enter/Space to activate

## Tests: 23 | Stories: 13
