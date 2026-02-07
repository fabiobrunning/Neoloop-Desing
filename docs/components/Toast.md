# Toast

> Organism | Notification toast with variants

## Import

```tsx
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from "synkra-ds";
```

## Subcomponents

| Component | Element | Description |
|-----------|---------|-------------|
| `ToastProvider` | - | Context provider (wrap app root) |
| `ToastViewport` | `<ol>` | Fixed container (top-right, max 420px) |
| `Toast` | `<li>` | Individual toast with variant styling |
| `ToastTitle` | `<div>` | Toast heading |
| `ToastDescription` | `<div>` | Toast body text |
| `ToastAction` | `<button>` | Action button inside toast |
| `ToastClose` | `<button>` | Close button (X icon, appears on hover) |

## Props

### Toast
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "success" \| "error" \| "warning" \| "info"` | `"default"` | Visual style |
| `duration` | `number` | `5000` | Auto-dismiss time in ms |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | State change callback |

## Variant Styles

| Variant | Border | Background | Text |
|---------|--------|------------|------|
| `default` | `border` | `bg-elevated` | `text-primary` |
| `success` | `success/30` | `success/10` | `success` |
| `error` | `error/30` | `error/10` | `error` |
| `warning` | `warning/30` | `warning/10` | `warning` |
| `info` | `info/30` | `info/10` | `info` |

## Usage

```tsx
{/* Wrap app root */}
<ToastProvider>
  <App />
  <ToastViewport />
</ToastProvider>

{/* Individual toast */}
<Toast variant="success">
  <ToastTitle>Saved!</ToastTitle>
  <ToastDescription>Your changes were saved.</ToastDescription>
  <ToastAction altText="Undo">Undo</ToastAction>
  <ToastClose />
</Toast>
```

## Features

- **Swipe to dismiss**: horizontal swipe gesture support
- **Auto-dismiss**: configurable duration (default 5s)
- **Stacking**: multiple toasts stack vertically
- **Animations**: slide-in from top, slide-out to right
- **Close on hover**: X button appears on group hover

## Accessibility

- Radix `status` role with live region
- `altText` required on ToastAction for screen readers
- Keyboard: Tab to actions, Escape to dismiss
- Pause timer on hover/focus

## Tests: 10 | Stories: 7
