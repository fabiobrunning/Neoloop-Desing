# Dialog

> Organism | Modal dialog built on Radix UI

## Import

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "synkra-ds";
```

## Subcomponents

| Component | Element | Description |
|-----------|---------|-------------|
| `Dialog` | - | Root (controlled/uncontrolled) |
| `DialogTrigger` | `<button>` | Opens the dialog |
| `DialogContent` | `<div>` | Centered modal panel with overlay |
| `DialogOverlay` | `<div>` | Backdrop blur overlay (auto-rendered) |
| `DialogHeader` | `<div>` | Title + description container |
| `DialogFooter` | `<div>` | Action buttons container |
| `DialogTitle` | `<h2>` | Dialog heading |
| `DialogDescription` | `<p>` | Supporting text |
| `DialogClose` | `<button>` | Close button (X icon auto-rendered in content) |

## Props

### Dialog
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | State change callback |

## Usage

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <Input placeholder="Name" />
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Features

- **Overlay**: `bg-black/60` with `backdrop-blur-sm`
- **Animations**: fade + zoom on open/close
- **Close button**: X icon with `sr-only` label (auto-rendered)
- **Max width**: `max-w-lg` (512px)
- **Responsive footer**: column on mobile, row on desktop

## Accessibility

- Radix `dialog` role with focus trap
- `aria-labelledby` via DialogTitle
- `aria-describedby` via DialogDescription
- Escape key closes dialog
- Focus returns to trigger on close

## Tests: 9 | Stories: 3
