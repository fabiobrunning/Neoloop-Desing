# Slider

An input where the user selects a value from within a given range.

## Import

```tsx
import { Slider } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `number[]` | `[0]` | Default value(s) |
| `value` | `number[]` | - | Controlled value(s) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disable interaction |
| `onValueChange` | `(value: number[]) => void` | - | Called when value changes |

## Examples

```tsx
{/* Single value */}
<Slider defaultValue={[50]} aria-label="Volume" />

{/* Range with two thumbs */}
<Slider defaultValue={[25, 75]} aria-label="Price range" />

{/* Custom range */}
<Slider min={0} max={200} step={5} defaultValue={[100]} aria-label="Budget" />
```

## Accessibility

- Uses Radix UI Slider primitive with built-in `role="slider"`
- Provides `aria-valuenow`, `aria-valuemin`, `aria-valuemax` automatically
- Supports keyboard navigation (Arrow keys, Home, End)
- Always provide an `aria-label` or associate with a visible label
