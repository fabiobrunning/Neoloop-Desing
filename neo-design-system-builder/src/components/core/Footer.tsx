import React from 'react';

export interface FooterLinkGroup {
  /** Group title */
  title: string;
  /** Links in the group */
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Footer logo */
  logo?: React.ReactNode;
  /** Footer description */
  description?: string;
  /** Link groups */
  linkGroups?: FooterLinkGroup[];
  /** Social links */
  socialLinks?: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
  /** Copyright text */
  copyright?: string;
  /** Bottom content */
  bottomContent?: React.ReactNode;
}

/**
 * Footer component with links, copyright, and social media
 *
 * @example
 * ```tsx
 * <Footer
 *   logo={<Logo />}
 *   description="Company description"
 *   copyright="© 2024 Company. All rights reserved."
 *   linkGroups={[
 *     { title: 'Product', links: [{ label: 'Features', href: '/features' }] }
 *   ]}
 * />
 * ```
 */
export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      logo,
      description,
      linkGroups = [],
      socialLinks = [],
      copyright,
      bottomContent,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={`
          bg-white dark:bg-gray-800
          border-t border-gray-200 dark:border-gray-700
          ${className}
        `}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and description */}
            {(logo || description) && (
              <div className="col-span-1 md:col-span-1">
                {logo && <div className="mb-4">{logo}</div>}
                {description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                )}
                {/* Social links */}
                {socialLinks.length > 0 && (
                  <div className="flex gap-4 mt-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          text-gray-500 hover:text-gray-700
                          dark:text-gray-400 dark:hover:text-gray-300
                          transition-colors duration-200
                        "
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Link groups */}
            {linkGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="
                          text-sm text-gray-600 hover:text-gray-900
                          dark:text-gray-400 dark:hover:text-gray-200
                          transition-colors duration-200
                        "
                      >
                        {link.label}
                        {link.external && (
                          <svg
                            className="inline w-3 h-3 ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            {bottomContent || (
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {copyright && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {copyright}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
