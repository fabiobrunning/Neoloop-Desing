/**
 * Global State Styles
 *
 * Centralized style patterns for component states.
 * Import and use these utilities across all components for consistency.
 */

import { Loader2, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react'
import React from 'react'

/**
 * HOVER STATE
 *
 * Consistent hover effects across all interactive components.
 */
export const hoverStyles = {
  /** Default hover - subtle background change */
  default: 'hover:bg-gray-50 transition-colors duration-150',

  /** Button hover - brightness increase */
  button: 'hover:brightness-110 transition-all duration-150',

  /** Link hover - underline */
  link: 'hover:underline transition-all duration-150',

  /** Card hover - shadow increase */
  card: 'hover:shadow-lg transition-shadow duration-200',

  /** Icon hover - color change */
  icon: 'hover:text-blue-600 transition-colors duration-150',

  /** List item hover */
  listItem: 'hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150',

  /** Input hover */
  input: 'hover:border-gray-400 transition-colors duration-150',
} as const

/**
 * FOCUS STATE
 *
 * Accessible focus styles with ring indicators.
 */
export const focusStyles = {
  /** Default focus ring (blue) */
  default: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',

  /** Focus ring without offset (for inline elements) */
  inline: 'focus:outline-none focus:ring-2 focus:ring-blue-500',

  /** Focus ring for inputs */
  input: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',

  /** Focus ring for danger actions */
  danger: 'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',

  /** Focus ring for success actions */
  success: 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',

  /** Visible focus indicator (for accessibility) */
  visible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
} as const

/**
 * DISABLED STATE
 *
 * Consistent disabled appearance and behavior.
 */
export const disabledStyles = {
  /** Default disabled - opacity reduction */
  default: 'disabled:opacity-60 disabled:cursor-not-allowed',

  /** Disabled with background */
  background: 'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',

  /** Disabled pointer events */
  noPointer: 'disabled:pointer-events-none disabled:opacity-60',

  /** Aria-disabled (for non-button elements) */
  aria: 'aria-disabled:opacity-60 aria-disabled:cursor-not-allowed',
} as const

/**
 * LOADING STATE
 *
 * Loading indicators and spinners.
 */
export const loadingStyles = {
  /** Spinner animation */
  spinner: 'animate-spin',

  /** Pulse animation */
  pulse: 'animate-pulse',

  /** Loading overlay */
  overlay: 'absolute inset-0 bg-white/80 flex items-center justify-center',

  /** Loading backdrop */
  backdrop: 'bg-gray-100 animate-pulse',
} as const

/**
 * LoadingSpinner Component
 */
export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  }

  return (
    <Loader2
      className={`${loadingStyles.spinner} ${sizeClasses[size]} ${className}`}
      aria-label="Loading"
    />
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'

/**
 * SUCCESS STATE
 *
 * Success feedback indicators.
 */
export const successStyles = {
  /** Success background */
  background: 'bg-green-50 border-green-200',

  /** Success text */
  text: 'text-green-900',

  /** Success icon color */
  icon: 'text-green-600',

  /** Success button */
  button: 'bg-green-600 hover:bg-green-700 text-white',

  /** Success border */
  border: 'border-green-500',
} as const

/**
 * SuccessIcon Component
 */
export interface SuccessIconProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SuccessIcon({ size = 'md', className = '' }: SuccessIconProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <CheckCircle2
      className={`${successStyles.icon} ${sizeClasses[size]} ${className}`}
      aria-label="Success"
    />
  )
}

SuccessIcon.displayName = 'SuccessIcon'

/**
 * ERROR STATE
 *
 * Error feedback indicators.
 */
export const errorStyles = {
  /** Error background */
  background: 'bg-red-50 border-red-200',

  /** Error text */
  text: 'text-red-900',

  /** Error icon color */
  icon: 'text-red-600',

  /** Error button */
  button: 'bg-red-600 hover:bg-red-700 text-white',

  /** Error border */
  border: 'border-red-500',

  /** Error input border */
  inputBorder: 'border-red-500 focus:ring-red-500 focus:border-red-500',
} as const

/**
 * ErrorIcon Component
 */
export interface ErrorIconProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ErrorIcon({ size = 'md', className = '' }: ErrorIconProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <AlertCircle
      className={`${errorStyles.icon} ${sizeClasses[size]} ${className}`}
      aria-label="Error"
    />
  )
}

ErrorIcon.displayName = 'ErrorIcon'

/**
 * WARNING STATE
 *
 * Warning feedback indicators.
 */
export const warningStyles = {
  /** Warning background */
  background: 'bg-yellow-50 border-yellow-200',

  /** Warning text */
  text: 'text-yellow-900',

  /** Warning icon color */
  icon: 'text-yellow-600',

  /** Warning button */
  button: 'bg-yellow-600 hover:bg-yellow-700 text-white',

  /** Warning border */
  border: 'border-yellow-500',
} as const

/**
 * WarningIcon Component
 */
export interface WarningIconProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function WarningIcon({ size = 'md', className = '' }: WarningIconProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <AlertTriangle
      className={`${warningStyles.icon} ${sizeClasses[size]} ${className}`}
      aria-label="Warning"
    />
  )
}

WarningIcon.displayName = 'WarningIcon'

/**
 * INFO STATE
 *
 * Info feedback indicators.
 */
export const infoStyles = {
  /** Info background */
  background: 'bg-blue-50 border-blue-200',

  /** Info text */
  text: 'text-blue-900',

  /** Info icon color */
  icon: 'text-blue-600',

  /** Info button */
  button: 'bg-blue-600 hover:bg-blue-700 text-white',

  /** Info border */
  border: 'border-blue-500',
} as const

/**
 * Combined state utilities
 */
export const stateStyles = {
  hover: hoverStyles,
  focus: focusStyles,
  disabled: disabledStyles,
  loading: loadingStyles,
  success: successStyles,
  error: errorStyles,
  warning: warningStyles,
  info: infoStyles,
} as const

/**
 * Helper function to combine state classes
 */
export function combineStateClasses(...states: string[]): string {
  return states.filter(Boolean).join(' ')
}

/**
 * Example usage:
 *
 * ```tsx
 * import { hoverStyles, focusStyles, disabledStyles, LoadingSpinner } from './StateStyles'
 *
 * // In a button component:
 * <button
 *   className={`
 *     ${hoverStyles.button}
 *     ${focusStyles.default}
 *     ${disabledStyles.default}
 *   `}
 * >
 *   {loading ? <LoadingSpinner size="sm" /> : 'Submit'}
 * </button>
 *
 * // In an input component:
 * <input
 *   className={`
 *     ${hoverStyles.input}
 *     ${focusStyles.input}
 *     ${error ? errorStyles.inputBorder : ''}
 *   `}
 * />
 *
 * // Success message:
 * <div className={successStyles.background}>
 *   <SuccessIcon />
 *   <span className={successStyles.text}>Success!</span>
 * </div>
 * ```
 */
