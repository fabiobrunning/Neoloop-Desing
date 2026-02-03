import React from 'react'
import { FileQuestion, SearchX, Inbox, AlertCircle, PackageX } from 'lucide-react'

/**
 * Empty state icon variants
 */
export type EmptyStateIcon = 'default' | 'search' | 'inbox' | 'error' | 'package' | 'custom'

/**
 * Empty state component props
 */
export interface EmptyStateProps {
  /** Icon variant or custom icon element */
  icon?: EmptyStateIcon | React.ReactNode
  /** Title text */
  title: string
  /** Description text */
  description?: string
  /** Action button */
  action?: React.ReactNode
  /** Secondary action */
  secondaryAction?: React.ReactNode
  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg'
  /** Custom className */
  className?: string
}

const iconComponents: Record<Exclude<EmptyStateIcon, 'custom'>, React.ComponentType<{ className?: string }>> = {
  default: FileQuestion,
  search: SearchX,
  inbox: Inbox,
  error: AlertCircle,
  package: PackageX,
}

const iconSizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
}

/**
 * EmptyState Component
 *
 * Displays an empty state with icon, message, and optional action buttons.
 *
 * @example
 * ```tsx
 * // Basic empty state
 * <EmptyState
 *   icon="inbox"
 *   title="No messages"
 *   description="You don't have any messages yet"
 * />
 *
 * // With action
 * <EmptyState
 *   icon="search"
 *   title="No results found"
 *   description="Try adjusting your search filters"
 *   action={<Button>Clear filters</Button>}
 * />
 *
 * // Custom icon
 * <EmptyState
 *   icon={<CustomIcon />}
 *   title="Custom empty state"
 *   description="With a custom icon"
 *   action={<Button>Take action</Button>}
 *   secondaryAction={<Button variant="ghost">Learn more</Button>}
 * />
 * ```
 */
export function EmptyState({
  icon = 'default',
  title,
  description,
  action,
  secondaryAction,
  iconSize = 'md',
  className = '',
}: EmptyStateProps) {
  // Render icon
  const renderIcon = () => {
    if (typeof icon === 'string' && icon !== 'custom') {
      const IconComponent = iconComponents[icon]
      return <IconComponent className={`${iconSizeClasses[iconSize]} text-gray-400`} />
    }
    return icon
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}>
      {/* Icon */}
      {icon && (
        <div className="mb-4">
          {renderIcon()}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 max-w-md mb-6">
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'

/**
 * Pre-configured empty state variants
 */

export function NoResultsEmptyState({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon="search"
      title="No results found"
      description="We couldn't find any results matching your search. Try adjusting your filters or search terms."
      action={action}
    />
  )
}

NoResultsEmptyState.displayName = 'NoResultsEmptyState'

export function NoDataEmptyState({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon="inbox"
      title="No data available"
      description="There's no data to display at the moment. Try adding some data or check back later."
      action={action}
    />
  )
}

NoDataEmptyState.displayName = 'NoDataEmptyState'

export function ErrorEmptyState({ action, description }: { action?: React.ReactNode; description?: string }) {
  return (
    <EmptyState
      icon="error"
      title="Something went wrong"
      description={description || "We encountered an error while loading this content. Please try again."}
      action={action}
    />
  )
}

ErrorEmptyState.displayName = 'ErrorEmptyState'
