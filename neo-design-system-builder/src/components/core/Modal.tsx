import React from 'react';

export interface ModalProps {
  /** Whether modal is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Children content */
  children: React.ReactNode;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Modal dialog component with header, body, footer
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={handleClose} title="Confirm">
 *   <ModalBody>Are you sure?</ModalBody>
 *   <ModalFooter>
 *     <Button onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Size styles
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
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

  // Prevent body scroll when modal is open
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

  // Focus trap
  React.useEffect(() => {
    if (!open || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div
        ref={modalRef}
        className={`
          relative w-full ${sizeStyles[size]}
          bg-white dark:bg-gray-800
          rounded-lg shadow-xl
          max-h-[90vh] overflow-y-auto
          animate-in slide-in-from-bottom-4 duration-200
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="
                  ml-auto -mr-2 p-2 rounded-lg
                  text-gray-400 hover:text-gray-600 hover:bg-gray-100
                  dark:hover:text-gray-300 dark:hover:bg-gray-700
                  focus:outline-none focus:ring-2 focus:ring-gray-500
                "
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className = '', ...props }) => (
  <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`} {...props}>
    {children}
  </div>
);

ModalHeader.displayName = 'ModalHeader';

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className = '', ...props }) => (
  <div className={`p-6 text-gray-700 dark:text-gray-300 ${className}`} {...props}>
    {children}
  </div>
);

ModalBody.displayName = 'ModalBody';

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = '', ...props }) => (
  <div className={`p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 ${className}`} {...props}>
    {children}
  </div>
);

ModalFooter.displayName = 'ModalFooter';
