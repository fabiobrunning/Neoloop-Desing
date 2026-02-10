# Toggle

> Atom | Two-state button for toggling options on/off

## Import

```tsx
import { Toggle } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline"` | `"default"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `pressed` | `boolean` | `undefined` | Controlled pressed state |
| `defaultPressed` | `boolean` | `false` | Default pressed state (uncontrolled) |
| `onPressedChange` | `(pressed: boolean) => void` | - | Callback when pressed state changes |
| `disabled` | `boolean` | `false` | Disables interaction |

## Usage

```tsx
<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle variant="outline" aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>

<Toggle size="sm" aria-label="Toggle underline">
  <Underline className="h-4 w-4" />
</Toggle>
```

## Variants

- **default**: Transparent background, surface on hover
- **outline**: Border with transparent background, surface on hover

## Active State

When pressed, the toggle applies `bg-primary/10` and `text-primary` to indicate the active state via the `data-[state=on]` selector.

## Accessibility

- Built on Radix UI Toggle primitive
- Native `<button>` element with `aria-pressed` attribute
- `data-state="on"` / `data-state="off"` for styling
- Focus ring with `ring-primary` token
- Keyboard: Enter/Space to toggle

## Tests: 9 | Stories: 6
