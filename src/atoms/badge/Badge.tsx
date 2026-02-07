import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-text-inverse",
        secondary: "border-transparent bg-bg-surface text-text-secondary",
        outline: "border-border text-text-primary",
        success: "border-transparent bg-success/15 text-success",
        warning: "border-transparent bg-warning/15 text-warning",
        error: "border-transparent bg-error/15 text-error",
        info: "border-transparent bg-info/15 text-info",
        gradient: "border-transparent text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Gradient name (only used with variant="gradient") */
  gradient?: "badge" | "purple-blue" | "hibiscus" | "green-mint" | "gold-sunset";
}

const gradientMap = {
  badge: "linear-gradient(82.44deg, #ff3b57 0%, #ffda1a 100%)",
  "purple-blue": "linear-gradient(135deg, #8962f8, #1ea5fc)",
  hibiscus: "linear-gradient(135deg, #fb0049, #f12e6d)",
  "green-mint": "linear-gradient(135deg, #80e220, #a2ec8e)",
  "gold-sunset": "linear-gradient(135deg, #D4AF37, #fc4e12)",
} as const;

function Badge({
  className,
  variant,
  gradient = "badge",
  style,
  ...props
}: BadgeProps) {
  const gradientStyle =
    variant === "gradient"
      ? { ...style, background: gradientMap[gradient] }
      : style;

  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={gradientStyle}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
