import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils";
import { Input, type InputProps } from "../../atoms/input";

/* ── Label ─────────────────────────────────────────────────────────────── */

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Mark as required field */
  required?: boolean;
}

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium text-text-primary leading-none",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  >
    {children}
    {required && (
      <span className="text-error ml-1" aria-hidden="true">
        *
      </span>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = "Label";

/* ── FormField (Molecule) ──────────────────────────────────────────────── */

export interface FormFieldProps {
  /** Unique field ID (used for label-input association) */
  id: string;
  /** Label text */
  label: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message (replaces helperText, triggers error state) */
  error?: string;
  /** Mark as required */
  required?: boolean;
  /** Disable the field */
  disabled?: boolean;
  /** Additional class names for the wrapper */
  className?: string;
  /** Input props (passed through to Input atom) */
  inputProps?: Omit<InputProps, "id" | "error" | "disabled" | "required">;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      className,
      inputProps,
    },
    ref,
  ) => {
    const hasError = Boolean(error);
    const descriptionId = helperText || error ? `${id}-description` : undefined;

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        <Input
          ref={ref}
          id={id}
          error={hasError}
          disabled={disabled}
          required={required}
          aria-describedby={descriptionId}
          {...inputProps}
        />
        {(error || helperText) && (
          <p
            id={descriptionId}
            className={cn(
              "text-xs",
              hasError ? "text-error" : "text-text-muted",
            )}
            role={hasError ? "alert" : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export { Label, FormField };
