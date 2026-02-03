import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: 'text' | 'rect' | 'circle';
  /** Width (CSS value or number for px) */
  width?: string | number;
  /** Height (CSS value or number for px) */
  height?: string | number;
  /** Number of lines for text variant */
  lines?: number;
  /** Disable animation */
  static?: boolean;
}

/**
 * Skeleton loading placeholder component
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" />
 * <Skeleton variant="circle" width={40} height={40} />
 * <Skeleton variant="rect" width="100%" height={200} />
 * <Skeleton variant="text" lines={3} />
 * ```
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      lines = 1,
      static: isStatic = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Convert number to px string
    const getSize = (size?: string | number) => {
      if (typeof size === 'number') return `${size}px`;
      return size;
    };

    // Base styles
    const baseStyles = 'bg-gray-200 dark:bg-gray-700';
    const animationStyles = isStatic ? '' : 'animate-pulse';

    // Variant-specific styles
    const variantStyles = {
      text: 'h-4 rounded',
      rect: 'rounded-lg',
      circle: 'rounded-full'
    };

    // Default dimensions
    const defaultDimensions = {
      text: { width: '100%', height: undefined },
      rect: { width: '100%', height: '100px' },
      circle: { width: '40px', height: '40px' }
    };

    const finalWidth = width ?? defaultDimensions[variant].width;
    const finalHeight = height ?? defaultDimensions[variant].height;

    const combinedStyle: React.CSSProperties = {
      width: getSize(finalWidth),
      height: getSize(finalHeight),
      ...style
    };

    // For text variant with multiple lines
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={`space-y-2 ${className}`} {...props}>
          {Array.from({ length: lines }).map((_, index) => {
            // Make last line shorter
            const lineWidth = index === lines - 1 ? '80%' : '100%';
            return (
              <div
                key={index}
                className={`${baseStyles} ${variantStyles.text} ${animationStyles}`}
                style={{ width: lineWidth }}
                aria-hidden="true"
              />
            );
          })}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${animationStyles}
          ${className}
        `.trim()}
        style={combinedStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
