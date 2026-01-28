import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Border radius style */
  radius?: ButtonRadius;
  /** Icon component to display on the left */
  iconLeft?: LucideIcon;
  /** Icon component to display on the right */
  iconRight?: LucideIcon;
  /** Display only the icon (square button) */
  iconOnly?: boolean;
  /** Makes button take full width of container */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Loading text (replaces children when loading) */
  loadingText?: string;
  /** Primary color override (hex) */
  primaryColor?: string;
  /** Custom className for additional styling */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

// ============================================================================
// STYLE CONSTANTS
// ============================================================================

const SIZE_CLASSES: Record<ButtonSize, { padding: string; text: string; iconSize: number; height: string }> = {
  xs: { padding: 'px-2.5 py-1', text: 'text-xs', iconSize: 14, height: 'h-7' },
  sm: { padding: 'px-3 py-1.5', text: 'text-sm', iconSize: 16, height: 'h-8' },
  md: { padding: 'px-4 py-2', text: 'text-sm', iconSize: 18, height: 'h-10' },
  lg: { padding: 'px-5 py-2.5', text: 'text-base', iconSize: 20, height: 'h-12' },
  xl: { padding: 'px-6 py-3', text: 'text-lg', iconSize: 22, height: 'h-14' },
};

const ICON_ONLY_SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: 'w-7 h-7',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
};

const RADIUS_CLASSES: Record<ButtonRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/25',
  secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300',
  outline: 'bg-transparent border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-lg shadow-red-500/25',
  success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-lg shadow-green-500/25',
  warning: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-lg shadow-amber-500/25',
  link: 'bg-transparent text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 p-0',
};

const DISABLED_CLASSES = 'opacity-50 cursor-not-allowed pointer-events-none';
const LOADING_CLASSES = 'cursor-wait';

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      radius = 'lg',
      iconLeft: IconLeft,
      iconRight: IconRight,
      iconOnly = false,
      fullWidth = false,
      disabled = false,
      loading = false,
      loadingText,
      primaryColor,
      className = '',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const sizeConfig = SIZE_CLASSES[size];
    const isDisabled = disabled || loading;

    // Build class string
    const baseClasses = [
      'inline-flex items-center justify-center',
      'font-bold',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      'active:scale-[0.98]',
      sizeConfig.text,
    ];

    // Size classes (different for iconOnly)
    if (iconOnly) {
      baseClasses.push(ICON_ONLY_SIZE_CLASSES[size]);
    } else {
      baseClasses.push(sizeConfig.padding);
      if (variant !== 'link') {
        baseClasses.push(sizeConfig.height);
      }
    }

    // Radius
    baseClasses.push(RADIUS_CLASSES[radius]);

    // Variant
    baseClasses.push(VARIANT_CLASSES[variant]);

    // Width
    if (fullWidth) {
      baseClasses.push('w-full');
    }

    // States
    if (isDisabled) {
      baseClasses.push(DISABLED_CLASSES);
    }
    if (loading) {
      baseClasses.push(LOADING_CLASSES);
    }

    // Custom class
    if (className) {
      baseClasses.push(className);
    }

    // Custom primary color style override
    const customStyle: React.CSSProperties = { ...style };
    if (primaryColor && variant === 'primary') {
      customStyle.backgroundColor = primaryColor;
      customStyle.boxShadow = `0 10px 15px -3px ${primaryColor}40, 0 4px 6px -4px ${primaryColor}40`;
    }

    // Render icon
    const renderIcon = (Icon: LucideIcon | undefined, position: 'left' | 'right') => {
      if (!Icon) return null;
      const marginClass = iconOnly ? '' : position === 'left' ? 'mr-2' : 'ml-2';
      return <Icon size={sizeConfig.iconSize} className={marginClass} />;
    };

    // Render loading spinner
    const renderSpinner = () => (
      <Loader2
        size={sizeConfig.iconSize}
        className={`animate-spin ${iconOnly ? '' : 'mr-2'}`}
      />
    );

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={baseClasses.join(' ')}
        style={customStyle}
        {...props}
      >
        {loading ? (
          <>
            {renderSpinner()}
            {!iconOnly && (loadingText || children)}
          </>
        ) : (
          <>
            {renderIcon(IconLeft, 'left')}
            {!iconOnly && children}
            {renderIcon(IconRight, 'right')}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================================
// BUTTON GROUP COMPONENT
// ============================================================================

export interface ButtonGroupProps {
  children: React.ReactNode;
  /** Attached style (buttons connected) */
  attached?: boolean;
  /** Spacing between buttons when not attached */
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  attached = false,
  spacing = 'md',
  className = '',
}) => {
  const spacingClasses: Record<string, string> = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-4',
  };

  if (attached) {
    return (
      <div className={`inline-flex rounded-xl overflow-hidden border border-slate-200 ${className}`}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<ButtonProps>(child)) {
            return React.cloneElement(child, {
              radius: 'none',
              className: `${child.props.className || ''} ${index > 0 ? 'border-l border-slate-200' : ''}`,
            });
          }
          return child;
        })}
      </div>
    );
  }

  return (
    <div className={`inline-flex ${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

// ============================================================================
// ICON BUTTON COMPONENT (Convenience wrapper)
// ============================================================================

export interface IconButtonProps extends Omit<ButtonProps, 'iconLeft' | 'iconRight' | 'iconOnly' | 'children'> {
  icon: LucideIcon;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        iconLeft={icon}
        iconOnly
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';

export default Button;
