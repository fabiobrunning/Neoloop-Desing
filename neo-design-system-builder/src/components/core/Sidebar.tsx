import React from 'react';

export interface SidebarItemProps {
  /** Item label */
  label: string;
  /** Item icon */
  icon?: React.ReactNode;
  /** Item href */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Active state */
  active?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Nested items */
  children?: SidebarItemProps[];
  /** Badge text */
  badge?: string | number;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar items */
  items: SidebarItemProps[];
  /** Collapsed state */
  collapsed?: boolean;
  /** Toggle collapsed state */
  onToggleCollapse?: () => void;
  /** Show toggle button */
  showToggleButton?: boolean;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
}

/**
 * Sidebar navigation component with collapsible state and nested items
 *
 * @example
 * ```tsx
 * <Sidebar items={[
 *   { label: 'Dashboard', icon: <HomeIcon />, href: '/', active: true },
 *   { label: 'Settings', icon: <SettingsIcon />, href: '/settings' }
 * ]} />
 * <Sidebar items={items} collapsed={isCollapsed} onToggleCollapse={toggle} />
 * ```
 */
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      collapsed = false,
      onToggleCollapse,
      showToggleButton = true,
      header,
      footer,
      className = '',
      ...props
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

    const toggleExpanded = (label: string) => {
      setExpandedItems((prev) =>
        prev.includes(label)
          ? prev.filter((item) => item !== label)
          : [...prev, label]
      );
    };

    const SidebarItem: React.FC<{ item: SidebarItemProps; level?: number }> = ({ item, level = 0 }) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.includes(item.label);

      const handleClick = () => {
        if (hasChildren) {
          toggleExpanded(item.label);
        }
        item.onClick?.();
      };

      const itemContent = (
        <>
          {item.icon && (
            <span className="flex-shrink-0 w-5 h-5" aria-hidden="true">
              {item.icon}
            </span>
          )}
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <svg
                  className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </>
          )}
        </>
      );

      const itemClasses = `
        flex items-center gap-3 w-full
        px-3 py-2 rounded-lg
        text-sm font-medium
        transition-colors duration-200
        ${collapsed ? 'justify-center' : ''}
        ${item.active
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }
        ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${level > 0 ? 'ml-' + (level * 4) : ''}
      `.trim();

      return (
        <div>
          {item.href ? (
            <a href={item.href} className={itemClasses} onClick={handleClick}>
              {itemContent}
            </a>
          ) : (
            <button
              type="button"
              className={itemClasses}
              onClick={handleClick}
              disabled={item.disabled}
            >
              {itemContent}
            </button>
          )}

          {/* Nested items */}
          {hasChildren && isExpanded && !collapsed && (
            <div className="mt-1 space-y-1">
              {item.children!.map((child, index) => (
                <SidebarItem key={index} item={child} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <aside
        ref={ref}
        className={`
          flex flex-col h-full
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          transition-all duration-300
          ${collapsed ? 'w-16' : 'w-64'}
          ${className}
        `}
        {...props}
      >
        {/* Header */}
        {header && (
          <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${collapsed ? 'px-2' : ''}`}>
            {header}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </nav>

        {/* Footer */}
        {footer && (
          <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${collapsed ? 'px-2' : ''}`}>
            {footer}
          </div>
        )}

        {/* Toggle button */}
        {showToggleButton && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="
              p-4 border-t border-gray-200 dark:border-gray-700
              text-gray-500 hover:text-gray-700 hover:bg-gray-100
              dark:hover:text-gray-300 dark:hover:bg-gray-700
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
            "
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className={`w-5 h-5 mx-auto transform transition-transform ${collapsed ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';
