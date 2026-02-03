import React from 'react'
import { ChevronDown, X, Search } from 'lucide-react'

/**
 * Select option type
 */
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

/**
 * Select state variants
 */
export type SelectState = 'default' | 'error' | 'success' | 'warning'

/**
 * Select component props
 */
export interface SelectProps {
  /** Array of options */
  options: SelectOption[]
  /** Selected value(s) */
  value?: string | string[]
  /** Change handler */
  onChange?: (value: string | string[]) => void
  /** Placeholder text */
  placeholder?: string
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Input state */
  state?: SelectState
  /** Whether select is disabled */
  disabled?: boolean
  /** Whether select allows multiple selection */
  multiple?: boolean
  /** Whether select is searchable */
  searchable?: boolean
  /** Whether select is in loading state */
  loading?: boolean
  /** Container className */
  containerClassName?: string
  /** Whether to show clear button */
  clearable?: boolean
}

const stateClasses: Record<SelectState, string> = {
  default: 'border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500',
  error: 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500',
  success: 'border-green-500 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500',
  warning: 'border-yellow-500 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500',
}

const helperTextColors: Record<SelectState, string> = {
  default: 'text-gray-500',
  error: 'text-red-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
}

/**
 * Select Component
 *
 * A dropdown select component with search, multi-select, and validation states.
 *
 * @example
 * ```tsx
 * const options = [
 *   { value: '1', label: 'Option 1' },
 *   { value: '2', label: 'Option 2' },
 * ]
 *
 * <Select
 *   options={options}
 *   value="1"
 *   onChange={(value) => console.log(value)}
 *   placeholder="Select option"
 * />
 * ```
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  label,
  helperText,
  state = 'default',
  disabled = false,
  multiple = false,
  searchable = false,
  loading = false,
  containerClassName = '',
  clearable = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selectedValues = React.useMemo(() => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }, [value])

  const selectedOptions = React.useMemo(() => {
    return options.filter(opt => selectedValues.includes(opt.value))
  }, [options, selectedValues])

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options
    return options.filter(opt =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [options, searchQuery])

  const handleSelect = (optionValue: string) => {
    if (disabled || loading) return

    if (multiple) {
      const newValue = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue]
      onChange?.(newValue)
    } else {
      onChange?.(optionValue)
      setIsOpen(false)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(multiple ? [] : '')
  }

  const handleToggle = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen)
    }
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const displayValue = selectedOptions.map(opt => opt.label).join(', ') || placeholder

  return (
    <div className={`w-full ${containerClassName}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <div
          onClick={handleToggle}
          className={`
            flex items-center justify-between w-full px-3 py-2 bg-white border rounded-md shadow-sm cursor-pointer transition-colors
            ${stateClasses[state]}
            ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'hover:bg-gray-50'}
          `}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <span className={selectedValues.length === 0 ? 'text-gray-400' : 'text-gray-900'}>
            {displayValue}
          </span>
          <div className="flex items-center gap-2">
            {clearable && selectedValues.length > 0 && !disabled && (
              <button
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Clear selection"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            <div className="overflow-y-auto max-h-48" role="listbox">
              {loading ? (
                <div className="px-3 py-2 text-gray-500">Loading...</div>
              ) : filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-gray-500">No options found</div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value)
                  return (
                    <div
                      key={option.value}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      className={`
                        px-3 py-2 cursor-pointer transition-colors
                        ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                      `}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                    >
                      {multiple && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mr-2 align-middle"
                          tabIndex={-1}
                        />
                      )}
                      {option.label}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>

      {helperText && (
        <p className={`mt-1 text-sm ${helperTextColors[state]}`}>
          {helperText}
        </p>
      )}
    </div>
  )
}

Select.displayName = 'Select'
