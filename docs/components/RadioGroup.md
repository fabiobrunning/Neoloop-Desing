# RadioGroup

> Atom | Single-select option group with Radix

## Import

```tsx
import { RadioGroup, RadioGroupItem } from "synkra-ds";
```

## Props

### RadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled selected value |
| `defaultValue` | `string` | - | Initial selected value |
| `onValueChange` | `(value: string) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disables all items |
| `error` | `boolean` | `false` | Error visual state on group |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Layout direction |

### RadioGroupItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Item value |
| `disabled` | `boolean` | `false` | Disables this item |
| `error` | `boolean` | `false` | Error visual state |

## Usage

```tsx
<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <label htmlFor="r1">Option 1</label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="r2" />
    <label htmlFor="r2">Option 2</label>
  </div>
</RadioGroup>
```

## Accessibility

- Built on `@radix-ui/react-radio-group`
- `role="radiogroup"` with `role="radio"` items
- Keyboard: Arrow keys to navigate, Space to select
- `aria-invalid` support for error states

## Tests: 10 | Stories: 5
