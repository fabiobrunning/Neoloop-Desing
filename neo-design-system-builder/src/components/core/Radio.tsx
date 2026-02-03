import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Radio label */
  label?: string;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
}

export interface RadioGroupProps {
  /** Radio group name */
  name: string;
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Children (Radio components) */
  children: React.ReactNode;
  /** Group label */
  label?: string;
  /** Helper text */
  helperText?: string;
}

/**
 * Radio button component
 *
 * @example
 * ```tsx
 * <Radio label="Option 1" name="group" value="1" />
 * <Radio label="Option 2" name="group" value="2" checked />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      error = false,
      helperText,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const radioId = React.useId();
    const inputId = props.id || radioId;

    const radioClassName = `
      w-4 h-4 text-blue-600
      border-gray-300 dark:border-gray-600
      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? 'border-red-500 dark:border-red-400' : ''}
      cursor-pointer
    `.trim();

    return (
      <div className={`flex items-start ${className}`}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            className={radioClassName}
            disabled={disabled}
            {...props}
          />
        </div>
        {(label || helperText) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={inputId}
                className={`
                  text-sm font-medium
                  ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 cursor-pointer'}
                  ${error ? 'text-red-600 dark:text-red-400' : ''}
                `}
              >
                {label}
              </label>
            )}
            {helperText && (
              <p className={`text-xs mt-0.5 ${error ? 'text-red-600' : 'text-gray-500'}`}>
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * Radio group component for managing multiple radio buttons
 *
 * @example
 * ```tsx
 * <RadioGroup name="choice" value={selected} onChange={setSelected} label="Choose one">
 *   <Radio label="Option 1" value="1" />
 *   <Radio label="Option 2" value="2" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  disabled = false,
  error = false,
  children,
  label,
  helperText
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div role="radiogroup" aria-label={label}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {React.Children.map(children, (child) => {
          if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
            return React.cloneElement(child, {
              name,
              checked: child.props.value === value,
              onChange: handleChange,
              disabled: disabled || child.props.disabled,
              error: error || child.props.error
            });
          }
          return child;
        })}
      </div>
      {helperText && (
        <p className={`text-xs mt-2 ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';
