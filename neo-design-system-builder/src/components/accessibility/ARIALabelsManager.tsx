/**
 * ARIA Labels Manager
 *
 * Utilities and components for managing ARIA attributes.
 * Provides live regions, announcements, and accessible naming patterns.
 *
 * @usage
 * ```tsx
 * import { LiveRegion, VisuallyHidden, useAriaAnnouncer } from '@/components/accessibility/ARIALabelsManager';
 *
 * const announce = useAriaAnnouncer();
 * announce('Form submitted successfully', 'polite');
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';

// ==================== TYPES ====================
export type AriaLive = 'polite' | 'assertive' | 'off';
export type AriaRole =
  | 'alert'
  | 'status'
  | 'log'
  | 'marquee'
  | 'timer'
  | 'alertdialog'
  | 'dialog'
  | 'navigation'
  | 'region'
  | 'article'
  | 'main'
  | 'complementary'
  | 'contentinfo';

interface LiveRegionProps {
  message: string;
  politeness?: AriaLive;
  role?: AriaRole;
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text' | 'additions removals' | 'removals text' | 'text removals';
  className?: string;
}

interface VisuallyHiddenProps {
  children: React.ReactNode;
  focusable?: boolean;
  className?: string;
}

// ==================== LIVE REGION ====================
export const LiveRegion: React.FC<LiveRegionProps> = ({
  message,
  politeness = 'polite',
  role = 'status',
  atomic = true,
  relevant = 'additions text',
  className = '',
}) => {
  return (
    <div
      role={role}
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className={`sr-only ${className}`}
    >
      {message}
    </div>
  );
};

// ==================== VISUALLY HIDDEN ====================
export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  focusable = false,
  className = '',
}) => {
  const baseClasses = focusable
    ? 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:shadow-lg'
    : 'sr-only';

  return <span className={`${baseClasses} ${className}`}>{children}</span>;
};

// ==================== HOOK: useAriaAnnouncer ====================
export function useAriaAnnouncer() {
  const [announcement, setAnnouncement] = useState<{
    message: string;
    politeness: AriaLive;
  } | null>(null);

  const announce = (message: string, politeness: AriaLive = 'polite') => {
    // Clear previous announcement
    setAnnouncement(null);

    // Set new announcement after a tick (ensures screen readers detect the change)
    requestAnimationFrame(() => {
      setAnnouncement({ message, politeness });
    });

    // Auto-clear after 5 seconds
    setTimeout(() => {
      setAnnouncement(null);
    }, 5000);
  };

  const AnnouncerComponent = () => {
    if (!announcement) return null;

    return (
      <LiveRegion message={announcement.message} politeness={announcement.politeness} />
    );
  };

  return { announce, Announcer: AnnouncerComponent };
}

// ==================== ARIA ATTRIBUTES ====================

/**
 * Generate accessible label attributes
 */
export function getAriaLabel(label: string, describedBy?: string) {
  return {
    'aria-label': label,
    ...(describedBy && { 'aria-describedby': describedBy }),
  };
}

/**
 * Generate accessible description attributes
 */
export function getAriaDescription(id: string, description: string) {
  return {
    id,
    children: <VisuallyHidden>{description}</VisuallyHidden>,
  };
}

/**
 * Generate accessible button attributes
 */
export function getAriaButton(props: {
  label: string;
  pressed?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  haspopup?: boolean | 'menu' | 'dialog' | 'listbox' | 'tree' | 'grid';
  controls?: string;
}) {
  return {
    role: 'button',
    'aria-label': props.label,
    ...(props.pressed !== undefined && { 'aria-pressed': props.pressed }),
    ...(props.expanded !== undefined && { 'aria-expanded': props.expanded }),
    ...(props.disabled && { 'aria-disabled': true }),
    ...(props.haspopup && { 'aria-haspopup': props.haspopup }),
    ...(props.controls && { 'aria-controls': props.controls }),
  };
}

/**
 * Generate accessible form field attributes
 */
export function getAriaFormField(props: {
  id: string;
  label: string;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  errorId?: string;
}) {
  return {
    id: props.id,
    'aria-label': props.label,
    ...(props.required && { 'aria-required': true }),
    ...(props.invalid && { 'aria-invalid': true }),
    ...(props.describedBy && { 'aria-describedby': props.describedBy }),
    ...(props.errorId && props.invalid && { 'aria-errormessage': props.errorId }),
  };
}

// ==================== COMPONENT: AccessibleIcon ====================
export const AccessibleIcon: React.FC<{
  icon: React.ReactNode;
  label: string;
  decorative?: boolean;
  className?: string;
}> = ({ icon, label, decorative = false, className = '' }) => {
  if (decorative) {
    return (
      <span aria-hidden="true" className={className}>
        {icon}
      </span>
    );
  }

  return (
    <span role="img" aria-label={label} className={className}>
      {icon}
    </span>
  );
};

// ==================== COMPONENT: AccessibleImage ====================
export const AccessibleImage: React.FC<{
  src: string;
  alt: string;
  decorative?: boolean;
  className?: string;
}> = ({ src, alt, decorative = false, className = '' }) => {
  return (
    <img
      src={src}
      alt={decorative ? '' : alt}
      aria-hidden={decorative}
      className={className}
    />
  );
};

// ==================== COMPONENT: DescribedBy ====================
export const DescribedBy: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  return (
    <div id={id} className="sr-only">
      {children}
    </div>
  );
};

// ==================== COMPONENT: ErrorMessage ====================
export const ErrorMessage: React.FC<{
  id: string;
  children: React.ReactNode;
  visible?: boolean;
  className?: string;
}> = ({ id, children, visible = true, className = '' }) => {
  if (!visible) return null;

  return (
    <div
      id={id}
      role="alert"
      aria-live="assertive"
      className={`text-sm text-red-600 mt-1 ${className}`}
    >
      {children}
    </div>
  );
};

// ==================== COMPONENT: LoadingAnnouncement ====================
export const LoadingAnnouncement: React.FC<{
  isLoading: boolean;
  loadingMessage?: string;
  completeMessage?: string;
}> = ({
  isLoading,
  loadingMessage = 'Loading...',
  completeMessage = 'Content loaded',
}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isLoading) {
      setMessage(loadingMessage);
    } else if (message === loadingMessage) {
      setMessage(completeMessage);
      setTimeout(() => setMessage(''), 3000);
    }
  }, [isLoading, loadingMessage, completeMessage, message]);

  return <LiveRegion message={message} politeness="polite" />;
};

// ==================== COMPONENT: StatusMessage ====================
export const StatusMessage: React.FC<{
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  visible?: boolean;
  className?: string;
}> = ({ message, type = 'info', visible = true, className = '' }) => {
  if (!visible) return null;

  const roleMap = {
    info: 'status',
    success: 'status',
    warning: 'alert',
    error: 'alert',
  } as const;

  const politenessMap = {
    info: 'polite',
    success: 'polite',
    warning: 'assertive',
    error: 'assertive',
  } as const;

  return (
    <div
      role={roleMap[type]}
      aria-live={politenessMap[type]}
      className={className}
    >
      {message}
    </div>
  );
};

// ==================== HOOK: useAriaExpanded ====================
export function useAriaExpanded(initialExpanded = false) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const contentId = useRef(`content-${Math.random().toString(36).substr(2, 9)}`);

  const getToggleProps = () => ({
    'aria-expanded': isExpanded,
    'aria-controls': contentId.current,
    onClick: () => setIsExpanded(!isExpanded),
  });

  const getContentProps = () => ({
    id: contentId.current,
    hidden: !isExpanded,
  });

  return {
    isExpanded,
    setIsExpanded,
    getToggleProps,
    getContentProps,
  };
}

// ==================== HOOK: useAriaPressed ====================
export function useAriaPressed(initialPressed = false) {
  const [isPressed, setIsPressed] = useState(initialPressed);

  const getButtonProps = () => ({
    'aria-pressed': isPressed,
    onClick: () => setIsPressed(!isPressed),
  });

  return {
    isPressed,
    setIsPressed,
    getButtonProps,
  };
}

// ==================== HOOK: useAriaSelected ====================
export function useAriaSelected(initialSelected: string | null = null) {
  const [selectedId, setSelectedId] = useState(initialSelected);

  const getItemProps = (id: string) => ({
    'aria-selected': id === selectedId,
    onClick: () => setSelectedId(id),
  });

  return {
    selectedId,
    setSelectedId,
    getItemProps,
  };
}

// ==================== COMPONENT: LandmarkRegion ====================
export const LandmarkRegion: React.FC<{
  children: React.ReactNode;
  label: string;
  role?: 'navigation' | 'main' | 'complementary' | 'contentinfo' | 'region' | 'search';
  className?: string;
}> = ({ children, label, role = 'region', className = '' }) => {
  return (
    <div role={role} aria-label={label} className={className}>
      {children}
    </div>
  );
};

// ==================== HELPER: generateId ====================
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== ARIA PATTERNS ====================
export const ariaPatterns = {
  // Accordion
  accordion: {
    container: { role: 'region' as const },
    trigger: (expanded: boolean, controls: string) => ({
      'aria-expanded': expanded,
      'aria-controls': controls,
    }),
    panel: (id: string, labelledBy: string) => ({
      id,
      role: 'region' as const,
      'aria-labelledby': labelledBy,
    }),
  },

  // Tabs
  tabs: {
    container: { role: 'tablist' as const },
    tab: (selected: boolean, controls: string) => ({
      role: 'tab' as const,
      'aria-selected': selected,
      'aria-controls': controls,
      tabIndex: selected ? 0 : -1,
    }),
    panel: (id: string, labelledBy: string) => ({
      id,
      role: 'tabpanel' as const,
      'aria-labelledby': labelledBy,
    }),
  },

  // Dialog
  dialog: {
    overlay: { role: 'dialog' as const, 'aria-modal': true },
    title: (id: string) => ({ id, role: 'heading' as const, 'aria-level': 2 }),
    description: (id: string) => ({ id }),
  },

  // Menu
  menu: {
    container: { role: 'menu' as const },
    item: { role: 'menuitem' as const },
    checkbox: (checked: boolean) => ({
      role: 'menuitemcheckbox' as const,
      'aria-checked': checked,
    }),
    radio: (checked: boolean) => ({
      role: 'menuitemradio' as const,
      'aria-checked': checked,
    }),
  },
};

// Accessibility: WCAG 2.1 Level AA compliant ARIA usage
// Performance: Minimal re-renders, optimized state management
// Usage: Apply to all interactive components
