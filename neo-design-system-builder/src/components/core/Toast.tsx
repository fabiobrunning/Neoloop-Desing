import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

/**
 * Toast variant
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

/**
 * Toast position
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

/**
 * Toast item
 */
export interface Toast {
  id: string
  variant: ToastVariant
  title?: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * Toast context
 */
interface ToastContextValue {
  toasts: Toast[]
  showToast: (toast: Omit<Toast, 'id'>) => string
  hideToast: (id: string) => void
  clearAll: () => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

/**
 * Toast provider props
 */
export interface ToastProviderProps {
  children: React.ReactNode
  position?: ToastPosition
  maxToasts?: number
}

/**
 * ToastProvider Component
 *
 * Provider for toast notifications system.
 */
export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 3,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    }

    setToasts(prev => {
      const updated = [...prev, newToast]
      return updated.slice(-maxToasts)
    })

    return id
  }, [maxToasts])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  const positionClasses: Record<ToastPosition, string> = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast, clearAll }}>
      {children}
      <div className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2 pointer-events-none`}>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={() => hideToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'

/**
 * useToast hook
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

/**
 * Toast item component
 */
interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(onClose, 300)
      }, toast.duration)

      return () => clearTimeout(timer)
    }
  }, [toast.duration, onClose])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(onClose, 300)
  }

  const variantConfig: Record<ToastVariant, {
    icon: React.ComponentType<{ className?: string }>
    bgColor: string
    borderColor: string
    iconColor: string
  }> = {
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      iconColor: 'text-green-600',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      iconColor: 'text-red-600',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      iconColor: 'text-yellow-600',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconColor: 'text-blue-600',
    },
  }

  const config = variantConfig[toast.variant]
  const Icon = config.icon

  return (
    <div
      className={`
        pointer-events-auto w-96 max-w-full
        ${config.bgColor} border-l-4 ${config.borderColor}
        rounded-lg shadow-lg p-4
        transform transition-all duration-300 ease-out
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />

        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              {toast.title}
            </h4>
          )}
          <p className="text-sm text-gray-700">{toast.message}</p>

          {toast.action && (
            <button
              type="button"
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}

/**
 * Utility functions for common toast patterns
 */
export const toast = {
  success: (message: string, options?: Partial<Omit<Toast, 'id' | 'variant' | 'message'>>) => ({
    variant: 'success' as const,
    message,
    ...options,
  }),

  error: (message: string, options?: Partial<Omit<Toast, 'id' | 'variant' | 'message'>>) => ({
    variant: 'error' as const,
    message,
    ...options,
  }),

  warning: (message: string, options?: Partial<Omit<Toast, 'id' | 'variant' | 'message'>>) => ({
    variant: 'warning' as const,
    message,
    ...options,
  }),

  info: (message: string, options?: Partial<Omit<Toast, 'id' | 'variant' | 'message'>>) => ({
    variant: 'info' as const,
    message,
    ...options,
  }),
}
