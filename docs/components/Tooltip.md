# Tooltip

> Molecule | Floating label that appears on hover to provide supplementary information

## Import

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "synkra-ds";
```

## Subcomponents

| Subcomponent | Description |
|--------------|-------------|
| `TooltipProvider` | Context provider that wraps the tree. Accepts `delayDuration` (ms before showing). Must wrap all Tooltip instances. |
| `Tooltip` | Root container for a single tooltip instance. |
| `TooltipTrigger` | Element that triggers the tooltip on hover/focus. Supports `asChild`. |
| `TooltipContent` | The floating tooltip panel. Rendered inside a Portal. Accepts `side` (`"top"` \| `"bottom"` \| `"left"` \| `"right"`), `sideOffset` (default `4`), and `className`. |

## Usage

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Features

- Compound component pattern built on `@radix-ui/react-tooltip`
- Rendered inside a Portal to avoid overflow clipping
- Configurable position via `side` prop (`top`, `bottom`, `left`, `right`)
- Adjustable offset via `sideOffset` (default: `4`)
- Entry/exit animations: fade-in, zoom-in-95, directional slide
- Elevated background with border and shadow

## Accessibility

- Tooltip content renders with `tooltip` role
- Appears on hover and focus, dismissed on mouse leave / blur
- Delay before showing controlled by `TooltipProvider delayDuration`
- Renders in a Portal so it does not interfere with document flow

## Tests: 6 | Stories: 5
