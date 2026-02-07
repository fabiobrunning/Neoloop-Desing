# Switch

> Atom | Toggle switch

## Import

```tsx
import { Switch } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md"` | `"md"` | Visual size |
| `checked` | `boolean` | - | Controlled state |
| `defaultChecked` | `boolean` | `false` | Initial state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |

## Usage

```tsx
<Switch aria-label="Notifications" />
<Switch size="sm" defaultChecked />
<Switch checked={isOn} onCheckedChange={setIsOn} />

{/* With label */}
<label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <Switch />
  <span>Enable dark mode</span>
</label>
```

## Sizes

- **sm**: `h-5 w-9` track, `h-4 w-4` thumb
- **md**: `h-6 w-11` track, `h-5 w-5` thumb

## Styling

- Checked: `bg-primary` (gold)
- Unchecked: `bg-border`
- Thumb: `bg-text-primary` (white)

## Accessibility

- Built on `@radix-ui/react-switch`
- `role="switch"` with `data-state`
- Keyboard: Space to toggle
- Always requires `aria-label` or associated `<label>`

## Tests: 9 | Stories: 7
