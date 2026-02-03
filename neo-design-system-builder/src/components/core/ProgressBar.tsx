import React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0-100) */
  value?: number;
  /** Max value */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Show percentage label */
  showLabel?: boolean;
  /** Indeterminate loading state */
  indeterminate?: boolean;
  /** Label text */
  label?: string;
}

/**
 * Progress bar component for determinate and indeterminate loading states
 *
 * @example
 * ```tsx
 * <ProgressBar value={75} />
 * <ProgressBar value={100} variant="success" showLabel />
 * <ProgressBar indeterminate />
 * <ProgressBar value={45} label="Uploading..." />
 * ```
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      max = 100,
      size = 'md',
      variant = 'default',
      showLabel = false,
      indeterminate = false,
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    // Clamp value between 0 and max
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Size styles
    const sizeStyles = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    };

    // Variant colors
    const variantColors = {
      default: 'bg-blue-600 dark:bg-blue-500',
      success: 'bg-green-600 dark:bg-green-500',
      warning: 'bg-yellow-600 dark:bg-yellow-500',
      error: 'bg-red-600 dark:bg-red-500'
    };

    return (
      <div ref={ref} className={`w-full ${className}`} {...props}>
        {(label || showLabel) && (
          <div className="flex justify-between items-center mb-1">
            {label && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            )}
            {showLabel && !indeterminate && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        <div
          className={`
            w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden
            ${sizeStyles[size]}
          `}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
        >
          {indeterminate ? (
            <div
              className={`
                h-full ${variantColors[variant]} rounded-full
                animate-indeterminate
              `}
              style={{ width: '40%' }}
            />
          ) : (
            <div
              className={`
                h-full ${variantColors[variant]} rounded-full
                transition-all duration-300 ease-out
              `}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
