# DashboardLayout

> Template | Full-page dashboard layout with sidebar

## Import

```tsx
import { DashboardLayout } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sidebarCollapsed` | `boolean` | `false` | Sidebar in icon-only mode |
| `sidebarHeader` | `ReactNode` | - | Sidebar header slot (logo/brand) |
| `sidebarContent` | `ReactNode` | - | Sidebar navigation slot |
| `sidebarFooter` | `ReactNode` | - | Sidebar footer slot |
| `headerContent` | `ReactNode` | - | Top bar right-side content |
| `pageTitle` | `string` | - | Page title in header bar |
| `children` | `ReactNode` | - | Main content area |

## Usage

```tsx
<DashboardLayout
  sidebarHeader={<Logo />}
  sidebarContent={
    <SidebarGroup label="Navigation">
      <SidebarItem icon={<HomeIcon />} active>Dashboard</SidebarItem>
      <SidebarItem icon={<ChartIcon />}>Analytics</SidebarItem>
    </SidebarGroup>
  }
  sidebarFooter={<UserProfile />}
  pageTitle="Dashboard"
  headerContent={<NotificationBell />}
>
  <div className="grid gap-4">
    <StatsCards />
    <Charts />
  </div>
</DashboardLayout>
```

## Layout Structure

```
+------------------+-------------------------------+
| Sidebar          | Header bar (h-14)             |
| (w-64 / w-16)   | [pageTitle]    [headerContent] |
|                  +-------------------------------+
| [sidebarHeader]  |                               |
| [sidebarContent] | Main content (scrollable)     |
| [sidebarFooter]  | [children]                    |
+------------------+-------------------------------+
```

## Composes

- `Sidebar` organism (with Header, Content, Footer)
- Full-height layout (`h-screen`)
- Scrollable main area (`overflow-y-auto`)
- Fixed header bar with border

## Accessibility

- `<header>` landmark for top bar
- `<main>` landmark for content area
- Sidebar renders as `<aside>` landmark
- Semantic heading (`<h1>`) for page title

## Tests: 10 | Stories: 3
