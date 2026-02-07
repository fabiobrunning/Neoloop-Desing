import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "../../organisms/sidebar";

/* ── DashboardLayout ─────────────────────────────────────────────────── */

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar collapsed state */
  sidebarCollapsed?: boolean;
  /** Sidebar header content */
  sidebarHeader?: React.ReactNode;
  /** Sidebar navigation content */
  sidebarContent?: React.ReactNode;
  /** Sidebar footer content */
  sidebarFooter?: React.ReactNode;
  /** Top bar content (right side of header) */
  headerContent?: React.ReactNode;
  /** Page title shown in header */
  pageTitle?: string;
}

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  (
    {
      className,
      sidebarCollapsed = false,
      sidebarHeader,
      sidebarContent,
      sidebarFooter,
      headerContent,
      pageTitle,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("flex h-screen overflow-hidden bg-bg-base", className)}
      {...props}
    >
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed}>
        {sidebarHeader && <SidebarHeader>{sidebarHeader}</SidebarHeader>}
        <SidebarContent>{sidebarContent}</SidebarContent>
        {sidebarFooter && <SidebarFooter>{sidebarFooter}</SidebarFooter>}
      </Sidebar>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-bg-elevated px-6">
          {pageTitle && (
            <h1 className="text-lg font-semibold text-text-primary">{pageTitle}</h1>
          )}
          {!pageTitle && <div />}
          {headerContent && (
            <div className="flex items-center gap-3">{headerContent}</div>
          )}
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  ),
);

DashboardLayout.displayName = "DashboardLayout";

export { DashboardLayout };
