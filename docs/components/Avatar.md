# Avatar

> Atom | User profile image with fallback

## Import

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "synkra-ds";
```

## Subcomponents

| Component | Element | Description |
|-----------|---------|-------------|
| `Avatar` | `<span>` | Root container with size control |
| `AvatarImage` | `<img>` | Profile image (lazy loaded by Radix) |
| `AvatarFallback` | `<span>` | Shown while image loads or on error |

## Props

### Avatar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Avatar dimensions |

### Size Map

| Size | Dimensions |
|------|-----------|
| `sm` | 32px (`h-8 w-8`) |
| `md` | 40px (`h-10 w-10`) |
| `lg` | 48px (`h-12 w-12`) |
| `xl` | 64px (`h-16 w-16`) |

## Usage

```tsx
<Avatar>
  <AvatarImage src="/user.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

<Avatar size="xl">
  <AvatarImage src="/user.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

{/* Fallback only */}
<Avatar size="sm">
  <AvatarFallback>FB</AvatarFallback>
</Avatar>
```

## Accessibility

- `alt` attribute on AvatarImage for screen readers
- `data-size` attribute for custom styling hooks
- Fallback renders immediately if no image src
- Circular shape via `rounded-full`

## Tests: 9 | Stories: 8
