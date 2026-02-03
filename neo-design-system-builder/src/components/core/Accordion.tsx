import React from 'react';

export interface AccordionItemProps {
  /** Unique identifier */
  id: string;
  /** Item title */
  title: string;
  /** Item content */
  content: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Icon for the item */
  icon?: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accordion items */
  items: AccordionItemProps[];
  /** Allow multiple items open */
  multiple?: boolean;
  /** Initially expanded items (by id) */
  defaultExpanded?: string[];
  /** Variant style */
  variant?: 'default' | 'bordered' | 'separated';
}

/**
 * Accordion/Collapse component for expandable content
 *
 * @example
 * ```tsx
 * <Accordion items={[
 *   { id: '1', title: 'Section 1', content: <p>Content 1</p> },
 *   { id: '2', title: 'Section 2', content: <p>Content 2</p> }
 * ]} />
 * <Accordion items={items} multiple defaultExpanded={['1']} />
 * ```
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      multiple = false,
      defaultExpanded = [],
      variant = 'default',
      className = '',
      ...props
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = React.useState<string[]>(defaultExpanded);

    const toggleItem = (itemId: string) => {
      setExpandedItems((prev) => {
        if (multiple) {
          return prev.includes(itemId)
            ? prev.filter((id) => id !== itemId)
            : [...prev, itemId];
        } else {
          return prev.includes(itemId) ? [] : [itemId];
        }
      });
    };

    const isExpanded = (itemId: string) => expandedItems.includes(itemId);

    // Variant styles
    const variantStyles = {
      default: 'space-y-0',
      bordered: 'border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700',
      separated: 'space-y-2'
    };

    const itemStyles = {
      default: '',
      bordered: '',
      separated: 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'
    };

    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        {items.map((item) => {
          const expanded = isExpanded(item.id);

          return (
            <div key={item.id} className={itemStyles[variant]}>
              {/* Header/Trigger */}
              <button
                type="button"
                onClick={() => !item.disabled && toggleItem(item.id)}
                disabled={item.disabled}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-3
                  text-left font-medium
                  bg-white dark:bg-gray-800
                  hover:bg-gray-50 dark:hover:bg-gray-700/50
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${variant === 'separated' ? 'rounded-t-lg' : ''}
                `}
                aria-expanded={expanded}
                aria-controls={`accordion-content-${item.id}`}
              >
                <span className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  {item.icon}
                  {item.title}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Content */}
              <div
                id={`accordion-content-${item.id}`}
                className={`
                  overflow-hidden transition-all duration-300
                  ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                `}
                aria-hidden={!expanded}
              >
                <div className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
