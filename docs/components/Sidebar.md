# Sidebar

> Organism | Navigation sidebar

## Import

```tsx
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
} from "synkra-ds";
```

## Subcomponents

| Component | Element | Description |
|-----------|---------|-------------|
| `Sidebar` | `<aside>` | Root container |
| `SidebarHeader` | `<div>` | Logo/brand area |
| `SidebarContent` | `<div>` | Scrollable main content |
| `SidebarGroup` | `<div>` + `<nav>` | Grouped navigation items |
| `SidebarItem` | `<button>` | Navigation item |
| `SidebarFooter` | `<div>` | Bottom section |

## Props

### Sidebar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | `false` | Icon-only mode (w-16 vs w-64) |

### SidebarGroup
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Group heading |

### SidebarItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `false` | Active/selected state |
| `icon` | `ReactNode` | - | Left icon slot |
| `onClick` | `() => void` | - | Click handler |

## Usage

```tsx
<Sidebar>
  <SidebarHeader>
    <Logo />
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup label="Navigation">
      <SidebarItem icon={<HomeIcon />} active>Dashboard</SidebarItem>
      <SidebarItem icon={<ChartIcon />}>Analytics</SidebarItem>
      <SidebarItem icon={<UsersIcon />}>Users</SidebarItem>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter>
    <UserProfile />
  </SidebarFooter>
</Sidebar>
```

## Accessibility

- `<aside>` landmark
- `<nav>` wrapping items
- `aria-current="page"` on active item
- Full keyboard navigation

## Tests: 10 | Stories: 4
