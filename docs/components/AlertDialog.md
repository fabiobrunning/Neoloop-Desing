# AlertDialog

> Organism | Modal confirmation dialog built on Radix UI

A modal dialog that interrupts the user with important content and expects a response. Unlike Dialog, AlertDialog does not have a close (X) button and requires the user to explicitly choose an action.

## Import

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "synkra-ds";
```

## Subcomponents

| Component | Element | Description |
|-----------|---------|-------------|
| `AlertDialog` | - | Root (controlled/uncontrolled) |
| `AlertDialogTrigger` | `<button>` | Opens the alert dialog |
| `AlertDialogContent` | `<div>` | Centered modal panel with overlay |
| `AlertDialogOverlay` | `<div>` | Background overlay (auto-rendered) |
| `AlertDialogHeader` | `<div>` | Title + description container |
| `AlertDialogFooter` | `<div>` | Action buttons container |
| `AlertDialogTitle` | `<h2>` | Alert dialog heading |
| `AlertDialogDescription` | `<p>` | Supporting text |
| `AlertDialogAction` | `<button>` | Destructive/confirm action button |
| `AlertDialogCancel` | `<button>` | Cancel button (closes dialog) |

## Props

### AlertDialog
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | State change callback |

## Usage

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete
        your account and remove all your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Yes, delete account</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Features

- **Overlay**: `bg-bg-overlay` backdrop
- **Animations**: fade in/out on open/close
- **No close button**: User must choose Action or Cancel
- **Action button**: Styled as destructive (`bg-error`)
- **Cancel button**: Styled as outline
- **Max width**: `max-w-lg` (512px)
- **Responsive footer**: column on mobile, row on desktop

## Accessibility

- Radix `alertdialog` role with focus trap
- `aria-labelledby` via AlertDialogTitle
- `aria-describedby` via AlertDialogDescription
- Escape key closes dialog (via Cancel)
- Focus returns to trigger on close
- Requires explicit user action (no dismiss on overlay click)

## Tests: 7 | Stories: 3
