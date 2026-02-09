# Popover

> Molecule | Click-triggered floating panel for displaying rich interactive content

## Import

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "synkra-ds";
```

## Subcomponents

| Subcomponent | Description |
|--------------|-------------|
| `Popover` | Root container. Wraps `@radix-ui/react-popover` Root. |
| `PopoverTrigger` | Button/element that toggles the popover on click. Supports `asChild`. |
| `PopoverAnchor` | Optional custom anchor point for positioning. |
| `PopoverContent` | The floating panel. Rendered inside a Portal. Accepts `align` (default `"center"`), `sideOffset` (default `4`), and `className`. Default width `w-72`. |

## Usage

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium leading-none">Dimensions</h4>
      <p className="text-sm text-text-muted">
        Set the dimensions for the layer.
      </p>
    </div>
  </PopoverContent>
</Popover>
```

## Features

- Compound component pattern built on `@radix-ui/react-popover`
- Rendered inside a Portal to avoid overflow clipping
- Configurable alignment via `align` prop (default: `"center"`)
- Toggle behavior: click to open, click again to close
- Entry/exit animations: fade, zoom-in-95, directional slide
- Elevated background with border, padding (`p-4`), and `shadow-lg`
- Optional `PopoverAnchor` for custom positioning

## Accessibility

- Popover content is focus-trapped when open
- Triggered by click (not hover), suitable for interactive content
- Rendered in a Portal so it does not interfere with document flow

## Tests: 6 | Stories: 2
