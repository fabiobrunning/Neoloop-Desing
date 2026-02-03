import React from 'react';

export interface LoginCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Logo element */
  logo?: React.ReactNode;
  /** Children (form elements) */
  children: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Max width */
  maxWidth?: 'sm' | 'md' | 'lg';
}

/**
 * Specialized card component for authentication forms
 *
 * @example
 * ```tsx
 * <LoginCard
 *   title="Welcome back"
 *   subtitle="Sign in to your account"
 *   logo={<Logo />}
 *   footer={<p>Don't have an account? <Link href="/signup">Sign up</Link></p>}
 * >
 *   <form>
 *     <Input type="email" label="Email" />
 *     <Input type="password" label="Password" />
 *     <Button type="submit">Sign In</Button>
 *   </form>
 * </LoginCard>
 * ```
 */
export const LoginCard = React.forwardRef<HTMLDivElement, LoginCardProps>(
  (
    {
      title,
      subtitle,
      logo,
      children,
      footer,
      loading = false,
      maxWidth = 'sm',
      className = '',
      ...props
    },
    ref
  ) => {
    const maxWidthStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg'
    };

    return (
      <div
        ref={ref}
        className={`
          w-full ${maxWidthStyles[maxWidth]}
          bg-white dark:bg-gray-800
          rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
          ${className}
        `}
        {...props}
      >
        {/* Header */}
        <div className="p-8 pb-6 text-center">
          {logo && <div className="mb-6 flex justify-center">{logo}</div>}
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="px-8 pb-8 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center rounded-b-xl z-10">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="w-8 h-8 animate-spin text-blue-600"
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
                <span className="text-sm text-gray-600 dark:text-gray-400">Loading...</span>
              </div>
            </div>
          )}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-8 pb-8 pt-0 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

LoginCard.displayName = 'LoginCard';
