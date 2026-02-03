import React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'default' | 'white' | 'primary';
  /** Loading text for screen readers */
  label?: string;
}

/**
 * Spinner/Loader component for loading states
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" />
 * <Spinner variant="white" label="Loading content..." />
 * ```
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      variant = 'default',
      label = 'Loading...',
      className = '',
      ...props
    },
    ref
  ) => {
    // Size styles
    const sizeStyles = {
      sm: 'w-4 h-4 border-2',
      md: 'w-8 h-8 border-2',
      lg: 'w-12 h-12 border-3'
    };

    // Variant colors
    const variantColors = {
      default: 'border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400',
      white: 'border-white/30 border-t-white',
      primary: 'border-blue-200 border-t-blue-600 dark:border-blue-800 dark:border-t-blue-400'
    };

    return (
      <div
        ref={ref}
        className={`inline-block ${className}`}
        role="status"
        aria-live="polite"
        aria-label={label}
        {...props}
      >
        <div
          className={`
            ${sizeStyles[size]}
            ${variantColors[variant]}
            rounded-full
            animate-spin
          `}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
