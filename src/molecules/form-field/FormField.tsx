import * as React from "react";
import { cn } from "../../lib/utils";
import { Input, type InputProps } from "../../atoms/input";

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
  description?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, description, className, id: idProp, ...props }, ref) => {
    const generatedId = React.useId();
    const id = idProp || generatedId;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-foreground)]"
        >
          {label}
        </label>
        {description && (
          <p className="text-sm text-[var(--color-muted-foreground)]">{description}</p>
        )}
        <Input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(error && "border-[var(--color-destructive)]")}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-sm text-[var(--color-destructive)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
FormField.displayName = "FormField";

export { FormField };
