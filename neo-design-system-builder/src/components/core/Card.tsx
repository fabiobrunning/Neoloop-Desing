import React from 'react'

/**
 * Card variant types
 */
export type CardVariant = 'blank' | 'elevated' | 'outline' | 'filled'

/**
 * Card padding sizes
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Card shadow levels
 */
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Card border radius
 */
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

/**
 * Base Card Props
 */
interface BaseCardProps {
  /** Card variant */
  variant?: CardVariant
  /** Padding size */
  padding?: CardPadding
  /** Shadow level */
  shadow?: CardShadow
  /** Border radius */
  radius?: CardRadius
  /** Click handler - makes card clickable */
  onClick?: () => void
  /** Custom className */
  className?: string
  /** Children elements */
  children?: React.ReactNode
}

const variantClasses: Record<CardVariant, string> = {
  blank: 'bg-white',
  elevated: 'bg-white',
  outline: 'bg-white border border-gray-200',
  filled: 'bg-gray-50 border border-gray-100',
}

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}

const shadowClasses: Record<CardShadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

const radiusClasses: Record<CardRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

/**
 * Card Component
 *
 * A versatile card container with multiple layouts and styles.
 *
 * @example
 * ```tsx
 * <Card variant="elevated" padding="lg">
 *   <CardHeader>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardBody>
 *     Content goes here
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, BaseCardProps>(
  (
    {
      variant = 'blank',
      padding = 'md',
      shadow = 'none',
      radius = 'md',
      onClick,
      className = '',
      children,
    },
    ref
  ) => {
    const isClickable = Boolean(onClick)

    const classes = [
      'card',
      variantClasses[variant],
      paddingClasses[padding],
      shadowClasses[shadow],
      radiusClasses[radius],
      isClickable && 'cursor-pointer transition-shadow hover:shadow-lg',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick?.()
                }
              }
            : undefined
        }
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/**
 * CardHeader Props
 */
interface CardHeaderProps {
  className?: string
  children?: React.ReactNode
}

/**
 * CardHeader Component
 */
export const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children }) => {
  return (
    <div className={`card-header mb-4 ${className}`}>
      {children}
    </div>
  )
}

CardHeader.displayName = 'CardHeader'

/**
 * CardBody Props
 */
interface CardBodyProps {
  className?: string
  children?: React.ReactNode
}

/**
 * CardBody Component
 */
export const CardBody: React.FC<CardBodyProps> = ({ className = '', children }) => {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  )
}

CardBody.displayName = 'CardBody'

/**
 * CardFooter Props
 */
interface CardFooterProps {
  className?: string
  children?: React.ReactNode
}

/**
 * CardFooter Component
 */
export const CardFooter: React.FC<CardFooterProps> = ({ className = '', children }) => {
  return (
    <div className={`card-footer mt-4 ${className}`}>
      {children}
    </div>
  )
}

CardFooter.displayName = 'CardFooter'
