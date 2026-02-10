# Separator

> Atom | Visual divider between content sections

## Import

```tsx
import { Separator } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the separator |
| `decorative` | `boolean` | `true` | When true, renders `role="none"` (purely visual). When false, renders `role="separator"`. |
| `className` | `string` | - | Additional classes |

Extends all native `<div>` attributes via Radix UI Separator primitive.

## Usage

```tsx
{/* Horizontal separator (default) */}
<Separator />

{/* Vertical separator */}
<Separator orientation="vertical" />

{/* Non-decorative separator (accessible to screen readers) */}
<Separator decorative={false} />

{/* Separator between content blocks */}
<div>
  <p>Section A</p>
  <Separator className="my-4" />
  <p>Section B</p>
</div>

{/* Inline vertical separators */}
<div style={{ display: "flex", alignItems: "center", gap: "16px", height: "20px" }}>
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Source</span>
  <Separator orientation="vertical" />
  <span>Changelog</span>
</div>
```

## Accessibility

- Uses Radix UI Separator primitive for correct semantics
- When `decorative={true}` (default), renders `role="none"` -- ignored by assistive tech
- When `decorative={false}`, renders `role="separator"` -- announced by screen readers
- Supports `aria-orientation` through the `orientation` prop
- Use `decorative={false}` when the separator conveys meaningful structure

## Tests: 9 | Stories: 3
