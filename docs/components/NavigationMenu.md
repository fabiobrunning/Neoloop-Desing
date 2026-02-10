# NavigationMenu

> Molecule | Horizontal navigation menu with dropdown content panels, animated transitions, and full keyboard support

## Import

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
} from "synkra-ds";
```

## Subcomponents

| Subcomponent | Description |
|--------------|-------------|
| `NavigationMenu` | Root container. Wraps children and renders the viewport. |
| `NavigationMenuList` | Flex container for menu items. |
| `NavigationMenuItem` | Individual menu item wrapper. |
| `NavigationMenuTrigger` | Button that toggles dropdown content. Renders a ChevronDown icon that rotates on open. |
| `NavigationMenuContent` | Dropdown panel with slide/fade animations. Positioned absolutely on md+ screens. |
| `NavigationMenuLink` | Styled anchor link for use inside content panels or directly in items. |
| `NavigationMenuViewport` | Animated viewport container rendered below the menu. Automatically included by `NavigationMenu`. |
| `NavigationMenuIndicator` | Optional visual indicator that follows the active item. |

## Usage

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
          <li>
            <NavigationMenuLink href="/analytics">
              <div className="text-sm font-medium">Analytics</div>
              <p className="text-sm text-text-muted">
                Track your metrics and monitor performance.
              </p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about">About</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Features

- Compound component pattern built on `@radix-ui/react-navigation-menu`
- Triggers with animated ChevronDown icon (rotates 180deg on open)
- Content panels with directional slide and fade animations
- Viewport with zoom-in/zoom-out transitions
- Optional indicator arrow for active item
- Supports both dropdown menus and simple link items
- Responsive: full-width content on mobile, auto-width on md+

## Accessibility

- Root renders with `navigation` role
- Full keyboard navigation handled by Radix (Arrow keys, Enter, Escape, Tab)
- Triggers announce expanded/collapsed state via `data-state`
- SVG icons use `aria-hidden="true"`
- Focus management between trigger and content

## Tests: 6 | Stories: 2
