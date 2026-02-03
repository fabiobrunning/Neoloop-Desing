import React from 'react'
import { ChevronRight, MoreVertical } from 'lucide-react'

/**
 * List item data structure
 */
export interface ListItem {
  /** Unique item identifier */
  id: string
  /** Primary text */
  primary: React.ReactNode
  /** Secondary text (optional) */
  secondary?: React.ReactNode
  /** Tertiary text (optional) */
  tertiary?: React.ReactNode
  /** Avatar/icon element */
  avatar?: React.ReactNode
  /** Action buttons */
  actions?: React.ReactNode
  /** Whether item is disabled */
  disabled?: boolean
  /** Custom metadata */
  metadata?: Record<string, unknown>
}

/**
 * List component props
 */
export interface ListProps {
  /** List items */
  items: ListItem[]
  /** Item click handler */
  onItemClick?: (item: ListItem, index: number) => void
  /** Whether items are clickable/hoverable */
  interactive?: boolean
  /** Show dividers between items */
  dividers?: boolean
  /** Dense spacing */
  dense?: boolean
  /** Show chevron on interactive items */
  showChevron?: boolean
  /** Empty state message */
  emptyMessage?: string
  /** Loading state */
  loading?: boolean
  /** Custom className */
  className?: string
}

/**
 * List Component
 *
 * Versatile list component for displaying items with avatar, text, and actions.
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: '1',
 *     avatar: <Avatar name="John Doe" />,
 *     primary: 'John Doe',
 *     secondary: 'john@example.com',
 *     tertiary: 'Last seen 2 hours ago',
 *     actions: <Button variant="ghost" size="sm">Edit</Button>
 *   }
 * ]
 *
 * <List
 *   items={items}
 *   interactive
 *   onItemClick={(item) => console.log(item)}
 *   showChevron
 * />
 * ```
 */
export function List({
  items,
  onItemClick,
  interactive = false,
  dividers = true,
  dense = false,
  showChevron = false,
  emptyMessage = 'No items available',
  loading = false,
  className = '',
}: ListProps) {
  const paddingClass = dense ? 'px-4 py-2' : 'px-6 py-4'

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
        <div className="flex items-center justify-center gap-2 py-12 text-gray-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          Loading...
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
        <div className="py-12 text-center text-gray-500">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <ul className={dividers ? 'divide-y divide-gray-200' : ''} role="list">
        {items.map((item, index) => {
          const isInteractive = interactive && !item.disabled
          const hasActions = Boolean(item.actions)

          return (
            <li
              key={item.id}
              onClick={() => {
                if (isInteractive && onItemClick) {
                  onItemClick(item, index)
                }
              }}
              className={`
                ${paddingClass}
                ${isInteractive ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors' : ''}
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                flex items-center gap-4
              `}
            >
              {/* Avatar/Icon */}
              {item.avatar && (
                <div className="flex-shrink-0">
                  {item.avatar}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Primary text */}
                <div className="text-sm font-medium text-gray-900 truncate">
                  {item.primary}
                </div>

                {/* Secondary text */}
                {item.secondary && (
                  <div className="text-sm text-gray-600 truncate mt-0.5">
                    {item.secondary}
                  </div>
                )}

                {/* Tertiary text */}
                {item.tertiary && (
                  <div className="text-xs text-gray-500 truncate mt-0.5">
                    {item.tertiary}
                  </div>
                )}
              </div>

              {/* Actions */}
              {hasActions && (
                <div className="flex-shrink-0 flex items-center gap-2">
                  {item.actions}
                </div>
              )}

              {/* Chevron */}
              {showChevron && isInteractive && (
                <div className="flex-shrink-0">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

List.displayName = 'List'

/**
 * ListItem Sub-component
 *
 * Standalone list item component for custom list implementations.
 */
export interface ListItemComponentProps {
  /** Primary text */
  primary: React.ReactNode
  /** Secondary text */
  secondary?: React.ReactNode
  /** Tertiary text */
  tertiary?: React.ReactNode
  /** Avatar/icon */
  avatar?: React.ReactNode
  /** Action buttons */
  actions?: React.ReactNode
  /** Click handler */
  onClick?: () => void
  /** Disabled state */
  disabled?: boolean
  /** Dense spacing */
  dense?: boolean
  /** Show chevron */
  showChevron?: boolean
  /** Custom className */
  className?: string
}

export function ListItem({
  primary,
  secondary,
  tertiary,
  avatar,
  actions,
  onClick,
  disabled = false,
  dense = false,
  showChevron = false,
  className = '',
}: ListItemComponentProps) {
  const paddingClass = dense ? 'px-4 py-2' : 'px-6 py-4'
  const isInteractive = Boolean(onClick) && !disabled

  return (
    <div
      onClick={onClick}
      className={`
        ${paddingClass}
        ${isInteractive ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        flex items-center gap-4
        ${className}
      `}
    >
      {avatar && <div className="flex-shrink-0">{avatar}</div>}

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{primary}</div>
        {secondary && <div className="text-sm text-gray-600 truncate mt-0.5">{secondary}</div>}
        {tertiary && <div className="text-xs text-gray-500 truncate mt-0.5">{tertiary}</div>}
      </div>

      {actions && <div className="flex-shrink-0 flex items-center gap-2">{actions}</div>}

      {showChevron && isInteractive && (
        <div className="flex-shrink-0">
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      )}
    </div>
  )
}

ListItem.displayName = 'ListItem'
