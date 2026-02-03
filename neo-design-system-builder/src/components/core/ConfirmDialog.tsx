import React from 'react'
import { AlertTriangle, AlertCircle, Info, HelpCircle } from 'lucide-react'

/**
 * Confirm dialog variant
 */
export type ConfirmDialogVariant = 'default' | 'danger' | 'warning' | 'info'

/**
 * Confirm dialog props
 */
export interface ConfirmDialogProps {
  /** Whether dialog is open */
  open: boolean
  /** Close handler */
  onClose: () => void
  /** Confirm handler */
  onConfirm: () => void | Promise<void>
  /** Dialog title */
  title: string
  /** Dialog description */
  description?: string
  /** Confirm button text */
  confirmText?: string
  /** Cancel button text */
  cancelText?: string
  /** Dialog variant */
  variant?: ConfirmDialogVariant
  /** Loading state */
  loading?: boolean
  /** Show icon */
  showIcon?: boolean
}

/**
 * ConfirmDialog Component
 *
 * Modal confirmation dialog for destructive or important actions.
 *
 * @example
 * ```tsx
 * // Danger confirmation
 * <ConfirmDialog
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Delete item"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   variant="danger"
 *   confirmText="Delete"
 * />
 *
 * // Default confirmation
 * <ConfirmDialog
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleSave}
 *   title="Save changes"
 *   description="Do you want to save your changes?"
 *   confirmText="Save"
 * />
 * ```
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false,
  showIcon = true,
}: ConfirmDialogProps) {
  const [isConfirming, setIsConfirming] = React.useState(false)

  const handleConfirm = async () => {
    setIsConfirming(true)
    try {
      await onConfirm()
      onClose()
    } finally {
      setIsConfirming(false)
    }
  }

  if (!open) return null

  const variantConfig: Record<ConfirmDialogVariant, {
    icon: React.ComponentType<{ className?: string }>
    iconColor: string
    confirmButtonClass: string
  }> = {
    default: {
      icon: HelpCircle,
      iconColor: 'text-blue-600',
      confirmButtonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    danger: {
      icon: AlertCircle,
      iconColor: 'text-red-600',
      confirmButtonClass: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      confirmButtonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-600',
      confirmButtonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  }

  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <div className="flex items-start gap-4">
            {showIcon && (
              <div className={`flex-shrink-0 ${config.iconColor}`}>
                <Icon className="h-6 w-6" />
              </div>
            )}

            <div className="flex-1">
              <h3
                id="confirm-dialog-title"
                className="text-lg font-semibold text-gray-900 mb-2"
              >
                {title}
              </h3>

              {description && (
                <p
                  id="confirm-dialog-description"
                  className="text-sm text-gray-600 mb-6"
                >
                  {description}
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isConfirming || loading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isConfirming || loading}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-md
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors
                    ${config.confirmButtonClass}
                  `}
                >
                  {isConfirming || loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </span>
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'

/**
 * useConfirmDialog hook
 *
 * Simplified hook for using confirm dialogs.
 */
export function useConfirmDialog() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [config, setConfig] = React.useState<Omit<ConfirmDialogProps, 'open' | 'onClose'> | null>(null)

  const confirm = React.useCallback((props: Omit<ConfirmDialogProps, 'open' | 'onClose' | 'onConfirm'> & {
    onConfirm: () => void | Promise<void>
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfig({
        ...props,
        onConfirm: async () => {
          await props.onConfirm()
          resolve(true)
        },
      })
      setIsOpen(true)
    })
  }, [])

  const handleClose = React.useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setConfig(null), 300)
  }, [])

  const ConfirmDialogComponent = config ? (
    <ConfirmDialog
      {...config}
      open={isOpen}
      onClose={handleClose}
    />
  ) : null

  return {
    confirm,
    ConfirmDialog: ConfirmDialogComponent,
  }
}
