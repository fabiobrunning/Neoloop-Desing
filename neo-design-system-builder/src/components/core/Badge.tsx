import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Size of the badge */
  size?: 'sm' | 'md' | 'lg';
  /** Show dot indicator */
  dot?: boolean;
  /** Make badge removable */
  removable?: boolean;
  /** Callback when remove is clicked */
  onRemove?: () => void;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Badge/Tag component for labels, status indicators, and categories
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="success" dot>Active</Badge>
 * <Badge removable onRemove={() => console.log('removed')}>Tag</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      removable = false,
      onRemove,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors duration-200';

    // Variant styles
    const variantStyles = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base'
    };

    // Dot color based on variant
    const dotColors = {
      default: 'bg-gray-500',
      primary: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      info: 'bg-cyan-500'
    };

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `.trim();

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    return (
      <span
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {dot && (
          <span
            className={`w-2 h-2 rounded-full ${dotColors[variant]}`}
            aria-hidden="true"
          />
        )}
        <span>{children}</span>
        {removable && (
          <button
            type="button"
            onClick={handleRemove}
            className="flex-shrink-0 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current rounded-full"
            aria-label={`Remove ${children}`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
