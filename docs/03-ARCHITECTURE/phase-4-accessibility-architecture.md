# Phase 4: Accessibility Architecture
**Project:** Neoloop Design System Builder
**Phase:** 4 - Polish & Performance
**Date:** 2026-01-31
**Architect:** @architect
**Status:** Specification

---

## TABLE OF CONTENTS

1. [Accessibility Strategy](#1-accessibility-strategy)
2. [Focus Management System](#2-focus-management-system)
3. [ARIA Attribute Patterns](#3-aria-attribute-patterns)
4. [Keyboard Navigation](#4-keyboard-navigation)
5. [Screen Reader Support](#5-screen-reader-support)
6. [Color Contrast & Visual Design](#6-color-contrast--visual-design)
7. [Testing Strategy](#7-testing-strategy)

---

## 1. ACCESSIBILITY STRATEGY

### 1.1 WCAG 2.1 Compliance Targets

| Level | Target | Priority | Notes |
|-------|--------|----------|-------|
| **A** | 100% | Critical | Minimum legal requirement |
| **AA** | 100% | Critical | Industry standard |
| **AAA** | 80% | Medium | Where feasible |

### 1.2 Accessibility Principles

```typescript
// src/a11y/principles.ts

export const accessibilityPrinciples = {
  // POUR Principles
  perceivable: [
    'Provide text alternatives for non-text content',
    'Provide captions and transcripts for multimedia',
    'Create content that can be presented in different ways',
    'Make it easy to see and hear content',
  ],

  operable: [
    'Make all functionality keyboard accessible',
    'Give users enough time to read and use content',
    'Do not use content that causes seizures',
    'Help users navigate and find content',
  ],

  understandable: [
    'Make text readable and understandable',
    'Make content appear and operate in predictable ways',
    'Help users avoid and correct mistakes',
  ],

  robust: [
    'Maximize compatibility with current and future tools',
    'Ensure proper semantic HTML',
    'Use ARIA when native HTML is insufficient',
  ],
}
```

### 1.3 Component Accessibility Checklist

```typescript
// src/a11y/checklist.ts

export interface A11yChecklist {
  // Keyboard navigation
  keyboardNavigable: boolean
  focusManagement: boolean
  keyboardShortcuts: boolean

  // Screen readers
  ariaLabels: boolean
  ariaRoles: boolean
  ariaStates: boolean
  screenReaderTesting: boolean

  // Visual
  colorContrast: boolean
  focusIndicators: boolean
  textAlternatives: boolean

  // Interaction
  touchTargets: boolean
  errorMessages: boolean
  formValidation: boolean
}

export const componentA11yChecklist: Record<string, A11yChecklist> = {
  Button: {
    keyboardNavigable: true,
    focusManagement: true,
    keyboardShortcuts: false,
    ariaLabels: true,
    ariaRoles: true,
    ariaStates: true,
    screenReaderTesting: true,
    colorContrast: true,
    focusIndicators: true,
    textAlternatives: true,
    touchTargets: true,
    errorMessages: false,
    formValidation: false,
  },
  // ... more components
}
```

---

## 2. FOCUS MANAGEMENT SYSTEM

### 2.1 Focus Trap Hook

```typescript
// src/hooks/useFocusTrap.ts

import { useEffect, useRef } from 'react'

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Focus first element
    firstElement?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive])

  return containerRef
}

// Usage in Modal:
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const trapRef = useFocusTrap(isOpen)

  return (
    <div ref={trapRef} role="dialog" aria-modal="true">
      {children}
    </div>
  )
}
```

### 2.2 Focus Return Hook

```typescript
// src/hooks/useFocusReturn.ts

import { useEffect, useRef } from 'react'

export function useFocusReturn(isActive: boolean) {
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isActive) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement
    } else if (previousActiveElement.current) {
      // Return focus when component unmounts or becomes inactive
      previousActiveElement.current.focus()
      previousActiveElement.current = null
    }
  }, [isActive])
}

// Usage:
export function Drawer({ isOpen, onClose }: DrawerProps) {
  useFocusReturn(isOpen)
  const trapRef = useFocusTrap(isOpen)

  return isOpen ? (
    <div ref={trapRef}>
      {/* Drawer content */}
    </div>
  ) : null
}
```

### 2.3 Focus Visible Utility

```typescript
// src/utils/focus-visible.ts

/**
 * Detect if focus should be visible (keyboard vs mouse)
 */
export function setupFocusVisible() {
  let hadKeyboardEvent = true
  let hadFocusVisibleRecently = false
  let hadFocusVisibleRecentlyTimeout: number | null = null

  const inputTypesAllowlist = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    time: true,
    datetime: true,
    'datetime-local': true,
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'Alt' || e.key === 'Meta') {
      hadKeyboardEvent = true
    }
  }

  function onPointerDown() {
    hadKeyboardEvent = false
  }

  function onFocus(e: FocusEvent) {
    const target = e.target as HTMLElement

    if (
      hadKeyboardEvent ||
      (target instanceof HTMLInputElement &&
        inputTypesAllowlist[target.type as keyof typeof inputTypesAllowlist])
    ) {
      target.classList.add('focus-visible')
      hadFocusVisibleRecently = true

      if (hadFocusVisibleRecentlyTimeout) {
        clearTimeout(hadFocusVisibleRecentlyTimeout)
      }

      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false
      }, 100)
    }
  }

  function onBlur(e: FocusEvent) {
    const target = e.target as HTMLElement
    target.classList.remove('focus-visible')
  }

  document.addEventListener('keydown', onKeyDown, true)
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('focus', onFocus, true)
  document.addEventListener('blur', onBlur, true)
}

// Call in app initialization
setupFocusVisible()
```

### 2.4 Focus Indicators CSS

```css
/* src/styles/focus.css */

/* Hide focus ring by default */
*:focus {
  outline: none;
}

/* Show focus ring only for keyboard navigation */
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* High contrast focus indicators */
@media (prefers-contrast: high) {
  .focus-visible {
    outline-width: 3px;
    outline-offset: 3px;
  }
}

/* Dark mode focus indicators */
[data-theme="dark"] .focus-visible {
  outline-color: var(--color-primary-400);
}

/* Component-specific focus styles */
.button:focus-visible {
  outline-offset: 4px;
}

.input:focus-visible {
  outline-offset: 0;
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.card:focus-visible {
  outline-offset: -2px;
}
```

---

## 3. ARIA ATTRIBUTE PATTERNS

### 3.1 Common ARIA Patterns

```typescript
// src/a11y/aria-patterns.ts

export const ariaPatterns = {
  // Button patterns
  button: {
    basic: {
      role: 'button',
      'aria-pressed': false,
    },
    toggle: {
      role: 'button',
      'aria-pressed': 'true' as const,
    },
    loading: {
      'aria-busy': true,
      'aria-live': 'polite' as const,
    },
    disabled: {
      'aria-disabled': true,
    },
  },

  // Dialog/Modal patterns
  dialog: {
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': 'dialog-title',
    'aria-describedby': 'dialog-description',
  },

  // Menu patterns
  menu: {
    trigger: {
      'aria-haspopup': 'menu' as const,
      'aria-expanded': false,
    },
    menu: {
      role: 'menu',
    },
    menuitem: {
      role: 'menuitem',
    },
  },

  // Form patterns
  form: {
    field: {
      'aria-required': true,
      'aria-invalid': false,
      'aria-describedby': 'field-error',
    },
    error: {
      role: 'alert',
      'aria-live': 'assertive' as const,
    },
  },

  // Tab patterns
  tabs: {
    tablist: {
      role: 'tablist',
      'aria-label': 'Tabs',
    },
    tab: {
      role: 'tab',
      'aria-selected': false,
      'aria-controls': 'tabpanel-id',
    },
    tabpanel: {
      role: 'tabpanel',
      'aria-labelledby': 'tab-id',
    },
  },

  // Disclosure patterns
  disclosure: {
    trigger: {
      'aria-expanded': false,
      'aria-controls': 'content-id',
    },
    content: {
      id: 'content-id',
      'aria-hidden': true,
    },
  },
}
```

### 3.2 ARIA Hook

```typescript
// src/hooks/useAriaAttributes.ts

export function useAriaAttributes(
  componentType: keyof typeof ariaPatterns,
  state: Record<string, any>
) {
  const baseAttributes = ariaPatterns[componentType]

  // Merge with dynamic state
  const attributes = { ...baseAttributes }

  // Update based on state
  Object.keys(state).forEach((key) => {
    if (key.startsWith('aria-')) {
      attributes[key] = state[key]
    }
  })

  return attributes
}

// Usage:
export function Button({ isLoading, isDisabled, children, ...props }: ButtonProps) {
  const ariaAttributes = useAriaAttributes('button', {
    'aria-busy': isLoading,
    'aria-disabled': isDisabled,
  })

  return (
    <button {...ariaAttributes} {...props}>
      {children}
    </button>
  )
}
```

### 3.3 Live Region Announcer

```typescript
// src/a11y/live-region.ts

export class LiveRegionAnnouncer {
  private liveRegion: HTMLDivElement | null = null

  constructor() {
    this.createLiveRegion()
  }

  private createLiveRegion() {
    this.liveRegion = document.createElement('div')
    this.liveRegion.setAttribute('role', 'status')
    this.liveRegion.setAttribute('aria-live', 'polite')
    this.liveRegion.setAttribute('aria-atomic', 'true')
    this.liveRegion.className = 'sr-only'
    document.body.appendChild(this.liveRegion)
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.liveRegion) return

    this.liveRegion.setAttribute('aria-live', priority)
    this.liveRegion.textContent = message

    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = ''
      }
    }, 1000)
  }

  destroy() {
    if (this.liveRegion) {
      document.body.removeChild(this.liveRegion)
      this.liveRegion = null
    }
  }
}

// Global instance
export const announcer = new LiveRegionAnnouncer()

// Usage:
function ColorPicker({ onSelect }: ColorPickerProps) {
  const handleSelect = (color: string) => {
    onSelect(color)
    announcer.announce(`Selected color: ${color}`)
  }

  return <div>{/* color grid */}</div>
}
```

---

## 4. KEYBOARD NAVIGATION

### 4.1 Keyboard Event Handlers

```typescript
// src/hooks/useKeyboardNavigation.ts

export function useKeyboardNavigation(options: {
  onEnter?: () => void
  onEscape?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onHome?: () => void
  onEnd?: () => void
  onTab?: (e: KeyboardEvent) => void
}) {
  const handleKeyDown = (e: KeyboardEvent) => {
    const { key, shiftKey } = e

    switch (key) {
      case 'Enter':
        options.onEnter?.()
        break
      case 'Escape':
        options.onEscape?.()
        break
      case 'ArrowUp':
        e.preventDefault()
        options.onArrowUp?.()
        break
      case 'ArrowDown':
        e.preventDefault()
        options.onArrowDown?.()
        break
      case 'ArrowLeft':
        e.preventDefault()
        options.onArrowLeft?.()
        break
      case 'ArrowRight':
        e.preventDefault()
        options.onArrowRight?.()
        break
      case 'Home':
        e.preventDefault()
        options.onHome?.()
        break
      case 'End':
        e.preventDefault()
        options.onEnd?.()
        break
      case 'Tab':
        options.onTab?.(e)
        break
    }
  }

  return { onKeyDown: handleKeyDown }
}
```

### 4.2 Roving Tabindex

```typescript
// src/hooks/useRovingTabIndex.ts

import { useState, useRef, useCallback } from 'react'

export function useRovingTabIndex(itemCount: number) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const itemsRef = useRef<(HTMLElement | null)[]>([])

  const setItemRef = useCallback((index: number) => {
    return (element: HTMLElement | null) => {
      itemsRef.current[index] = element
    }
  }, [])

  const focusItem = useCallback((index: number) => {
    const item = itemsRef.current[index]
    if (item) {
      item.focus()
      setFocusedIndex(index)
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let newIndex = focusedIndex

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault()
          newIndex = (focusedIndex + 1) % itemCount
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          newIndex = (focusedIndex - 1 + itemCount) % itemCount
          break
        case 'Home':
          e.preventDefault()
          newIndex = 0
          break
        case 'End':
          e.preventDefault()
          newIndex = itemCount - 1
          break
        default:
          return
      }

      focusItem(newIndex)
    },
    [focusedIndex, itemCount, focusItem]
  )

  return {
    focusedIndex,
    setItemRef,
    handleKeyDown,
  }
}

// Usage in Menu:
export function Menu({ items }: MenuProps) {
  const { focusedIndex, setItemRef, handleKeyDown } = useRovingTabIndex(items.length)

  return (
    <ul role="menu" onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <li
          key={item.id}
          ref={setItemRef(index)}
          role="menuitem"
          tabIndex={focusedIndex === index ? 0 : -1}
        >
          {item.label}
        </li>
      ))}
    </ul>
  )
}
```

### 4.3 Keyboard Shortcuts

```typescript
// src/hooks/useKeyboardShortcuts.ts

interface Shortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcut = shortcuts.find(
        (s) =>
          s.key.toLowerCase() === e.key.toLowerCase() &&
          !!s.ctrl === e.ctrlKey &&
          !!s.shift === e.shiftKey &&
          !!s.alt === e.altKey &&
          !!s.meta === e.metaKey
      )

      if (shortcut) {
        e.preventDefault()
        shortcut.action()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])

  return shortcuts
}

// Usage:
function BuilderApp() {
  const shortcuts = useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      action: () => saveDesignSystem(),
      description: 'Save design system',
    },
    {
      key: 'e',
      ctrl: true,
      action: () => exportDesignSystem(),
      description: 'Export design system',
    },
    {
      key: 'z',
      ctrl: true,
      action: () => undo(),
      description: 'Undo',
    },
    {
      key: 'z',
      ctrl: true,
      shift: true,
      action: () => redo(),
      description: 'Redo',
    },
  ])

  return <div>{/* app content */}</div>
}
```

---

## 5. SCREEN READER SUPPORT

### 5.1 Visually Hidden Component

```typescript
// src/components/a11y/VisuallyHidden.tsx

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>
}

// CSS:
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

// Usage:
<button>
  <TrashIcon />
  <VisuallyHidden>Delete item</VisuallyHidden>
</button>
```

### 5.2 Screen Reader Only Text

```typescript
// src/components/a11y/SROnly.tsx

interface SROnlyProps {
  children: React.ReactNode
  focusable?: boolean
}

export function SROnly({ children, focusable = false }: SROnlyProps) {
  return (
    <span
      className={cn('sr-only', focusable && 'sr-only-focusable')}
      aria-live="polite"
    >
      {children}
    </span>
  )
}

// CSS for focusable SR-only:
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### 5.3 Landmark Regions

```typescript
// src/components/layout/Landmarks.tsx

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header role="banner" aria-label="Site header">
      {children}
    </header>
  )
}

export function Nav({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <nav role="navigation" aria-label={label}>
      {children}
    </nav>
  )
}

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main role="main" aria-label="Main content">
      {children}
    </main>
  )
}

export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer role="contentinfo" aria-label="Site footer">
      {children}
    </footer>
  )
}

export function Aside({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <aside role="complementary" aria-label={label}>
      {children}
    </aside>
  )
}
```

---

## 6. COLOR CONTRAST & VISUAL DESIGN

### 6.1 Contrast Checker

```typescript
// src/utils/contrast.ts

export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val /= 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function meetsWCAGAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5
}

export function meetsWCAGAAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 7
}

export function meetsWCAGAALarge(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 3
}

// Usage in color picker:
export function ColorPairValidator({ fg, bg }: { fg: string; bg: string }) {
  const ratio = getContrastRatio(fg, bg)
  const passesAA = meetsWCAGAA(fg, bg)
  const passesAAA = meetsWCAGAAA(fg, bg)

  return (
    <div>
      <p>Contrast Ratio: {ratio.toFixed(2)}:1</p>
      <p>WCAG AA: {passesAA ? '✓ Pass' : '✗ Fail'}</p>
      <p>WCAG AAA: {passesAAA ? '✓ Pass' : '✗ Fail'}</p>
    </div>
  )
}
```

### 6.2 Touch Target Size

```typescript
// src/a11y/touch-targets.ts

export const touchTargetGuidelines = {
  // Minimum touch target size
  minimum: {
    width: 44, // pixels
    height: 44, // pixels
  },

  // Recommended touch target size
  recommended: {
    width: 48,
    height: 48,
  },

  // Minimum spacing between targets
  spacing: 8, // pixels
}

// Validation function
export function validateTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  const { minimum } = touchTargetGuidelines

  return rect.width >= minimum.width && rect.height >= minimum.height
}

// CSS utility classes
/*
.touch-target {
  min-width: 44px;
  min-height: 44px;
}

.touch-target-lg {
  min-width: 48px;
  min-height: 48px;
}
*/
```

---

## 7. TESTING STRATEGY

### 7.1 Automated A11y Tests

```typescript
// src/tests/a11y.test.tsx

import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  it('Button has no a11y violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Modal has no a11y violations', async () => {
    const { container } = render(
      <Modal isOpen onClose={() => {}}>
        <h2>Modal Title</h2>
        <p>Modal content</p>
      </Modal>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### 7.2 Keyboard Navigation Tests

```typescript
// src/tests/keyboard.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Keyboard Navigation', () => {
  it('navigates menu with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Menu items={mockItems} />)

    const firstItem = screen.getByRole('menuitem', { name: 'Item 1' })
    firstItem.focus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Item 2' })).toHaveFocus()

    await user.keyboard('{ArrowUp}')
    expect(firstItem).toHaveFocus()
  })

  it('closes modal with Escape key', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Modal isOpen onClose={onClose}>Content</Modal>)

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })
})
```

### 7.3 Screen Reader Tests

```typescript
// src/tests/screen-reader.test.tsx

describe('Screen Reader Support', () => {
  it('announces button state changes', () => {
    const { rerender } = render(<ToggleButton isPressed={false}>Toggle</ToggleButton>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'false')

    rerender(<ToggleButton isPressed={true}>Toggle</ToggleButton>)
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('provides accessible name for icon button', () => {
    render(
      <IconButton aria-label="Delete item">
        <TrashIcon />
      </IconButton>
    )

    expect(screen.getByLabelText('Delete item')).toBeInTheDocument()
  })
})
```

---

## ACCESSIBILITY TARGETS

### Performance Metrics

| Metric | Target | Critical | Tool |
|--------|--------|----------|------|
| **Lighthouse A11y Score** | 100 | Yes | Chrome DevTools |
| **axe Violations** | 0 | Yes | jest-axe |
| **Keyboard Navigation** | 100% | Yes | Manual testing |
| **Screen Reader Support** | 100% | Yes | NVDA/JAWS/VoiceOver |
| **Color Contrast** | WCAG AA | Yes | Contrast checker |
| **Touch Targets** | 44x44px min | Yes | Visual inspection |

---

**Status:** Complete Specification
**Next:** Performance Optimization Guide
**Review:** After implementation
