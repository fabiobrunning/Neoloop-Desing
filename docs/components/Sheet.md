# Sheet

> Organism | Slide-over drawer (sheet) built on Radix UI Dialog

## Import

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "synkra-ds";
```

## Subcomponents

| Component | Element | Description |
|-----------|---------|-------------|
| `Sheet` | - | Root (controlled/uncontrolled) |
| `SheetTrigger` | `<button>` | Opens the sheet |
| `SheetContent` | `<div>` | Slide-over panel with overlay |
| `SheetOverlay` | `<div>` | Backdrop overlay (auto-rendered) |
| `SheetHeader` | `<div>` | Title + description container |
| `SheetFooter` | `<div>` | Action buttons container |
| `SheetTitle` | `<h2>` | Sheet heading |
| `SheetDescription` | `<p>` | Supporting text |
| `SheetClose` | `<button>` | Close button (X icon auto-rendered in content) |

## Props

### Sheet
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | State change callback |

### SheetContent
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Side from which the sheet slides in |
| `className` | `string` | - | Additional CSS classes |

## Usage

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <Input placeholder="Name" />
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Side Variants

| Side | Behavior |
|------|----------|
| `right` | Slides in from right, max-width `sm:max-w-sm`, left border |
| `left` | Slides in from left, max-width `sm:max-w-sm`, right border |
| `top` | Slides down from top, full width, bottom border |
| `bottom` | Slides up from bottom, full width, top border |

## Features

- **Overlay**: `bg-bg-overlay` with fade animation
- **Animations**: slide-in/out based on side variant with configurable duration
- **Close button**: X icon (lucide-react) with `sr-only` label (auto-rendered)
- **Responsive width**: `w-3/4` on mobile, `sm:max-w-sm` on desktop (left/right)
- **Responsive footer**: column on mobile, row on desktop

## Accessibility

- Radix `dialog` role with focus trap
- `aria-labelledby` via SheetTitle
- `aria-describedby` via SheetDescription
- Escape key closes sheet
- Focus returns to trigger on close

## Tests: 7 | Stories: 5
