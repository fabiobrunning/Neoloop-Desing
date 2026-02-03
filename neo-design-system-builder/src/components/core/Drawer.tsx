import React from 'react';

export interface DrawerProps {
  /** Whether drawer is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Drawer position */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer size */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Show overlay */
  showOverlay?: boolean;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on escape */
  closeOnEscape?: boolean;
  /** Children content */
  children: React.ReactNode;
  /** Title */
  title?: string;
}

/**
 * Drawer/Offcanvas component for side panels
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} onClose={handleClose} position="right">
 *   <p>Drawer content</p>
 * </Drawer>
 * <Drawer open={isOpen} onClose={handleClose} position="left" size="lg" title="Menu">
 *   <nav>...</nav>
 * </Drawer>
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = 'right',
  size = 'md',
  showOverlay = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  title
}) => {
  const drawerRef = React.useRef<HTMLDivElement>(null);

  // Position styles
  const positionStyles = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full'
  };

  // Size styles
  const sizeStyles = {
    left: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      full: 'w-full'
    },
    right: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      full: 'w-full'
    },
    top: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      full: 'h-full'
    },
    bottom: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      full: 'h-full'
    }
  };

  // Animation styles
  const animationStyles = {
    left: open ? 'translate-x-0' : '-translate-x-full',
    right: open ? 'translate-x-0' : 'translate-x-full',
    top: open ? 'translate-y-0' : '-translate-y-full',
    bottom: open ? 'translate-y-0' : 'translate-y-full'
  };

  // Handle escape key
  React.useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className={`
            fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
            transition-opacity duration-300
            ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`
          fixed z-50
          ${positionStyles[position]}
          ${sizeStyles[position][size]}
          bg-white dark:bg-gray-800
          shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${animationStyles[position]}
          overflow-y-auto
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 id="drawer-title" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="
                p-2 rounded-lg
                text-gray-400 hover:text-gray-600 hover:bg-gray-100
                dark:hover:text-gray-300 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-gray-500
              "
              aria-label="Close drawer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </>
  );
};

Drawer.displayName = 'Drawer';
