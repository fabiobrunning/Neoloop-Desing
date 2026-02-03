import React from 'react'
import { Check, Minus } from 'lucide-react'

/**
 * Checkbox props
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Whether checkbox is checked */
  checked?: boolean
  /** Whether checkbox is in indeterminate state */
  indeterminate?: boolean
  /** Label text */
  label?: string
  /** Error message or state */
  error?: string | boolean
  /** Helper text */
  helperText?: string
  /** Custom className for container */
  containerClassName?: string
}

/**
 * Checkbox Component
 *
 * A checkbox input with support for checked, unchecked, and indeterminate states.
 *
 * @example
 * ```tsx
 * // Basic checkbox
 * <Checkbox label="Accept terms" />
 *
 * // Controlled checkbox
 * <Checkbox
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 *   label="I agree to the terms"
 * />
 *
 * // Indeterminate state (for "select all" checkboxes)
 * <Checkbox
 *   indeterminate={true}
 *   label="Select all"
 * />
 *
 * // With error
 * <Checkbox
 *   error="You must accept the terms"
 *   label="Accept terms"
 * />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      indeterminate = false,
      label,
      error,
      helperText,
      disabled,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!)

    // Handle indeterminate state
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    const hasError = Boolean(error)
    const errorMessage = typeof error === 'string' ? error : undefined

    const checkboxClasses = [
      'w-5 h-5 rounded border-2 transition-colors cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      !hasError && !disabled && 'border-gray-300 text-blue-600 focus:ring-blue-500',
      hasError && 'border-red-500 text-red-600 focus:ring-red-500',
      disabled && 'cursor-not-allowed opacity-50',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={`flex flex-col ${containerClassName}`}>
        <div className="flex items-start">
          <div className="relative flex items-center h-5">
            <input
              ref={inputRef}
              type="checkbox"
              id={checkboxId}
              className="sr-only peer"
              checked={checked}
              disabled={disabled}
              aria-invalid={hasError}
              aria-describedby={
                errorMessage || helperText ? `${checkboxId}-description` : undefined
              }
              {...props}
            />
            <div
              className={`
                ${checkboxClasses}
                peer-checked:bg-blue-600 peer-checked:border-blue-600
                peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-blue-500
                ${hasError ? 'border-red-500' : 'border-gray-300'}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                flex items-center justify-center
              `}
            >
              {checked && !indeterminate && (
                <Check size={14} className="text-white" strokeWidth={3} />
              )}
              {indeterminate && (
                <Minus size={14} className="text-white" strokeWidth={3} />
              )}
            </div>
          </div>

          {label && (
            <label
              htmlFor={checkboxId}
              className={`
                ml-3 text-sm cursor-pointer select-none
                ${hasError ? 'text-red-700' : 'text-gray-700'}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              {label}
            </label>
          )}
        </div>

        {(errorMessage || helperText) && (
          <p
            id={`${checkboxId}-description`}
            className={`mt-1 ml-8 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'
              }`}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
