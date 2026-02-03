import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials to display when no image */
  initials?: string;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Shape of avatar */
  shape?: 'circle' | 'square';
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy' | null;
  /** Fallback when image fails to load */
  fallback?: React.ReactNode;
}

/**
 * Avatar component for user profile pictures with initials fallback
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" />
 * <Avatar initials="JD" />
 * <Avatar initials="AB" size="lg" status="online" />
 * <Avatar src="/user.jpg" shape="square" />
 * ```
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      initials,
      size = 'md',
      shape = 'circle',
      status = null,
      fallback,
      className = '',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    // Size styles
    const sizeStyles = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-24 h-24 text-3xl'
    };

    // Shape styles
    const shapeStyles = {
      circle: 'rounded-full',
      square: 'rounded-lg'
    };

    // Status indicator styles
    const statusConfig = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500'
    };

    // Status size based on avatar size
    const statusSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
      '2xl': 'w-5 h-5'
    };

    const combinedClassName = `
      relative inline-flex items-center justify-center
      ${sizeStyles[size]}
      ${shapeStyles[shape]}
      bg-gray-200 dark:bg-gray-700
      overflow-hidden
      ${className}
    `.trim();

    const showImage = src && !imageError;
    const showInitials = !showImage && initials;
    const showFallback = !showImage && !initials && fallback;

    return (
      <div
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}

        {showInitials && (
          <span className="font-semibold text-gray-700 dark:text-gray-300 uppercase select-none">
            {initials}
          </span>
        )}

        {showFallback && fallback}

        {!showImage && !showInitials && !showFallback && (
          <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        )}

        {status && (
          <span
            className={`
              absolute bottom-0 right-0
              ${statusSizes[size]}
              ${statusConfig[status]}
              ${shape === 'circle' ? 'rounded-full' : 'rounded-sm'}
              border-2 border-white dark:border-gray-800
            `}
            role="status"
            aria-label={status}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
