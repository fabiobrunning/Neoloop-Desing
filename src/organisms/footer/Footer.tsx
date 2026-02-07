import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface FooterLinkGroup {
  /** Group title */
  title: string;
  /** Links in this group */
  links: { label: string; href: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand logo or text */
  brand?: React.ReactNode;
  /** Description text below brand */
  description?: string;
  /** Link groups for footer columns */
  linkGroups?: FooterLinkGroup[];
  /** Copyright text */
  copyright?: string;
  /** Bottom-bar extra content (social icons, etc.) */
  bottomContent?: React.ReactNode;
}

/* ── Footer ───────────────────────────────────────────────────────────── */

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      brand,
      description,
      linkGroups = [],
      copyright,
      bottomContent,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "w-full border-t border-border bg-bg-elevated",
          className,
        )}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 py-10">
          {/* Top section: brand + link groups */}
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            {/* Brand column */}
            {(brand || description) && (
              <div className="max-w-xs">
                {brand && (
                  <div className="text-text-primary font-semibold text-lg mb-2">
                    {brand}
                  </div>
                )}
                {description && (
                  <p className="text-sm text-text-muted">{description}</p>
                )}
              </div>
            )}

            {/* Link groups */}
            {linkGroups.length > 0 && (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                {linkGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">
                      {group.title}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-fast"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
            {copyright && (
              <p className="text-xs text-text-muted">{copyright}</p>
            )}
            {bottomContent && <div>{bottomContent}</div>}
          </div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = "Footer";

export { Footer };
