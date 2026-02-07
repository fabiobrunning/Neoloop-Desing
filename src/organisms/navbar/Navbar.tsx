import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface NavItem {
  /** Display label */
  label: string;
  /** Navigation href */
  href: string;
  /** Mark as active/current */
  active?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand logo or text */
  brand?: React.ReactNode;
  /** Navigation items */
  items?: NavItem[];
  /** Right-side actions (buttons, avatar, etc.) */
  actions?: React.ReactNode;
  /** Sticky positioning */
  sticky?: boolean;
}

/* ── Mobile Menu Button ───────────────────────────────────────────────── */

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M4 12h16" />
          <path d="M4 6h16" />
          <path d="M4 18h16" />
        </>
      )}
    </svg>
  );
}

/* ── Navbar ────────────────────────────────────────────────────────────── */

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ brand, items = [], actions, sticky = false, className, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
      <nav
        ref={ref}
        className={cn(
          "w-full border-b border-border bg-bg-elevated",
          sticky && "sticky top-0 z-sticky",
          className,
        )}
        {...props}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Brand */}
          {brand && (
            <div className="flex items-center gap-2 text-text-primary font-semibold text-lg">
              {brand}
            </div>
          )}

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-fast",
                  item.active
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary",
                )}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions + Mobile toggle */}
          <div className="flex items-center gap-3">
            {actions && <div className="hidden md:flex items-center gap-2">{actions}</div>}
            <button
              type="button"
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-bg-elevated px-4 py-3">
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium",
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
            {actions && <div className="mt-3 pt-3 border-t border-border">{actions}</div>}
          </div>
        )}
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";

export { Navbar };
