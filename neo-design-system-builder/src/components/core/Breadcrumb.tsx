import React from 'react';

export interface BreadcrumbItem {
  /** Item label */
  label: string;
  /** Item href */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Icon element */
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator character or element */
  separator?: React.ReactNode;
  /** Max items to show before truncation */
  maxItems?: number;
  /** Show home icon for first item */
  showHomeIcon?: boolean;
}

/**
 * Breadcrumb navigation component
 *
 * @example
 * ```tsx
 * <Breadcrumb items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Item' }
 * ]} />
 * <Breadcrumb items={items} separator=">" maxItems={3} />
 * ```
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator = '/',
      maxItems,
      showHomeIcon = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const defaultSeparator = typeof separator === 'string' ? (
      <span className="mx-2 text-gray-400" aria-hidden="true">{separator}</span>
    ) : separator;

    const homeIcon = (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    );

    // Handle truncation
    let displayItems = items;
    if (maxItems && items.length > maxItems) {
      const firstItems = items.slice(0, 1);
      const lastItems = items.slice(-(maxItems - 1));
      displayItems = [
        ...firstItems,
        { label: '...', href: undefined },
        ...lastItems
      ];
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={`flex items-center text-sm ${className}`}
        {...props}
      >
        <ol className="flex items-center">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isFirst = index === 0;
            const isEllipsis = item.label === '...';

            return (
              <li key={index} className="flex items-center">
                {index > 0 && defaultSeparator}

                {isEllipsis ? (
                  <span className="px-2 text-gray-500">...</span>
                ) : isLast ? (
                  <span
                    className="font-medium text-gray-900 dark:text-gray-100"
                    aria-current="page"
                  >
                    {item.icon}
                    {showHomeIcon && isFirst ? homeIcon : item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className="
                      flex items-center gap-1
                      text-gray-600 hover:text-gray-900
                      dark:text-gray-400 dark:hover:text-gray-200
                      transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500 rounded
                    "
                  >
                    {item.icon}
                    {showHomeIcon && isFirst ? homeIcon : item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
