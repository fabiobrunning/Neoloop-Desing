import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error visual state */
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-[var(--radius-input)] border bg-bg-elevated px-3 py-2",
        "text-sm text-text-primary placeholder:text-text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-emphasis focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-y",
        error ? "border-error" : "border-border",
        className,
      )}
      ref={ref}
      aria-invalid={error || undefined}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";

export { Textarea };
