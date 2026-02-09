# DropdownMenu

> Molecule | Feature-rich dropdown menu with items, checkboxes, radio groups, submenus, labels, separators, and keyboard shortcuts

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "synkra-ds";
```

## Subcomponents

| Subcomponent | Description |
|--------------|-------------|
| `DropdownMenu` | Root container. |
| `DropdownMenuTrigger` | Element that opens the menu on click. Supports `asChild`. |
| `DropdownMenuContent` | Floating menu panel. Rendered in a Portal. Accepts `sideOffset` (default `4`). |
| `DropdownMenuItem` | Standard menu item. Accepts `inset` (boolean) and `disabled`. |
| `DropdownMenuCheckboxItem` | Toggleable checkbox item. Accepts `checked`. |
| `DropdownMenuRadioGroup` | Groups radio items. Accepts `value`. |
| `DropdownMenuRadioItem` | Radio-selectable item. Accepts `value`. |
| `DropdownMenuLabel` | Non-interactive label for grouping. Accepts `inset`. |
| `DropdownMenuSeparator` | Visual horizontal divider. |
| `DropdownMenuShortcut` | `<span>` for keyboard shortcut hints, aligned right with muted text. |
| `DropdownMenuGroup` | Logical grouping wrapper. |
| `DropdownMenuSub` | Root for a submenu. |
| `DropdownMenuSubTrigger` | Item that opens a submenu on hover. Accepts `inset`. Renders chevron-right icon. |
| `DropdownMenuSubContent` | Content panel for a submenu. |

## Usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>Shift+P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>Cmd+,</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Features

- Compound component pattern built on `@radix-ui/react-dropdown-menu`
- Standard items, checkbox items, and radio items
- Nested submenus via `DropdownMenuSub` / `DropdownMenuSubTrigger` / `DropdownMenuSubContent`
- Labels and separators for visual grouping
- Keyboard shortcut display via `DropdownMenuShortcut`
- `inset` prop for left-padding alignment
- Entry/exit animations: fade, zoom-in-95, directional slide
- Focus highlight: `bg-primary/10` on focused items

## Accessibility

- Content renders with `menu` role
- Items render with `menuitem`, `menuitemcheckbox`, or `menuitemradio` roles
- Disabled items marked with `data-disabled` attribute
- Full keyboard navigation handled by Radix (Arrow keys, Enter, Escape)
- SVG icons use `aria-hidden="true"`

## Tests: 13 | Stories: 4
