import React from 'react';

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon before text */
  startIcon?: React.ReactNode;
  /** Icon after text */
  endIcon?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Pill-shaped button variant with rounded ends
 *
 * @example
 * ```tsx
 * <PillButton>Click me</PillButton>
 * <PillButton variant="primary" startIcon={<PlusIcon />}>Add Item</PillButton>
 * <PillButton variant="outline" size="sm">Small Pill</PillButton>
 * ```
 */
export const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  (
    {
      variant = 'default',
      size = 'md',
      startIcon,
      endIcon,
      loading = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles with pill shape (full rounded)
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-full
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `.trim();

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-6 py-2 text-base',
      lg: 'px-8 py-3 text-lg'
    };

    // Variant styles
    const variantStyles = {
      default: `
        bg-gray-100 text-gray-700 hover:bg-gray-200
        dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
        focus:ring-gray-500
      `,
      primary: `
        bg-blue-600 text-white hover:bg-blue-700
        dark:bg-blue-500 dark:hover:bg-blue-600
        focus:ring-blue-500
      `,
      success: `
        bg-green-600 text-white hover:bg-green-700
        dark:bg-green-500 dark:hover:bg-green-600
        focus:ring-green-500
      `,
      warning: `
        bg-yellow-600 text-white hover:bg-yellow-700
        dark:bg-yellow-500 dark:hover:bg-yellow-600
        focus:ring-yellow-500
      `,
      error: `
        bg-red-600 text-white hover:bg-red-700
        dark:bg-red-500 dark:hover:bg-red-600
        focus:ring-red-500
      `,
      outline: `
        border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50
        dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800
        focus:ring-gray-500
      `
    };

    const combinedClassName = `
      ${baseStyles}
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${className}
    `.trim();

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className={`${iconSizes[size]} animate-spin`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          startIcon && <span className={iconSizes[size]}>{startIcon}</span>
        )}
        <span>{children}</span>
        {!loading && endIcon && <span className={iconSizes[size]}>{endIcon}</span>}
      </button>
    );
  }
);

PillButton.displayName = 'PillButton';
