import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Associated input ID */
  htmlFor?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Size of the label */
  size?: 'sm' | 'md' | 'lg';
  /** Show optional indicator */
  optional?: boolean;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Label component for form inputs with required/optional indicators
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Label htmlFor="name" required>Name</Label>
 * <Label htmlFor="phone" optional>Phone</Label>
 * <Label htmlFor="bio" disabled>Bio</Label>
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      htmlFor,
      required = false,
      disabled = false,
      size = 'md',
      optional = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'block font-medium transition-colors duration-200';

    // Size styles
    const sizeStyles = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };

    // State styles
    const stateStyles = disabled
      ? 'text-gray-400 cursor-not-allowed'
      : 'text-gray-700 dark:text-gray-300 cursor-pointer';

    const combinedClassName = `
      ${baseStyles}
      ${sizeStyles[size]}
      ${stateStyles}
      ${className}
    `.trim();

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={combinedClassName}
        {...props}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          {required && (
            <span
              className="text-red-500 dark:text-red-400"
              aria-label="required"
              title="Required field"
            >
              *
            </span>
          )}
          {optional && !required && (
            <span
              className="text-gray-400 dark:text-gray-500 text-xs font-normal ml-1"
              aria-label="optional"
            >
              (optional)
            </span>
          )}
        </span>
      </label>
    );
  }
);

Label.displayName = 'Label';
