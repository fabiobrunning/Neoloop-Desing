import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Text to display in the divider */
  text?: string;
  /** Text position (only for horizontal) */
  textPosition?: 'left' | 'center' | 'right';
  /** Thickness */
  thickness?: 'thin' | 'medium' | 'thick';
  /** Color variant */
  variant?: 'default' | 'dark' | 'light';
}

/**
 * Divider component for visual separation
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider text="OR" />
 * <Divider orientation="vertical" />
 * <Divider text="Section" textPosition="left" />
 * ```
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      text,
      textPosition = 'center',
      thickness = 'thin',
      variant = 'default',
      className = '',
      ...props
    },
    ref
  ) => {
    // Thickness styles
    const thicknessStyles = {
      thin: orientation === 'horizontal' ? 'border-t' : 'border-l',
      medium: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
      thick: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4'
    };

    // Variant colors
    const variantColors = {
      default: 'border-gray-300 dark:border-gray-600',
      dark: 'border-gray-700 dark:border-gray-300',
      light: 'border-gray-200 dark:border-gray-700'
    };

    // Horizontal divider with text
    if (orientation === 'horizontal' && text) {
      const positionClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
      };

      return (
        <div
          ref={ref}
          className={`relative flex items-center ${positionClasses[textPosition]} ${className}`}
          role="separator"
          {...props}
        >
          {textPosition !== 'left' && (
            <div className={`flex-1 ${thicknessStyles[thickness]} ${variantColors[variant]}`} />
          )}
          <span className="px-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {text}
          </span>
          {textPosition !== 'right' && (
            <div className={`flex-1 ${thicknessStyles[thickness]} ${variantColors[variant]}`} />
          )}
        </div>
      );
    }

    // Horizontal divider without text
    if (orientation === 'horizontal') {
      return (
        <hr
          ref={ref as React.Ref<HTMLHRElement>}
          className={`w-full ${thicknessStyles[thickness]} ${variantColors[variant]} ${className}`}
          role="separator"
          {...props}
        />
      );
    }

    // Vertical divider
    return (
      <div
        ref={ref}
        className={`h-full ${thicknessStyles[thickness]} ${variantColors[variant]} ${className}`}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
