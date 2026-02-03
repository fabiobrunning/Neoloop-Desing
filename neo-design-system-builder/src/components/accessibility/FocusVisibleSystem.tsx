/**
 * Focus Visible System
 *
 * Keyboard navigation visual indicators with :focus-visible polyfill.
 * Provides skip links, focus trap, and focus management utilities.
 *
 * @usage
 * ```tsx
 * import { FocusTrap, SkipLink, useFocusManagement } from '@/components/accessibility/FocusVisibleSystem';
 *
 * <FocusTrap active={isModalOpen}>
 *   <Modal />
 * </FocusTrap>
 * ```
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ==================== TYPES ====================
interface FocusTrapProps {
  children: React.ReactNode;
  active: boolean;
  returnFocusOnDeactivate?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  className?: string;
}

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// ==================== FOCUS TRAP ====================
export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  active,
  returnFocusOnDeactivate = true,
  initialFocus,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Save previous focus
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus initial element or first focusable
    if (initialFocus?.current) {
      initialFocus.current.focus();
    } else {
      const firstFocusable = getFocusableElements()[0];
      firstFocusable?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab (backwards)
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
      // Tab (forwards)
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Return focus
      if (returnFocusOnDeactivate && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, initialFocus, returnFocusOnDeactivate]);

  const getFocusableElements = (): HTMLElement[] => {
    if (!containerRef.current) return [];

    const selector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    return Array.from(containerRef.current.querySelectorAll(selector));
  };

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// ==================== SKIP LINK ====================
export const SkipLink: React.FC<SkipLinkProps> = ({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      className={`
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-50
        focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white
        focus:rounded-lg focus:shadow-lg
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </a>
  );
};

// ==================== FOCUS INDICATOR ====================
export const FocusIndicator: React.FC<{
  children: React.ReactNode;
  color?: string;
  width?: number;
  offset?: number;
  className?: string;
}> = ({ children, color = '#3b82f6', width = 2, offset = 2, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {isFocused && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: -offset,
            left: -offset,
            right: -offset,
            bottom: -offset,
            border: `${width}px solid ${color}`,
            borderRadius: '0.5rem',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        />
      )}
      {children}
    </div>
  );
};

// ==================== FOCUS RING STYLES ====================
export const focusRingStyles = {
  default: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  inset: 'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
  none: 'focus:outline-none',
  custom: (color: string, offset = true) =>
    `focus:outline-none focus:ring-2 focus:ring-${color}-500 ${offset ? 'focus:ring-offset-2' : ''}`,
} as const;

// ==================== HOOK: useFocusManagement ====================
export function useFocusManagement() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      setFocusedElement(e.target as HTMLElement);
    };

    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, []);

  const focusElement = (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    element?.focus();
  };

  const focusFirst = (containerSelector?: string) => {
    const container = containerSelector
      ? document.querySelector(containerSelector)
      : document.body;

    if (!container) return;

    const firstFocusable = container.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    firstFocusable?.focus();
  };

  const focusNext = () => {
    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.indexOf(focusedElement as HTMLElement);

    if (currentIndex < focusableElements.length - 1) {
      focusableElements[currentIndex + 1].focus();
    }
  };

  const focusPrevious = () => {
    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.indexOf(focusedElement as HTMLElement);

    if (currentIndex > 0) {
      focusableElements[currentIndex - 1].focus();
    }
  };

  return {
    focusedElement,
    focusElement,
    focusFirst,
    focusNext,
    focusPrevious,
  };
}

// ==================== HOOK: useFocusWithin ====================
export function useFocusWithin(ref: React.RefObject<HTMLElement>) {
  const [isFocusWithin, setIsFocusWithin] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleFocusIn = () => setIsFocusWithin(true);
    const handleFocusOut = (e: FocusEvent) => {
      if (!element.contains(e.relatedTarget as Node)) {
        setIsFocusWithin(false);
      }
    };

    element.addEventListener('focusin', handleFocusIn);
    element.addEventListener('focusout', handleFocusOut);

    return () => {
      element.removeEventListener('focusin', handleFocusIn);
      element.removeEventListener('focusout', handleFocusOut);
    };
  }, [ref]);

  return isFocusWithin;
}

// ==================== HOOK: useKeyboardOnly ====================
export function useKeyboardOnly() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isKeyboardUser;
}

// ==================== COMPONENT: KeyboardOnlyOutline ====================
export const KeyboardOnlyOutline: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const isKeyboardUser = useKeyboardOnly();

  return (
    <div className={`${isKeyboardUser ? '' : 'focus:outline-none'} ${className}`}>
      {children}
    </div>
  );
};

// ==================== COMPONENT: FocusGuard ====================
export const FocusGuard: React.FC<{
  onFocusEnter?: () => void;
}> = ({ onFocusEnter }) => {
  return (
    <div
      tabIndex={0}
      onFocus={onFocusEnter}
      style={{
        width: 0,
        height: 0,
        overflow: 'hidden',
        position: 'absolute',
      }}
      aria-hidden="true"
    />
  );
};

// ==================== HELPER FUNCTIONS ====================

function getFocusableElements(container: HTMLElement | Document = document): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  return Array.from(container.querySelectorAll(selector));
}

export function isFocusable(element: HTMLElement): boolean {
  const focusableElements = getFocusableElements();
  return focusableElements.includes(element);
}

export function getFirstFocusable(container?: HTMLElement): HTMLElement | null {
  const elements = getFocusableElements(container || document);
  return elements[0] || null;
}

export function getLastFocusable(container?: HTMLElement): HTMLElement | null {
  const elements = getFocusableElements(container || document);
  return elements[elements.length - 1] || null;
}

// ==================== FOCUS VISIBLE GLOBAL STYLES ====================
export const focusVisibleGlobalStyles = `
  /* Focus visible polyfill for browsers that don't support :focus-visible */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  /* Custom focus styles */
  *:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Skip links */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .sr-only.focus-visible:focus {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
`;

// Accessibility: WCAG 2.4.7 Focus Visible, 2.4.3 Focus Order
// Performance: Minimal DOM manipulation, optimized queries
// Usage: Apply to interactive components, modals, navigation
