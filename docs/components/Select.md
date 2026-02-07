# Select

> Atom | Dropdown selection input built on Radix UI

## Import

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "synkra-ds";
```

## Subcomponents

| Component | Element | Description |
|-----------|---------|-------------|
| `Select` | - | Root (Radix primitive) |
| `SelectTrigger` | `<button>` | Clickable trigger with chevron icon |
| `SelectValue` | `<span>` | Displays selected value or placeholder |
| `SelectContent` | `<div>` | Dropdown panel (portaled) |
| `SelectGroup` | `<div>` | Groups related items |
| `SelectLabel` | `<div>` | Group heading label |
| `SelectItem` | `<div>` | Selectable option with check indicator |
| `SelectSeparator` | `<div>` | Visual divider between groups |

## Props

### SelectTrigger
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `boolean` | `false` | Error border state + `aria-invalid` |

### SelectContent
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"popper" \| "item-aligned"` | `"popper"` | Dropdown positioning strategy |

### SelectItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Option value |
| `disabled` | `boolean` | `false` | Disables selection |

## Usage

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose a plan" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Plans</SelectLabel>
      <SelectItem value="free">Free</SelectItem>
      <SelectItem value="pro">Pro</SelectItem>
      <SelectItem value="enterprise">Enterprise</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Custom</SelectLabel>
      <SelectItem value="custom">Contact Sales</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Accessibility

- Radix `combobox` role on trigger
- `aria-invalid` on error state
- Full keyboard navigation (Arrow keys, Enter, Escape)
- Focus ring with `border-emphasis` token
- Check indicator on selected item

## Tests: 10 | Stories: 6
