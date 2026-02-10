import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { AlertCircle, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm flex gap-3 items-start [&>svg]:shrink-0 [&>svg]:mt-0.5",
  {
    variants: {
      variant: {
        default: "bg-bg-surface border-border text-text-primary",
        success: "bg-success/10 border-success/20 text-success [&>svg]:text-success",
        warning: "bg-warning/10 border-warning/20 text-warning [&>svg]:text-warning",
        error: "bg-error/10 border-error/20 text-error [&>svg]:text-error",
        info: "bg-info/10 border-info/20 text-info [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconMap = {
  default: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Optional title displayed above the description */
  title?: string;
  /** Hide the default icon */
  hideIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, hideIcon = false, children, ...props }, ref) => {
    const Icon = iconMap[variant ?? "default"];
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {!hideIcon && <Icon size={16} aria-hidden="true" />}
        <div className="flex-1">
          {title && <h5 className="font-medium leading-none mb-1">{title}</h5>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
