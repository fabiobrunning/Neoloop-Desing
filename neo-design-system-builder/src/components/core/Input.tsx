import React from 'react'
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react'

/**
 * Input state variants
 */
export type InputState = 'default' | 'error' | 'success' | 'warning'

/**
 * Input component props
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input state for validation feedback */
  state?: InputState
  /** Helper text shown below input */
  helperText?: string
  /** Label text */
  label?: string
  /** Icon to display before input */
  icon?: React.ReactNode
  /** Prefix text */
  prefix?: string
  /** Suffix text */
  suffix?: string
  /** Whether to show character count */
  showCount?: boolean
  /** Container className */
  containerClassName?: string
}

const stateClasses: Record<InputState, string> = {
  default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
  warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500',
}

const stateIconColors: Record<InputState, string> = {
  default: 'text-gray-400',
  error: 'text-red-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
}

const helperTextColors: Record<InputState, string> = {
  default: 'text-gray-500',
  error: 'text-red-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
}

/**
 * Input Component
 *
 * A flexible input component with validation states, icons, and helper text.
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input type="text" placeholder="Enter name" />
 *
 * // With label and helper text
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   helperText="We'll never share your email"
 * />
 *
 * // Error state
 * <Input
 *   state="error"
 *   value="invalid"
 *   helperText="Please enter a valid email"
 * />
 *
 * // With prefix
 * <Input prefix="$" type="number" placeholder="0.00" />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      state = 'default',
      helperText,
      label,
      icon,
      prefix,
      suffix,
      showCount = false,
      maxLength,
      type = 'text',
      disabled,
      className = '',
      containerClassName = '',
      id,
      value,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(value || '')

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const currentValue = value !== undefined ? value : internalValue
    const currentLength = String(currentValue).length

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value)
      }
      props.onChange?.(e)
    }

    const inputType = type === 'password' && showPassword ? 'text' : type

    const StateIcon = state === 'error' ? AlertCircle : state === 'success' ? Check : null

    const baseClasses = 'block w-full rounded-md border shadow-sm transition-colors duration-150'
    const paddingClasses = 'px-3 py-2'
    const textClasses = 'text-gray-900 placeholder:text-gray-400'
    const disabledClasses = 'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed'
    const focusClasses = 'focus:outline-none focus:ring-1'

    const hasPrefix = Boolean(prefix || icon)
    const hasSuffix = Boolean(suffix || (type === 'password') || StateIcon)

    const classes = [
      baseClasses,
      paddingClasses,
      textClasses,
      disabledClasses,
      focusClasses,
      stateClasses[state],
      hasPrefix && 'pl-10',
      hasSuffix && 'pr-10',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {/* Prefix or Icon */}
          {hasPrefix && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon || <span className="text-gray-500">{prefix}</span>}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            id={inputId}
            className={classes}
            disabled={disabled}
            maxLength={maxLength}
            value={currentValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={state === 'error'}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            onChange={handleChange}
            {...props}
          />

          {/* Suffix or State Icon */}
          {hasSuffix && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
              {StateIcon && !showCount && (
                <StateIcon size={18} className={stateIconColors[state]} />
              )}
              {suffix && <span className="text-gray-500">{suffix}</span>}
            </div>
          )}
        </div>

        {/* Helper Text and Character Count */}
        {(helperText || showCount) && (
          <div className="flex justify-between items-start mt-1">
            {helperText && (
              <p
                id={`${inputId}-helper`}
                className={`text-sm ${helperTextColors[state]}`}
              >
                {helperText}
              </p>
            )}
            {showCount && maxLength && (
              <span className="text-sm text-gray-500 ml-auto">
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
