import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface SettingsNavItem {
  /** Display label */
  label: string;
  /** Unique value/key */
  value: string;
  /** Icon element */
  icon?: React.ReactNode;
}

export interface SettingsPageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Navigation items for settings sections */
  navItems?: SettingsNavItem[];
  /** Currently active section value */
  activeSection?: string;
  /** Section change handler */
  onSectionChange?: (value: string) => void;
  /** Header actions (save button, etc.) */
  headerActions?: React.ReactNode;
}

/* ── SettingsPage ─────────────────────────────────────────────────────── */

const SettingsPage = React.forwardRef<HTMLDivElement, SettingsPageProps>(
  (
    {
      title = "Settings",
      description,
      navItems = [],
      activeSection,
      onSectionChange,
      headerActions,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("min-h-screen bg-bg-base", className)}
      {...props}
    >
      {/* Header */}
      <div className="border-b border-border bg-bg-elevated px-6 py-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-text-muted">{description}</p>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center gap-2">{headerActions}</div>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Side navigation */}
          {navItems.length > 0 && (
            <nav className="w-full md:w-56 shrink-0" aria-label="Settings navigation">
              <ul className="flex flex-row gap-1 overflow-x-auto md:flex-col">
                {navItems.map((item) => (
                  <li key={item.value}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                        "transition-colors duration-fast whitespace-nowrap",
                        activeSection === item.value
                          ? "bg-primary/10 text-primary"
                          : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
                      )}
                      onClick={() => onSectionChange?.(item.value)}
                      aria-current={
                        activeSection === item.value ? "true" : undefined
                      }
                    >
                      {item.icon && (
                        <span className="[&>svg]:size-4">{item.icon}</span>
                      )}
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  ),
);

SettingsPage.displayName = "SettingsPage";

/* ── SettingsSection ──────────────────────────────────────────────────── */

export interface SettingsSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
}

const SettingsSection = React.forwardRef<HTMLDivElement, SettingsSectionProps>(
  ({ title, description, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-bg-elevated p-6",
        className,
      )}
      {...props}
    >
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-text-muted">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  ),
);

SettingsSection.displayName = "SettingsSection";

export { SettingsPage, SettingsSection };
