import React from 'react';

export interface TooltipProps {
  /** Content to show in tooltip */
  content: React.ReactNode;
  /** Position of tooltip */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Trigger element */
  children: React.ReactElement;
  /** Delay before showing (ms) */
  delay?: number;
  /** Disable tooltip */
  disabled?: boolean;
}

/**
 * Tooltip component for contextual information on hover/focus
 *
 * @example
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <button>Hover me</button>
 * </Tooltip>
 * <Tooltip content="Info" position="right">
 *   <span>Info icon</span>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  delay = 200,
  disabled = false
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const triggerRef = React.useRef<HTMLElement>(null);

  // Position styles
  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  // Arrow styles
  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900'
  };

  const showTooltip = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerProps = {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    'aria-describedby': isVisible ? 'tooltip' : undefined
  };

  return (
    <div className="relative inline-block">
      {React.cloneElement(children, triggerProps)}

      {isVisible && !disabled && (
        <div
          id="tooltip"
          role="tooltip"
          className={`
            absolute z-50 px-3 py-2
            bg-gray-900 dark:bg-gray-700
            text-white text-sm
            rounded-lg shadow-lg
            whitespace-nowrap
            pointer-events-none
            ${positionStyles[position]}
            animate-in fade-in duration-200
          `}
        >
          {content}
          <div
            className={`
              absolute w-0 h-0
              border-4
              ${arrowStyles[position]}
            `}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
