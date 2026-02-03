import React from 'react';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo element */
  logo?: React.ReactNode;
  /** Navigation items */
  children?: React.ReactNode;
  /** Actions (buttons, user menu, etc.) */
  actions?: React.ReactNode;
  /** Sticky header */
  sticky?: boolean;
  /** Transparent background */
  transparent?: boolean;
  /** Mobile menu open state */
  mobileMenuOpen?: boolean;
  /** Toggle mobile menu */
  onMobileMenuToggle?: () => void;
}

/**
 * Navbar/Header component for top navigation
 *
 * @example
 * ```tsx
 * <Navbar logo={<Logo />} actions={<UserMenu />}>
 *   <NavLink href="/">Home</NavLink>
 *   <NavLink href="/about">About</NavLink>
 * </Navbar>
 * ```
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      logo,
      children,
      actions,
      sticky = false,
      transparent = false,
      mobileMenuOpen = false,
      onMobileMenuToggle,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={`
          ${sticky ? 'sticky top-0 z-40' : ''}
          ${transparent ? 'bg-transparent' : 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'}
          transition-colors duration-200
          ${className}
        `}
        {...props}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            {logo && (
              <div className="flex-shrink-0">
                {logo}
              </div>
            )}

            {/* Desktop Navigation */}
            {children && (
              <div className="hidden md:flex md:items-center md:gap-6 flex-1 ml-10">
                {children}
              </div>
            )}

            {/* Actions */}
            {actions && (
              <div className="hidden md:flex md:items-center md:gap-3">
                {actions}
              </div>
            )}

            {/* Mobile menu button */}
            {onMobileMenuToggle && (
              <div className="flex md:hidden">
                <button
                  type="button"
                  onClick={onMobileMenuToggle}
                  className="
                    inline-flex items-center justify-center p-2 rounded-lg
                    text-gray-400 hover:text-gray-500 hover:bg-gray-100
                    dark:hover:bg-gray-700
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                  "
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col gap-2">
                {children}
              </div>
              {actions && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {actions}
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Active state */
  active?: boolean;
  /** Children */
  children: React.ReactNode;
}

/**
 * Navigation link for Navbar
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ active = false, children, className = '', ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`
          px-3 py-2 rounded-lg text-sm font-medium
          transition-colors duration-200
          ${active
            ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30'
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${className}
        `}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = 'NavLink';
