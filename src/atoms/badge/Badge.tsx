import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-accent)] text-white",
        secondary: "bg-[var(--color-surface)] text-[var(--color-foreground)]",
        destructive: "bg-[var(--color-destructive)] text-white",
        outline: "border border-[var(--color-border)] text-[var(--color-foreground)]",
        success: "bg-[var(--color-success)] text-[var(--color-background)]",
        gradient: "text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, style, ...props }, ref) => {
    const gradientStyle = variant === "gradient"
      ? { ...style, background: "var(--gradient-badge)" }
      : style;
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        style={gradientStyle}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
