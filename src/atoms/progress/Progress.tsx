import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-bg-surface",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const indicatorVariants = cva(
  "h-full rounded-full transition-all duration-normal ease-out",
  {
    variants: {
      color: {
        primary: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
        info: "bg-info",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  },
);

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof progressVariants> {
  /** Progress value from 0 to 100 */
  value?: number;
  /** Color variant of the indicator */
  color?: "primary" | "success" | "warning" | "error" | "info";
  /** Show indeterminate animation */
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, size, color, indeterminate = false, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <div
          className={cn(
            indicatorVariants({ color }),
            indeterminate && "animate-progress-indeterminate w-1/3",
          )}
          style={indeterminate ? undefined : { width: `${clampedValue}%` }}
        />
      </div>
    );
  },
);

Progress.displayName = "Progress";

export { Progress, progressVariants };
