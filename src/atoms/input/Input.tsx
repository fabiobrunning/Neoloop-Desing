import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visual error state */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[var(--radius-input)] border bg-bg-surface px-3 py-2",
          "text-sm text-text-primary placeholder:text-text-muted",
          "border-border",
          "transition-colors duration-fast ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-emphasis focus-visible:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary",
          error && "border-error focus-visible:ring-error/30",
          className,
        )}
        ref={ref}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
