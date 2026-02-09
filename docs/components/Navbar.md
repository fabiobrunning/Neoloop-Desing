# Navbar

> Organism | Responsive navigation bar with mobile menu, brand, nav items, and actions slot

## Import

```tsx
import { Navbar, type NavItem, type NavbarProps } from "synkra-ds";
```

## Props

### NavItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Display label |
| `href` | `string` | - | Navigation href |
| `active` | `boolean` | - | Mark as active/current |

### NavbarProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `ReactNode` | - | Brand logo or text |
| `items` | `NavItem[]` | `[]` | Navigation items |
| `actions` | `ReactNode` | - | Right-side actions (buttons, avatar, etc.) |
| `sticky` | `boolean` | `false` | Sticky positioning |
| `className` | `string` | - | Additional CSS classes |

## Usage

```tsx
const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Projects", href: "/projects" },
  { label: "Settings", href: "/settings" },
];

<Navbar
  brand="Synkra"
  items={navItems}
  sticky
  actions={
    <div className="flex gap-2 items-center">
      <Button variant="ghost" size="sm">Help</Button>
      <Avatar><AvatarFallback>FB</AvatarFallback></Avatar>
    </div>
  }
/>
```

## Features

- Responsive design with desktop navigation and collapsible mobile menu
- Brand slot accepts any `ReactNode` (text, logo, icon)
- Actions slot for right-side content
- Active item highlighting with distinct color
- Mobile hamburger/close toggle with animated icon swap
- Sticky positioning via `sticky` prop with `z-sticky` z-index
- Ref forwarding to the underlying `<nav>` element

## Accessibility

- Renders as semantic `<nav>` element (navigation landmark)
- Active navigation item marked with `aria-current="page"`
- Mobile toggle button has `aria-expanded` reflecting open/closed state
- Mobile toggle button has dynamic `aria-label` ("Open menu" / "Close menu")
- Menu icon SVGs marked with `aria-hidden="true"`

## Tests: 10 | Stories: 4
