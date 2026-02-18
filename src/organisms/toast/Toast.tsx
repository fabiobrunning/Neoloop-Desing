import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 shadow-[var(--shadow-lg)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] text-[var(--color-foreground)]",
        destructive: "bg-[var(--color-destructive)] text-white border-[var(--color-destructive)]",
        success: "bg-[var(--color-surface)] text-[var(--color-success)] border-[var(--color-success)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, onClose, children, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(toastVariants({ variant }), className)} {...props}>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 opacity-70 hover:opacity-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      )}
    </div>
  ),
);
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
  ),
);
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
  ),
);
ToastDescription.displayName = "ToastDescription";

export { Toast, ToastTitle, ToastDescription, toastVariants };
