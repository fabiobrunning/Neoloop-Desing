import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element */
  icon: React.ReactNode;
  /** Accessible label */
  ariaLabel: string;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Visual variant */
  variant?: 'default' | 'primary' | 'ghost' | 'outline';
  /** Shape */
  shape?: 'circle' | 'square';
  /** Loading state */
  loading?: boolean;
}

/**
 * Icon-only button component
 *
 * @example
 * ```tsx
 * <IconButton icon={<SearchIcon />} ariaLabel="Search" />
 * <IconButton icon={<TrashIcon />} ariaLabel="Delete" variant="primary" />
 * <IconButton icon={<EditIcon />} ariaLabel="Edit" size="lg" shape="circle" />
 * ```
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      ariaLabel,
      size = 'md',
      variant = 'default',
      shape = 'square',
      loading = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = `
      inline-flex items-center justify-center
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `.trim();

    // Size styles
    const sizeStyles = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-14 h-14 text-xl'
    };

    // Shape styles
    const shapeStyles = {
      circle: 'rounded-full',
      square: 'rounded-lg'
    };

    // Variant styles
    const variantStyles = {
      default: `
        bg-gray-100 text-gray-700 hover:bg-gray-200
        dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
        focus:ring-gray-500
      `,
      primary: `
        bg-blue-600 text-white hover:bg-blue-700
        dark:bg-blue-500 dark:hover:bg-blue-600
        focus:ring-blue-500
      `,
      ghost: `
        bg-transparent text-gray-600 hover:bg-gray-100
        dark:text-gray-400 dark:hover:bg-gray-800
        focus:ring-gray-500
      `,
      outline: `
        border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50
        dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800
        focus:ring-gray-500
      `
    };

    const combinedClassName = `
      ${baseStyles}
      ${sizeStyles[size]}
      ${shapeStyles[shape]}
      ${variantStyles[variant]}
      ${className}
    `.trim();

    const spinnerSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7'
    };

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        {...props}
      >
        {loading ? (
          <svg
            className={`${spinnerSizes[size]} animate-spin`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';


export interface IconButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Button group children */
  children: React.ReactNode;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Spacing between buttons */
  spacing?: 'none' | 'sm' | 'md';
}

/**
 * Icon button group for toolbars
 *
 * @example
 * ```tsx
 * <IconButtonGroup>
 *   <IconButton icon={<BoldIcon />} ariaLabel="Bold" />
 *   <IconButton icon={<ItalicIcon />} ariaLabel="Italic" />
 * </IconButtonGroup>
 * ```
 */
export const IconButtonGroup = React.forwardRef<HTMLDivElement, IconButtonGroupProps>(
  (
    {
      children,
      orientation = 'horizontal',
      spacing = 'sm',
      className = '',
      ...props
    },
    ref
  ) => {
    const orientationStyles = {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    };

    const spacingStyles = {
      none: 'gap-0',
      sm: 'gap-1',
      md: 'gap-2'
    };

    return (
      <div
        ref={ref}
        className={`
          inline-flex
          ${orientationStyles[orientation]}
          ${spacingStyles[spacing]}
          ${className}
        `.trim()}
        role="toolbar"
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconButtonGroup.displayName = 'IconButtonGroup';
