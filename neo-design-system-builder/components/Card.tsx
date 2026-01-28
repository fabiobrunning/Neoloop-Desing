import React, { forwardRef, HTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type CardLayout = 'simple' | 'with-header' | 'with-footer' | 'with-image' | 'horizontal';
export type CardVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gradient';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type CardBorder = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Card layout style */
  layout?: CardLayout;
  /** Visual style variant */
  variant?: CardVariant;
  /** Shadow elevation */
  shadow?: CardShadow;
  /** Border width */
  border?: CardBorder;
  /** Border radius style */
  radius?: CardRadius;
  /** Enable hover effect (elevation + scale) */
  hover?: boolean;
  /** Make card interactive/clickable */
  interactive?: boolean;
  /** Make card take full height of container */
  fullHeight?: boolean;
  /** Make card take full width of container */
  fullWidth?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Primary color override (hex) for gradient variant */
  primaryColor?: string;
  /** Custom className for additional styling */
  className?: string;
  /** Click handler (only when interactive) */
  onClick?: () => void;
  /** Children elements */
  children?: React.ReactNode;
}

// ============================================================================
// CARD HEADER COMPONENT
// ============================================================================

export interface CardHeaderProps {
  /** Header title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Icon component on the left */
  icon?: LucideIcon;
  /** Icon background color */
  iconBg?: string;
  /** Icon color */
  iconColor?: string;
  /** Action element on the right (button, menu, etc) */
  action?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Divider below header */
  divider?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconBg = 'bg-blue-100',
  iconColor = 'text-blue-600',
  action,
  className = '',
  divider = false,
}) => {
  return (
    <div className={`flex items-center justify-between ${divider ? 'pb-4 border-b border-slate-200 mb-4' : 'mb-4'} ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon size={20} className={iconColor} />
          </div>
        )}
        <div>
          <h4 className="text-lg font-bold text-slate-900">{title}</h4>
          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';

// ============================================================================
// CARD CONTENT COMPONENT
// ============================================================================

export interface CardContentProps {
  /** Custom className */
  className?: string;
  /** Children elements */
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`text-slate-600 ${className}`}>
      {children}
    </div>
  );
};

CardContent.displayName = 'CardContent';

// ============================================================================
// CARD FOOTER COMPONENT
// ============================================================================

export interface CardFooterProps {
  /** Custom className */
  className?: string;
  /** Alignment of footer content */
  align?: 'left' | 'center' | 'right' | 'between' | 'around';
  /** Divider above footer */
  divider?: boolean;
  /** Children elements (buttons, links, etc) */
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className = '',
  align = 'right',
  divider = false,
  children,
}) => {
  const alignClasses: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  return (
    <div className={`flex items-center gap-3 ${alignClasses[align]} ${divider ? 'pt-4 border-t border-slate-200 mt-4' : 'mt-4'} ${className}`}>
      {children}
    </div>
  );
};

CardFooter.displayName = 'CardFooter';

// ============================================================================
// CARD IMAGE COMPONENT
// ============================================================================

export interface CardImageProps {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt: string;
  /** Image height */
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  /** Position (top, bottom, left, right) */
  position?: 'top' | 'bottom';
  /** Overlay gradient */
  overlay?: boolean;
  /** Overlay color (default dark gradient) */
  overlayColor?: string;
  /** Content to display over the image */
  overlayContent?: React.ReactNode;
  /** Zoom effect on hover */
  hoverZoom?: boolean;
  /** Object fit */
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Custom className */
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  height = 'md',
  position = 'top',
  overlay = false,
  overlayColor = 'from-black/60 to-transparent',
  overlayContent,
  hoverZoom = false,
  fit = 'cover',
  className = '',
}) => {
  const heightClasses: Record<string, string> = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-80',
    auto: 'h-auto',
  };

  const fitClasses: Record<string, string> = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };

  const positionClasses: Record<string, string> = {
    top: 'rounded-t-inherit -mt-6 -mx-6 mb-4',
    bottom: 'rounded-b-inherit -mb-6 -mx-6 mt-4',
  };

  return (
    <div className={`relative overflow-hidden ${heightClasses[height]} ${positionClasses[position]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${fitClasses[fit]} ${hoverZoom ? 'transition-transform duration-500 group-hover:scale-110' : ''}`}
      />
      {overlay && (
        <div className={`absolute inset-0 bg-gradient-to-t ${overlayColor}`} />
      )}
      {overlayContent && (
        <div className="absolute inset-0 flex items-end p-4">
          {overlayContent}
        </div>
      )}
    </div>
  );
};

CardImage.displayName = 'CardImage';

// ============================================================================
// STYLE CONSTANTS
// ============================================================================

const SHADOW_CLASSES: Record<CardShadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
};

const SHADOW_HOVER_CLASSES: Record<CardShadow, string> = {
  none: 'hover:shadow-sm',
  sm: 'hover:shadow-md',
  md: 'hover:shadow-lg',
  lg: 'hover:shadow-xl',
  xl: 'hover:shadow-2xl',
  '2xl': 'hover:shadow-2xl',
};

const BORDER_CLASSES: Record<CardBorder, string> = {
  none: 'border-0',
  sm: 'border border-slate-200',
  md: 'border-2 border-slate-200',
  lg: 'border-4 border-slate-200',
};

const RADIUS_CLASSES: Record<CardRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-3xl',
  '3xl': 'rounded-[2rem]',
  full: 'rounded-full',
};

const PADDING_CLASSES: Record<string, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: 'bg-white',
  primary: 'bg-blue-50 border-blue-200',
  secondary: 'bg-slate-50 border-slate-200',
  success: 'bg-green-50 border-green-200',
  warning: 'bg-amber-50 border-amber-200',
  danger: 'bg-red-50 border-red-200',
  gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0',
};

// ============================================================================
// CARD COMPONENT
// ============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      layout = 'simple',
      variant = 'default',
      shadow = 'sm',
      border = 'sm',
      radius = '2xl',
      hover = false,
      interactive = false,
      fullHeight = false,
      fullWidth = false,
      padding = 'md',
      primaryColor,
      className = '',
      onClick,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Build class string
    const baseClasses = [
      'relative',
      'transition-all duration-300 ease-out',
      PADDING_CLASSES[padding],
      RADIUS_CLASSES[radius],
      SHADOW_CLASSES[shadow],
    ];

    // Variant
    if (variant !== 'gradient' || !primaryColor) {
      baseClasses.push(VARIANT_CLASSES[variant]);
    }

    // Border (only for non-gradient variants)
    if (variant !== 'gradient') {
      baseClasses.push(BORDER_CLASSES[border]);
    }

    // Hover effects
    if (hover) {
      baseClasses.push(SHADOW_HOVER_CLASSES[shadow]);
      baseClasses.push('hover:-translate-y-1');
    }

    // Interactive
    if (interactive || onClick) {
      baseClasses.push('cursor-pointer');
      baseClasses.push('active:scale-[0.99]');
      baseClasses.push('focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2');
      if (!hover) {
        baseClasses.push(SHADOW_HOVER_CLASSES[shadow]);
      }
    }

    // Sizing
    if (fullHeight) {
      baseClasses.push('h-full');
    }
    if (fullWidth) {
      baseClasses.push('w-full');
    }

    // Group class for image zoom
    baseClasses.push('group');

    // Custom class
    if (className) {
      baseClasses.push(className);
    }

    // Custom gradient style
    const customStyle: React.CSSProperties = { ...style };
    if (variant === 'gradient' && primaryColor) {
      customStyle.background = `linear-gradient(135deg, ${primaryColor}, ${adjustColor(primaryColor, -30)})`;
    }

    // Handle click
    const handleClick = () => {
      if (interactive && onClick) {
        onClick();
      }
    };

    // Handle keyboard
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={baseClasses.join(' ')}
        style={customStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Adjusts a hex color by a given amount
 * @param hex - Hex color string
 * @param amount - Amount to adjust (-100 to 100)
 */
function adjustColor(hex: string, amount: number): string {
  const clamp = (num: number) => Math.min(255, Math.max(0, num));

  // Remove # if present
  hex = hex.replace('#', '');

  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Adjust each channel
  const newR = clamp(r + amount);
  const newG = clamp(g + amount);
  const newB = clamp(b + amount);

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// ============================================================================
// STAT CARD COMPONENT (Convenience wrapper)
// ============================================================================

export interface StatCardProps extends Omit<CardProps, 'children'> {
  /** Stat label */
  label: string;
  /** Stat value */
  value: string | number;
  /** Change indicator (e.g., "+12%") */
  change?: string;
  /** Is change positive? */
  positive?: boolean;
  /** Icon */
  icon?: LucideIcon;
  /** Icon background color */
  iconBg?: string;
  /** Icon color */
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  positive = true,
  icon: Icon,
  iconBg = 'bg-blue-100',
  iconColor = 'text-blue-600',
  ...cardProps
}) => {
  return (
    <Card {...cardProps}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-black text-slate-900">{value}</p>
          {change && (
            <p className={`text-sm font-bold mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon size={24} className={iconColor} />
          </div>
        )}
      </div>
    </Card>
  );
};

StatCard.displayName = 'StatCard';

// ============================================================================
// PRODUCT CARD COMPONENT (Convenience wrapper)
// ============================================================================

export interface ProductCardProps extends Omit<CardProps, 'children'> {
  /** Product image URL */
  image: string;
  /** Product name */
  name: string;
  /** Product category/description */
  category?: string;
  /** Price */
  price: string | number;
  /** Original price (for discounts) */
  originalPrice?: string | number;
  /** Rating (0-5) */
  rating?: number;
  /** On favorite click */
  onFavoriteClick?: () => void;
  /** On add to cart click */
  onAddToCartClick?: () => void;
  /** Is favorited */
  isFavorite?: boolean;
  /** Primary button color */
  buttonColor?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  category,
  price,
  originalPrice,
  rating,
  onFavoriteClick,
  onAddToCartClick,
  isFavorite = false,
  buttonColor = '#2b4bee',
  hover = true,
  ...cardProps
}) => {
  return (
    <Card hover={hover} padding="none" {...cardProps}>
      <div className="h-48 bg-slate-100 relative overflow-hidden rounded-t-inherit">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {onFavoriteClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick();
            }}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shadow-md"
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-slate-400'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="p-4">
        <h5 className="font-bold text-slate-900 mb-1">{name}</h5>
        {category && <p className="text-sm text-slate-500 mb-3">{category}</p>}
        {rating !== undefined && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                fill={i < rating ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            ))}
            <span className="text-xs text-slate-500 ml-1">({rating})</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-slate-900">
              {typeof price === 'number' ? `$${price}` : price}
            </span>
            {originalPrice && (
              <span className="text-sm text-slate-400 line-through ml-2">
                {typeof originalPrice === 'number' ? `$${originalPrice}` : originalPrice}
              </span>
            )}
          </div>
          {onAddToCartClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCartClick();
              }}
              style={{ backgroundColor: buttonColor }}
              className="px-4 py-2 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

ProductCard.displayName = 'ProductCard';

// ============================================================================
// PROFILE CARD COMPONENT (Convenience wrapper)
// ============================================================================

export interface ProfileCardProps extends Omit<CardProps, 'children'> {
  /** Profile image URL */
  image: string;
  /** User name */
  name: string;
  /** User role/title */
  role?: string;
  /** Bio/description */
  bio?: string;
  /** Primary action */
  primaryAction?: React.ReactNode;
  /** Secondary action */
  secondaryAction?: React.ReactNode;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  name,
  role,
  bio,
  primaryAction,
  secondaryAction,
  ...cardProps
}) => {
  return (
    <Card {...cardProps}>
      <div className="text-center">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-slate-100 object-cover"
        />
        <h5 className="text-lg font-bold text-slate-900 mb-1">{name}</h5>
        {role && <p className="text-sm text-slate-500 mb-2">{role}</p>}
        {bio && <p className="text-sm text-slate-600 mb-4">{bio}</p>}
        {(primaryAction || secondaryAction) && (
          <div className="flex gap-2 justify-center">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </Card>
  );
};

ProfileCard.displayName = 'ProfileCard';

export default Card;
