import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Sidebar Root ──────────────────────────────────────────────────────── */

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Collapsed state (icon-only) */
  collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsed = false, children, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        "flex h-full flex-col border-r border-border bg-bg-elevated",
        "transition-all duration-slow ease-in-out",
        collapsed ? "w-16" : "w-64",
        className,
      )}
      data-collapsed={collapsed}
      {...props}
    >
      {children}
    </aside>
  ),
);
Sidebar.displayName = "Sidebar";

/* ── Sidebar Header ────────────────────────────────────────────────────── */

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 border-b border-border px-4 py-4", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

/* ── Sidebar Content ───────────────────────────────────────────────────── */

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-3 py-4", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

/* ── Sidebar Group ─────────────────────────────────────────────────────── */

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props}>
      {label && (
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </p>
      )}
      <nav className="flex flex-col gap-1">{children}</nav>
    </div>
  ),
);
SidebarGroup.displayName = "SidebarGroup";

/* ── Sidebar Item ──────────────────────────────────────────────────────── */

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Active/selected state */
  active?: boolean;
  /** Icon element (left slot) */
  icon?: React.ReactNode;
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active = false, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
        "transition-colors duration-fast ease-in-out",
        "hover:bg-bg-surface hover:text-text-primary",
        active
          ? "bg-primary/10 text-primary"
          : "text-text-secondary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-emphasis",
        className,
      )}
      data-active={active}
      aria-current={active ? "page" : undefined}
      {...props}
    >
      {icon && <span className="flex shrink-0 h-5 w-5 items-center justify-center">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  ),
);
SidebarItem.displayName = "SidebarItem";

/* ── Sidebar Footer ────────────────────────────────────────────────────── */

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-auto border-t border-border px-4 py-4",
      className,
    )}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
};
