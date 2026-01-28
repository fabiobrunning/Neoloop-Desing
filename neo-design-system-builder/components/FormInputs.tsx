import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, useState, useId } from 'react';
import { Eye, EyeOff, Check, AlertCircle, ChevronDown, Minus, LucideIcon } from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type InputState = 'default' | 'focus' | 'error' | 'success' | 'disabled';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Shared props for all form inputs
export interface BaseInputProps {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (sets error state automatically) */
  errorMessage?: string;
  /** Success message (sets success state automatically) */
  successMessage?: string;
  /** Input size */
  inputSize?: InputSize;
  /** Border radius */
  radius?: InputRadius;
  /** Full width */
  fullWidth?: boolean;
  /** Custom class for wrapper */
  wrapperClassName?: string;
}

// ============================================================================
// TEXT INPUT
// ============================================================================

export type TextInputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseInputProps {
  /** Input type */
  type?: TextInputType;
  /** Icon on the left */
  iconLeft?: LucideIcon;
  /** Icon on the right (not for password) */
  iconRight?: LucideIcon;
  /** Show character count */
  showCharCount?: boolean;
  /** Max characters for counter */
  maxChars?: number;
}

// ============================================================================
// SELECT
// ============================================================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, BaseInputProps {
  /** Select options */
  options: SelectOption[];
  /** Placeholder option */
  placeholder?: string;
}

// ============================================================================
// TEXTAREA
// ============================================================================

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, BaseInputProps {
  /** Auto resize based on content */
  autoResize?: boolean;
  /** Show character count */
  showCharCount?: boolean;
  /** Max characters for counter */
  maxChars?: number;
  /** Resize direction */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// ============================================================================
// CHECKBOX
// ============================================================================

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Checkbox label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Checkbox size */
  checkboxSize?: InputSize;
}

// ============================================================================
// RADIO BUTTON
// ============================================================================

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Radio label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Radio size */
  radioSize?: InputSize;
}

export interface RadioGroupProps {
  /** Group name */
  name: string;
  /** Radio options */
  options: { value: string; label: string; disabled?: boolean }[];
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Radio size */
  radioSize?: InputSize;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Label for the group */
  label?: string;
  /** Error message */
  errorMessage?: string;
  /** Class name */
  className?: string;
}

// ============================================================================
// TOGGLE / SWITCH
// ============================================================================

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Toggle label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Toggle size */
  toggleSize?: InputSize;
  /** Label position */
  labelPosition?: 'left' | 'right';
}

// ============================================================================
// FORM GROUP
// ============================================================================

export interface FormGroupProps {
  children: React.ReactNode;
  /** Spacing between children */
  spacing?: 'sm' | 'md' | 'lg';
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Align items */
  align?: 'start' | 'center' | 'end';
  /** Custom class */
  className?: string;
}

// ============================================================================
// STYLE CONSTANTS
// ============================================================================

const SIZE_CLASSES: Record<InputSize, { padding: string; text: string; height: string; iconSize: number }> = {
  sm: { padding: 'px-3 py-1.5', text: 'text-sm', height: 'h-9', iconSize: 16 },
  md: { padding: 'px-4 py-2.5', text: 'text-sm', height: 'h-11', iconSize: 18 },
  lg: { padding: 'px-5 py-3', text: 'text-base', height: 'h-13', iconSize: 20 },
};

const RADIUS_CLASSES: Record<InputRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
};

const STATE_CLASSES = {
  default: 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
  focus: 'border-blue-500 ring-2 ring-blue-500/20',
  error: 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20',
  success: 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20',
  disabled: 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed',
};

const CHECKBOX_SIZES: Record<InputSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const TOGGLE_SIZES: Record<InputSize, { track: string; thumb: string; translate: string }> = {
  sm: { track: 'w-8 h-5', thumb: 'w-3 h-3', translate: 'translate-x-4' },
  md: { track: 'w-11 h-6', thumb: 'w-4 h-4', translate: 'translate-x-5' },
  lg: { track: 'w-14 h-8', thumb: 'w-6 h-6', translate: 'translate-x-6' },
};

// ============================================================================
// TEXT INPUT COMPONENT
// ============================================================================

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = 'text',
      label,
      helperText,
      errorMessage,
      successMessage,
      inputSize = 'md',
      radius = 'lg',
      fullWidth = true,
      iconLeft: IconLeft,
      iconRight: IconRight,
      showCharCount = false,
      maxChars,
      disabled,
      className = '',
      wrapperClassName = '',
      id,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Determine state
    const getState = (): InputState => {
      if (disabled) return 'disabled';
      if (errorMessage) return 'error';
      if (successMessage) return 'success';
      if (isFocused) return 'focus';
      return 'default';
    };

    const state = getState();
    const sizeConfig = SIZE_CLASSES[inputSize];
    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    // Character count
    const charCount = typeof value === 'string' ? value.length : 0;
    const isOverLimit = maxChars !== undefined && charCount > maxChars;

    // Build input classes
    const inputClasses = [
      'w-full',
      'border',
      'bg-white',
      'outline-none',
      'transition-all duration-200',
      'placeholder:text-slate-400',
      sizeConfig.text,
      sizeConfig.height,
      RADIUS_CLASSES[radius],
      STATE_CLASSES[state],
      IconLeft ? 'pl-11' : sizeConfig.padding.split(' ')[0],
      (IconRight || isPassword) ? 'pr-11' : sizeConfig.padding.split(' ')[1] || sizeConfig.padding.split(' ')[0],
      className,
    ].join(' ');

    // Status icon
    const renderStatusIcon = () => {
      if (state === 'error') {
        return <AlertCircle size={sizeConfig.iconSize} className="text-red-500" />;
      }
      if (state === 'success') {
        return <Check size={sizeConfig.iconSize} className="text-green-500" />;
      }
      if (IconRight && !isPassword) {
        return <IconRight size={sizeConfig.iconSize} className="text-slate-400" />;
      }
      return null;
    };

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-bold text-slate-700 mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {IconLeft && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <IconLeft size={sizeConfig.iconSize} className="text-slate-400" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            disabled={disabled}
            value={value}
            className={inputClasses}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={state === 'error'}
            aria-describedby={
              errorMessage ? `${inputId}-error` :
              successMessage ? `${inputId}-success` :
              helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {/* Right side icon area */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={sizeConfig.iconSize} />
                ) : (
                  <Eye size={sizeConfig.iconSize} />
                )}
              </button>
            )}
            {renderStatusIcon()}
          </div>
        </div>

        {/* Helper/Error/Success text and character count */}
        <div className="flex items-center justify-between mt-1.5">
          <div>
            {errorMessage && (
              <p id={`${inputId}-error`} className="text-sm text-red-500" role="alert">
                {errorMessage}
              </p>
            )}
            {successMessage && !errorMessage && (
              <p id={`${inputId}-success`} className="text-sm text-green-500">
                {successMessage}
              </p>
            )}
            {helperText && !errorMessage && !successMessage && (
              <p id={`${inputId}-helper`} className="text-sm text-slate-500">
                {helperText}
              </p>
            )}
          </div>
          {showCharCount && (
            <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-slate-400'}`}>
              {charCount}{maxChars !== undefined && `/${maxChars}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

// ============================================================================
// SELECT COMPONENT
// ============================================================================

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      inputSize = 'md',
      radius = 'lg',
      fullWidth = true,
      options,
      placeholder,
      disabled,
      className = '',
      wrapperClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);

    // Determine state
    const getState = (): InputState => {
      if (disabled) return 'disabled';
      if (errorMessage) return 'error';
      if (successMessage) return 'success';
      if (isFocused) return 'focus';
      return 'default';
    };

    const state = getState();
    const sizeConfig = SIZE_CLASSES[inputSize];

    const selectClasses = [
      'w-full',
      'border',
      'bg-white',
      'outline-none',
      'transition-all duration-200',
      'appearance-none',
      'cursor-pointer',
      sizeConfig.text,
      sizeConfig.height,
      sizeConfig.padding,
      'pr-10',
      RADIUS_CLASSES[radius],
      STATE_CLASSES[state],
      className,
    ].join(' ');

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-bold text-slate-700 mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={selectClasses}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={state === 'error'}
            aria-describedby={
              errorMessage ? `${selectId}-error` :
              helperText ? `${selectId}-helper` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {state === 'error' ? (
              <AlertCircle size={sizeConfig.iconSize} className="text-red-500" />
            ) : state === 'success' ? (
              <Check size={sizeConfig.iconSize} className="text-green-500" />
            ) : (
              <ChevronDown size={sizeConfig.iconSize} className="text-slate-400" />
            )}
          </div>
        </div>

        {errorMessage && (
          <p id={`${selectId}-error`} className="text-sm text-red-500 mt-1.5" role="alert">
            {errorMessage}
          </p>
        )}
        {successMessage && !errorMessage && (
          <p id={`${selectId}-success`} className="text-sm text-green-500 mt-1.5">
            {successMessage}
          </p>
        )}
        {helperText && !errorMessage && !successMessage && (
          <p id={`${selectId}-helper`} className="text-sm text-slate-500 mt-1.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ============================================================================
// TEXTAREA COMPONENT
// ============================================================================

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      inputSize = 'md',
      radius = 'lg',
      fullWidth = true,
      autoResize = false,
      showCharCount = false,
      maxChars,
      resize = 'vertical',
      disabled,
      className = '',
      wrapperClassName = '',
      rows = 4,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    // Determine state
    const getState = (): InputState => {
      if (disabled) return 'disabled';
      if (errorMessage) return 'error';
      if (successMessage) return 'success';
      if (isFocused) return 'focus';
      return 'default';
    };

    const state = getState();
    const sizeConfig = SIZE_CLASSES[inputSize];

    // Character count
    const currentValue = value !== undefined ? value : internalValue;
    const charCount = typeof currentValue === 'string' ? currentValue.length : 0;
    const isOverLimit = maxChars !== undefined && charCount > maxChars;

    // Resize class
    const resizeClasses: Record<string, string> = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const textareaClasses = [
      'w-full',
      'border',
      'bg-white',
      'outline-none',
      'transition-all duration-200',
      'placeholder:text-slate-400',
      sizeConfig.text,
      sizeConfig.padding,
      RADIUS_CLASSES[radius],
      STATE_CLASSES[state],
      autoResize ? 'resize-none overflow-hidden' : resizeClasses[resize],
      className,
    ].join(' ');

    // Handle auto resize
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-bold text-slate-700 mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            rows={rows}
            value={value}
            onChange={handleChange}
            className={textareaClasses}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={state === 'error'}
            aria-describedby={
              errorMessage ? `${textareaId}-error` :
              helperText ? `${textareaId}-helper` : undefined
            }
            {...props}
          />

          {/* Status indicator */}
          {(state === 'error' || state === 'success') && (
            <div className="absolute right-3 top-3">
              {state === 'error' ? (
                <AlertCircle size={sizeConfig.iconSize} className="text-red-500" />
              ) : (
                <Check size={sizeConfig.iconSize} className="text-green-500" />
              )}
            </div>
          )}
        </div>

        {/* Helper/Error/Success text and character count */}
        <div className="flex items-center justify-between mt-1.5">
          <div>
            {errorMessage && (
              <p id={`${textareaId}-error`} className="text-sm text-red-500" role="alert">
                {errorMessage}
              </p>
            )}
            {successMessage && !errorMessage && (
              <p id={`${textareaId}-success`} className="text-sm text-green-500">
                {successMessage}
              </p>
            )}
            {helperText && !errorMessage && !successMessage && (
              <p id={`${textareaId}-helper`} className="text-sm text-slate-500">
                {helperText}
              </p>
            )}
          </div>
          {showCharCount && (
            <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-slate-400'}`}>
              {charCount}{maxChars !== undefined && `/${maxChars}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ============================================================================
// CHECKBOX COMPONENT
// ============================================================================

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      indeterminate = false,
      checkboxSize = 'md',
      disabled,
      className = '',
      id,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const internalRef = React.useRef<HTMLInputElement>(null);

    // Handle indeterminate state
    React.useEffect(() => {
      const checkbox = internalRef.current;
      if (checkbox) {
        checkbox.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Combine refs
    React.useImperativeHandle(ref, () => internalRef.current!);

    const hasError = !!errorMessage;

    return (
      <div className={className}>
        <label
          htmlFor={checkboxId}
          className={`inline-flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              ref={internalRef}
              id={checkboxId}
              type="checkbox"
              disabled={disabled}
              checked={checked}
              className={`
                ${CHECKBOX_SIZES[checkboxSize]}
                rounded
                border-2
                ${hasError ? 'border-red-500' : 'border-slate-300'}
                text-blue-600
                focus:ring-2
                ${hasError ? 'focus:ring-red-500/20' : 'focus:ring-blue-500/20'}
                ${hasError ? 'focus:border-red-500' : 'focus:border-blue-500'}
                transition-all duration-200
                cursor-pointer
                disabled:cursor-not-allowed
                disabled:bg-slate-100
              `}
              aria-invalid={hasError}
              aria-describedby={errorMessage ? `${checkboxId}-error` : undefined}
              {...props}
            />
            {indeterminate && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Minus size={checkboxSize === 'sm' ? 10 : checkboxSize === 'md' ? 12 : 14} className="text-blue-600" />
              </div>
            )}
          </div>
          {(label || helperText) && (
            <div>
              {label && (
                <span className="text-sm font-medium text-slate-700">{label}</span>
              )}
              {helperText && (
                <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
              )}
            </div>
          )}
        </label>
        {errorMessage && (
          <p id={`${checkboxId}-error`} className="text-sm text-red-500 mt-1 ml-7" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// ============================================================================
// RADIO BUTTON COMPONENT
// ============================================================================

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      radioSize = 'md',
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const radioId = id || generatedId;

    return (
      <div className={className}>
        <label
          htmlFor={radioId}
          className={`inline-flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input
            ref={ref}
            id={radioId}
            type="radio"
            disabled={disabled}
            className={`
              ${CHECKBOX_SIZES[radioSize]}
              border-2
              border-slate-300
              text-blue-600
              focus:ring-2
              focus:ring-blue-500/20
              focus:border-blue-500
              transition-all duration-200
              cursor-pointer
              disabled:cursor-not-allowed
              disabled:bg-slate-100
              mt-0.5
            `}
            {...props}
          />
          {(label || helperText) && (
            <div>
              {label && (
                <span className="text-sm font-medium text-slate-700">{label}</span>
              )}
              {helperText && (
                <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
              )}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// ============================================================================
// RADIO GROUP COMPONENT
// ============================================================================

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  radioSize = 'md',
  direction = 'vertical',
  label,
  errorMessage,
  className = '',
}) => {
  return (
    <div className={className} role="radiogroup" aria-label={label}>
      {label && (
        <p className="text-sm font-bold text-slate-700 mb-3">{label}</p>
      )}
      <div className={`flex ${direction === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4'}`}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            disabled={option.disabled}
            radioSize={radioSize}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </div>
      {errorMessage && (
        <p className="text-sm text-red-500 mt-2" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

// ============================================================================
// TOGGLE / SWITCH COMPONENT
// ============================================================================

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      helperText,
      toggleSize = 'md',
      labelPosition = 'right',
      disabled,
      className = '',
      id,
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const toggleId = id || generatedId;
    const sizeConfig = TOGGLE_SIZES[toggleSize];

    const trackClasses = [
      sizeConfig.track,
      'rounded-full',
      'relative',
      'transition-colors duration-200',
      'focus-within:ring-2 focus-within:ring-blue-500/20',
      checked ? 'bg-blue-600' : 'bg-slate-300',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ].join(' ');

    const thumbClasses = [
      sizeConfig.thumb,
      'bg-white',
      'rounded-full',
      'shadow-md',
      'absolute',
      'top-1/2',
      '-translate-y-1/2',
      'left-1',
      'transition-transform duration-200',
      checked ? sizeConfig.translate : 'translate-x-0',
    ].join(' ');

    const LabelContent = () => (
      <>
        {label && (
          <span className="text-sm font-medium text-slate-700">{label}</span>
        )}
        {helperText && (
          <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
        )}
      </>
    );

    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {labelPosition === 'left' && (label || helperText) && (
          <div className="text-right">
            <LabelContent />
          </div>
        )}

        <label
          htmlFor={toggleId}
          className={trackClasses}
        >
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            role="switch"
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            className="sr-only"
            aria-checked={checked}
            {...props}
          />
          <span className={thumbClasses} />
        </label>

        {labelPosition === 'right' && (label || helperText) && (
          <div>
            <LabelContent />
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

// ============================================================================
// FORM GROUP COMPONENT
// ============================================================================

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  spacing = 'md',
  direction = 'vertical',
  align = 'start',
  className = '',
}) => {
  const spacingClasses: Record<string, string> = {
    sm: direction === 'vertical' ? 'space-y-2' : 'space-x-2',
    md: direction === 'vertical' ? 'space-y-4' : 'space-x-4',
    lg: direction === 'vertical' ? 'space-y-6' : 'space-x-6',
  };

  const alignClasses: Record<string, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  return (
    <div
      className={`
        flex
        ${direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
        ${spacingClasses[spacing]}
        ${alignClasses[align]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

FormGroup.displayName = 'FormGroup';

// ============================================================================
// CHECKBOX GROUP COMPONENT
// ============================================================================

export interface CheckboxGroupProps {
  /** Group label */
  label?: string;
  /** Checkbox options */
  options: { value: string; label: string; disabled?: boolean }[];
  /** Currently selected values */
  values?: string[];
  /** Change handler */
  onChange?: (values: string[]) => void;
  /** Checkbox size */
  checkboxSize?: InputSize;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Error message */
  errorMessage?: string;
  /** Class name */
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  values = [],
  onChange,
  checkboxSize = 'md',
  direction = 'vertical',
  errorMessage,
  className = '',
}) => {
  const handleChange = (optionValue: string, isChecked: boolean) => {
    if (isChecked) {
      onChange?.([...values, optionValue]);
    } else {
      onChange?.(values.filter(v => v !== optionValue));
    }
  };

  return (
    <div className={className} role="group" aria-label={label}>
      {label && (
        <p className="text-sm font-bold text-slate-700 mb-3">{label}</p>
      )}
      <div className={`flex ${direction === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4'}`}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={values.includes(option.value)}
            disabled={option.disabled}
            checkboxSize={checkboxSize}
            onChange={(e) => handleChange(option.value, e.target.checked)}
          />
        ))}
      </div>
      {errorMessage && (
        <p className="text-sm text-red-500 mt-2" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  TextInput,
  Select,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Toggle,
  FormGroup,
};
