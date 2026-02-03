import React from 'react';

export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Variant based on message type */
  variant?: 'info' | 'error' | 'success' | 'warning';
  /** Size of the text */
  size?: 'sm' | 'md';
  /** Show icon */
  showIcon?: boolean;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Helper text component for form fields and contextual information
 *
 * @example
 * ```tsx
 * <HelperText>Enter your email address</HelperText>
 * <HelperText variant="error">Invalid email format</HelperText>
 * <HelperText variant="success" showIcon>Email verified</HelperText>
 * ```
 */
export const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  (
    {
      variant = 'info',
      size = 'sm',
      showIcon = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Variant styles and icons
    const variantConfig = {
      info: {
        color: 'text-gray-600 dark:text-gray-400',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
      },
      error: {
        color: 'text-red-600 dark:text-red-400',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      },
      success: {
        color: 'text-green-600 dark:text-green-400',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      },
      warning: {
        color: 'text-yellow-600 dark:text-yellow-400',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      }
    };

    // Size styles
    const sizeStyles = {
      sm: 'text-xs',
      md: 'text-sm'
    };

    const config = variantConfig[variant];

    const combinedClassName = `
      flex items-start gap-1.5 mt-1
      ${sizeStyles[size]}
      ${config.color}
      ${className}
    `.trim();

    return (
      <p
        ref={ref}
        className={combinedClassName}
        role={variant === 'error' ? 'alert' : undefined}
        aria-live={variant === 'error' ? 'polite' : undefined}
        {...props}
      >
        {showIcon && <span className="flex-shrink-0 mt-0.5" aria-hidden="true">{config.icon}</span>}
        <span>{children}</span>
      </p>
    );
  }
);

HelperText.displayName = 'HelperText';
