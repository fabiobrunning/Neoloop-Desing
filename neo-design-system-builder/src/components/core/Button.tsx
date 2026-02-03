import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * Button size variants
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Button visual variants
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'ghost'

/**
 * Icon position in button
 */
export type IconPosition = 'left' | 'right'

/**
 * Button component props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual variant */
  variant?: ButtonVariant
  /** Button size */
  size?: ButtonSize
  /** Whether button is in loading state */
  loading?: boolean
  /** Icon component to display */
  icon?: React.ReactNode
  /** Position of the icon */
  iconPosition?: IconPosition
  /** Whether button should take full width */
  fullWidth?: boolean
  /** Children elements */
  children?: React.ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs rounded-sm',
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
  xl: 'px-8 py-4 text-xl rounded-xl',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-300',
  tertiary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300',
  success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 disabled:bg-green-300',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 disabled:bg-yellow-300',
  info: 'bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800 disabled:bg-cyan-300',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-300',
}

/**
 * Button Component
 *
 * A versatile button component with multiple variants, sizes, and states.
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary" size="md">Click me</Button>
 *
 * // Button with icon
 * <Button icon={<Plus />} iconPosition="left">Add Item</Button>
 *
 * // Loading button
 * <Button loading>Processing...</Button>
 *
 * // Disabled button
 * <Button disabled>Can't click</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
    const disabledClasses = 'disabled:cursor-not-allowed disabled:opacity-60'
    const widthClass = fullWidth ? 'w-full' : ''

    const classes = [
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      disabledClasses,
      widthClass,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const iconElement = loading ? (
      <Loader2 className="animate-spin" size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 20 : 24} />
    ) : icon

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {iconElement && iconPosition === 'left' && (
          <span className={children ? 'mr-2' : ''}>{iconElement}</span>
        )}
        {children}
        {iconElement && iconPosition === 'right' && (
          <span className={children ? 'ml-2' : ''}>{iconElement}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
