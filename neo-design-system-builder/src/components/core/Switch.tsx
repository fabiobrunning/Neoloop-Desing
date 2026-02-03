import React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
}

/**
 * Switch/Toggle component for boolean states
 *
 * @example
 * ```tsx
 * <Switch label="Enable notifications" />
 * <Switch label="Dark mode" checked onChange={(checked) => setDarkMode(checked)} />
 * <Switch size="lg" labelPosition="left" label="Premium" />
 * ```
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      labelPosition = 'right',
      size = 'md',
      checked = false,
      onChange,
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const switchId = React.useId();
    const inputId = id || switchId;

    // Size configurations
    const sizeConfig = {
      sm: {
        track: 'w-8 h-4',
        thumb: 'w-3 h-3',
        translate: 'translate-x-4'
      },
      md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5'
      },
      lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: 'translate-x-7'
      }
    };

    const config = sizeConfig[size];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    const switchElement = (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? `${inputId}-label` : undefined}
        disabled={disabled}
        onClick={() => {
          const input = document.getElementById(inputId) as HTMLInputElement;
          if (input) {
            input.click();
          }
        }}
        className={`
          ${config.track}
          relative inline-flex items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            ${config.thumb}
            inline-block rounded-full bg-white shadow-lg
            transform transition-transform duration-200 ease-in-out
            ${checked ? config.translate : 'translate-x-0.5'}
          `}
        />
      </button>
    );

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Hidden native checkbox for form integration */}
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        {label && labelPosition === 'left' && (
          <label
            id={`${inputId}-label`}
            htmlFor={inputId}
            className={`
              text-sm font-medium select-none
              ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 cursor-pointer'}
            `}
          >
            {label}
          </label>
        )}

        {switchElement}

        {label && labelPosition === 'right' && (
          <label
            id={`${inputId}-label`}
            htmlFor={inputId}
            className={`
              text-sm font-medium select-none
              ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 cursor-pointer'}
            `}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
