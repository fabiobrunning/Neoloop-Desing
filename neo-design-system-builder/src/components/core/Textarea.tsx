import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** Show character counter */
  showCounter?: boolean;
  /** Maximum length */
  maxLength?: number;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Auto-grow with content */
  autoGrow?: boolean;
}

/**
 * Textarea component for multiline text input
 *
 * @example
 * ```tsx
 * <Textarea label="Description" placeholder="Enter description..." />
 * <Textarea label="Bio" maxLength={500} showCounter />
 * <Textarea resize="vertical" rows={4} />
 * <Textarea autoGrow placeholder="Auto-growing textarea" />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error = false,
      helperText,
      showCounter = false,
      maxLength,
      resize = 'vertical',
      autoGrow = false,
      className = '',
      id,
      value,
      onChange,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaId = React.useId();
    const inputId = id || textareaId;
    const [charCount, setCharCount] = React.useState(0);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Resize options
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    };

    // Auto-grow functionality
    React.useEffect(() => {
      if (autoGrow && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [value, autoGrow]);

    // Track character count
    React.useEffect(() => {
      if (typeof value === 'string') {
        setCharCount(value.length);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const baseStyles = `
      block w-full px-3 py-2 rounded-lg
      border bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-500
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900
      ${resizeClasses[resize]}
    `.trim();

    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500';

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="required">*</span>
            )}
          </label>
        )}

        <textarea
          ref={(node) => {
            textareaRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          id={inputId}
          className={`${baseStyles} ${stateStyles}`}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          rows={autoGrow ? 1 : rows}
          aria-invalid={error}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          {...props}
        />

        {(helperText || showCounter) && (
          <div className="flex justify-between items-start mt-1">
            {helperText && (
              <p
                id={`${inputId}-helper`}
                className={`text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}
              >
                {helperText}
              </p>
            )}
            {showCounter && (
              <p className="text-xs text-gray-500 ml-auto">
                {charCount}{maxLength ? ` / ${maxLength}` : ''}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
