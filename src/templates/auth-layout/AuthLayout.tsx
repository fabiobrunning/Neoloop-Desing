import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Brand logo or element */
  brand?: React.ReactNode;
  /** Heading text */
  heading?: string;
  /** Subheading / description text */
  subheading?: string;
  /** Side panel content (illustration, testimonial, etc.) */
  sideContent?: React.ReactNode;
  /** Side panel background class (gradient, image, etc.) */
  sideBg?: string;
  /** Footer content (links, copyright) */
  footer?: React.ReactNode;
}

/* ── AuthLayout ───────────────────────────────────────────────────────── */

const AuthLayout = React.forwardRef<HTMLDivElement, AuthLayoutProps>(
  (
    {
      brand,
      heading,
      subheading,
      sideContent,
      sideBg,
      footer,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("flex min-h-screen bg-bg-base", className)}
      {...props}
    >
      {/* Side panel (hidden on mobile) */}
      <div
        className={cn(
          "hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12",
          "bg-bg-elevated border-r border-border",
          sideBg,
        )}
      >
        {sideContent ?? (
          <div className="max-w-md text-center">
            <div className="text-5xl font-display font-bold text-primary mb-4">
              Synkra
            </div>
            <p className="text-text-muted text-lg">
              Build exceptional experiences with our design system.
            </p>
          </div>
        )}
      </div>

      {/* Form panel */}
      <div className="flex w-full lg:w-1/2 flex-col">
        {/* Top bar with brand */}
        <div className="flex items-center justify-between p-6">
          {brand && (
            <div className="text-text-primary font-semibold text-lg lg:hidden">
              {brand}
            </div>
          )}
          {!brand && <div />}
        </div>

        {/* Form area */}
        <div className="flex flex-1 items-center justify-center px-6 pb-6">
          <div className="w-full max-w-sm">
            {heading && (
              <h1 className="text-2xl font-semibold text-text-primary mb-1">
                {heading}
              </h1>
            )}
            {subheading && (
              <p className="text-sm text-text-muted mb-6">{subheading}</p>
            )}
            {children}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 text-center text-xs text-text-muted border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  ),
);

AuthLayout.displayName = "AuthLayout";

export { AuthLayout };
