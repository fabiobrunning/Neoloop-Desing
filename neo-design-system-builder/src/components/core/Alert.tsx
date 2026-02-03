import React, { useState } from 'react'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

/**
 * Alert variant
 */
export type AlertVariant = 'success' | 'error' | 'warning' | 'info'

/**
 * Alert component props
 */
export interface AlertProps {
  /** Alert variant */
  variant?: AlertVariant
  /** Alert title */
  title?: string
  /** Alert message */
  message: React.ReactNode
  /** Whether alert is dismissible */
  dismissible?: boolean
  /** Dismiss handler */
  onDismiss?: () => void
  /** Action button */
  action?: {
    label: string
    onClick: () => void
  }
  /** Show icon */
  showIcon?: boolean
  /** Custom icon */
  icon?: React.ReactNode
  /** Custom className */
  className?: string
}

/**
 * Alert Component
 *
 * Banner-style alert for displaying important messages.
 *
 * @example
 * ```tsx
 * // Success alert
 * <Alert
 *   variant="success"
 *   title="Success"
 *   message="Your changes have been saved."
 *   dismissible
 * />
 *
 * // Error with action
 * <Alert
 *   variant="error"
 *   title="Error"
 *   message="Failed to save changes."
 *   action={{
 *     label: 'Retry',
 *     onClick: handleRetry
 *   }}
 * />
 *
 * // Warning
 * <Alert
 *   variant="warning"
 *   message="Your session will expire soon."
 *   dismissible
 * />
 * ```
 */
export function Alert({
  variant = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  action,
  showIcon = true,
  icon: customIcon,
  className = '',
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  const variantConfig: Record<AlertVariant, {
    icon: React.ComponentType<{ className?: string }>
    bgColor: string
    borderColor: string
    iconColor: string
    textColor: string
  }> = {
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
    },
  }

  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <div
      className={`
        ${config.bgColor} border ${config.borderColor}
        rounded-lg p-4
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {showIcon && (
          <div className="flex-shrink-0">
            {customIcon || <Icon className={`h-5 w-5 ${config.iconColor}`} />}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`text-sm font-semibold ${config.textColor} mb-1`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${config.textColor}`}>
            {message}
          </div>

          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={`mt-2 text-sm font-medium ${config.iconColor} hover:underline`}
            >
              {action.label}
            </button>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={`flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors ${config.iconColor}`}
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

Alert.displayName = 'Alert'
