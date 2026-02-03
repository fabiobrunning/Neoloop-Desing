import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link variant */
  variant?: 'default' | 'underline' | 'muted' | 'inline';
  /** Size of the link */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show external icon */
  external?: boolean;
  /** Disable the link */
  disabled?: boolean;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Link component with underline, visited states and accessibility
 *
 * @example
 * ```tsx
 * <Link href="/about">About</Link>
 * <Link href="https://example.com" external>External</Link>
 * <Link variant="underline" size="lg">Large Link</Link>
 * <Link disabled>Disabled Link</Link>
 * ```
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      size = 'md',
      external = false,
      disabled = false,
      className = '',
      children,
      href,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center gap-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm';

    // Variant styles
    const variantStyles = {
      default: 'text-blue-600 hover:text-blue-800 visited:text-purple-600 dark:text-blue-400 dark:hover:text-blue-300',
      underline: 'text-blue-600 hover:text-blue-800 visited:text-purple-600 underline decoration-2 underline-offset-2 hover:decoration-blue-800',
      muted: 'text-gray-600 hover:text-gray-900 visited:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
      inline: 'text-inherit hover:underline underline-offset-2'
    };

    // Size styles
    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };

    // Disabled styles
    const disabledStyles = disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer';

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${disabledStyles}
      ${className}
    `.trim();

    // Handle external links
    const externalProps = external ? {
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': `${children} (opens in new tab)`
    } : {};

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={combinedClassName}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        {...externalProps}
        {...props}
      >
        {children}
        {external && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';
