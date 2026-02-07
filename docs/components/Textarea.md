# Textarea

> Atom | Multi-line text input

## Import

```tsx
import { Textarea } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `boolean` | `false` | Error border state + `aria-invalid` |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disables interaction |
| `rows` | `number` | - | Number of visible rows |

Extends all native `<textarea>` attributes.

## Usage

```tsx
<Textarea placeholder="Write your message..." />
<Textarea error placeholder="Required field" />
<Textarea disabled rows={6} />
```

## Styling

- Min height: `80px`
- Vertical resize enabled (`resize-y`)
- Matches Input atom styling (border, bg, focus ring)
- Error state: `border-error` + `aria-invalid`

## Accessibility

- Native `<textarea>` element
- `aria-invalid="true"` on error state
- Focus ring with `border-emphasis` token
- Works with FormField molecule for label association

## Tests: 9 | Stories: 6
