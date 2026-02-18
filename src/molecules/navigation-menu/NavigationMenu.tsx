import * as React from "react";
import { cn } from "../../lib/utils";

export type NavigationMenuProps = React.HTMLAttributes<HTMLElement>;

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn("flex items-center gap-6", className)} {...props} />
  ),
);
NavigationMenu.displayName = "NavigationMenu";

export interface NavigationMenuItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const NavigationMenuItem = React.forwardRef<HTMLAnchorElement, NavigationMenuItemProps>(
  ({ className, active, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]",
        active && "text-[var(--color-foreground)]",
        className,
      )}
      {...props}
    />
  ),
);
NavigationMenuItem.displayName = "NavigationMenuItem";

export { NavigationMenu, NavigationMenuItem };
