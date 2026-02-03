# ADR-003: Component Composition Pattern

**Date:** 2026-01-30
**Status:** Accepted
**Decision Maker:** @architect
**Stakeholders:** Development Team, Design System Users

---

## Context and Problem Statement

We need to build 79 reusable UI components for the Neoloop Design System. These components must be:
1. Flexible enough for diverse use cases
2. Type-safe with excellent TypeScript support
3. Accessible (WCAG AA compliant)
4. Tree-shakable for optimal bundle size
5. Easy to understand and use
6. Composable (build complex UIs from simple parts)

We need to decide on a component architecture pattern that balances flexibility, simplicity, and performance.

---

## Decision Drivers

- **Flexibility:** Support many use cases without props explosion
- **Type Safety:** TypeScript autocomplete and error checking
- **Accessibility:** Built-in ARIA attributes and keyboard navigation
- **Bundle Size:** Only import what you use (tree-shaking)
- **Developer Experience:** Intuitive API, clear docs
- **Consistency:** Uniform pattern across all 79 components
- **Testability:** Easy to unit test each part independently

---

## Considered Options

### Option 1: Monolithic Components (Single Props Object)

```typescript
<Button
  variant="primary"
  size="md"
  icon={<Icon />}
  iconPosition="left"
  isLoading={false}
  isDisabled={false}
  onClick={handleClick}
>
  Click me
</Button>

<Card
  variant="elevated"
  padding="md"
  header={<h3>Title</h3>}
  body={<p>Content</p>}
  footer={<Button>Action</Button>}
  isHoverable={true}
  shadow="md"
/>
```

**Pros:**
- Simple mental model (one component)
- Easy to understand for beginners
- All options in one place

**Cons:**
- Props explosion (20+ props per component)
- Hard to extend (need to add props for every variation)
- Difficult to type (union types get complex)
- Not tree-shakable (entire component always imported)
- Poor composition (can't nest arbitrary content)

---

### Option 2: Compound Components (Composition Pattern)

```typescript
<Button variant="primary" size="md" onClick={handleClick}>
  <ButtonIcon icon={<Icon />} position="left" />
  <ButtonText>Click me</ButtonText>
</Button>

<Card variant="elevated">
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    <p>Content</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Pros:**
- Maximum flexibility (compose as needed)
- Clear separation of concerns
- Tree-shakable (only import used parts)
- Easy to extend (add new sub-components)
- Better type inference (each part has own types)
- Accessible (each part manages own ARIA)

**Cons:**
- More verbose (more JSX)
- Requires understanding composition
- Can be misused (wrong nesting)
- More components to document

---

### Option 3: Render Props Pattern

```typescript
<Button>
  {({ isHovered, isPressed }) => (
    <div>
      {isHovered && <Icon />}
      Click me
      {isPressed && <Spinner />}
    </div>
  )}
</Button>

<Card>
  {({ isExpanded, toggle }) => (
    <>
      <CardHeader onClick={toggle}>Title</CardHeader>
      {isExpanded && <CardBody>Content</CardBody>}
    </>
  )}
</Card>
```

**Pros:**
- Ultimate flexibility
- Access to internal state
- No props needed

**Cons:**
- Confusing for beginners
- Verbose (function wrapper)
- Performance overhead (function re-creation)
- Hard to type (generic render functions)
- Accessibility is user responsibility

---

### Option 4: Headless Components (Hooks + Primitives)

```typescript
function MyButton() {
  const { buttonProps, isPressed } = useButton({
    onPress: () => {}
  })

  return (
    <button {...buttonProps}>
      {isPressed ? 'Pressed' : 'Click me'}
    </button>
  )
}

function MyCard() {
  const { headerProps, bodyProps } = useCard()

  return (
    <div>
      <div {...headerProps}>Header</div>
      <div {...bodyProps}>Body</div>
    </div>
  )
}
```

**Pros:**
- Maximum control
- No style coupling
- Accessible (hooks provide ARIA)
- Small bundle (just logic)

**Cons:**
- Too low-level for design system
- Users must style everything
- Inconsistent UIs (no default styles)
- Steep learning curve

---

## Decision Outcome

**Chosen Option: Compound Components (Option 2) + ForwardRef Pattern**

We chose the compound component pattern inspired by Radix UI and Chakra UI because it provides the best balance of flexibility, accessibility, and developer experience.

### Pattern Definition

**Compound Component:** A parent component that works with sub-components to create a complete UI element.

**ForwardRef:** React pattern to pass refs through to DOM elements for accessibility and imperative actions.

---

## Implementation Pattern

### Basic Component Structure

```typescript
// src/components/primitives/cards/Card.tsx

import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

// Base props interface
interface BaseProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

// Main component props
export interface CardProps extends BaseProps {
  variant?: 'elevated' | 'outlined' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

// Main component (parent)
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'elevated', padding = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="article"
        className={cn(
          'rounded-lg',
          variant === 'elevated' && 'shadow-md bg-white',
          variant === 'outlined' && 'border-2 border-gray-200 bg-white',
          variant === 'flat' && 'bg-gray-50',
          padding === 'sm' && 'p-3',
          padding === 'md' && 'p-4',
          padding === 'lg' && 'p-6',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Sub-component: Header
export const CardHeader = forwardRef<HTMLDivElement, BaseProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-b border-gray-200 pb-3 mb-3', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

// Sub-component: Body
export const CardBody = forwardRef<HTMLDivElement, BaseProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardBody.displayName = 'CardBody'

// Sub-component: Footer
export const CardFooter = forwardRef<HTMLDivElement, BaseProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-t border-gray-200 pt-3 mt-3 flex gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'

// Export all parts
export { Card as Root, CardHeader as Header, CardBody as Body, CardFooter as Footer }
```

---

### Usage Examples

#### Simple Card
```typescript
import { Card, CardBody } from '@/components/primitives/cards'

<Card variant="elevated">
  <CardBody>
    Simple card content
  </CardBody>
</Card>
```

#### Complex Card
```typescript
import { Card, CardHeader, CardBody, CardFooter } from '@/components/primitives/cards'
import { Button } from '@/components/primitives/buttons'

<Card variant="outlined" padding="lg">
  <CardHeader>
    <h3 className="text-xl font-semibold">Card Title</h3>
    <p className="text-sm text-gray-500">Subtitle</p>
  </CardHeader>

  <CardBody>
    <p>Main content goes here with full flexibility.</p>
    <img src="..." alt="..." />
  </CardBody>

  <CardFooter>
    <Button variant="primary">Confirm</Button>
    <Button variant="outline">Cancel</Button>
  </CardFooter>
</Card>
```

#### Namespaced Variant (Alternative API)
```typescript
<Card.Root variant="elevated">
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card.Root>
```

---

### Advanced: Button with Icon

```typescript
// src/components/primitives/buttons/Button.tsx

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  isDisabled?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    isDisabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-medium rounded-md',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size={size} />}
        {leftIcon && !isLoading && <span className="inline-flex">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </button>
    )
  }
)

// Usage:
<Button
  variant="primary"
  size="md"
  leftIcon={<ChevronLeft />}
  rightIcon={<ArrowRight />}
>
  Next Step
</Button>
```

---

### Pattern for 79 Components

All components follow this structure:

```
Component/
├── Component.tsx         # Main component (forwardRef)
├── ComponentHeader.tsx   # Sub-component 1 (if needed)
├── ComponentBody.tsx     # Sub-component 2 (if needed)
├── ComponentFooter.tsx   # Sub-component 3 (if needed)
├── Component.types.ts    # TypeScript interfaces
└── index.ts              # Re-exports
```

**Examples:**
- `Modal` → `ModalHeader`, `ModalBody`, `ModalFooter`, `ModalClose`
- `Table` → `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableCell`
- `Accordion` → `AccordionItem`, `AccordionHeader`, `AccordionPanel`
- `Tabs` → `TabList`, `Tab`, `TabPanel`

---

## Why ForwardRef?

### Accessibility
```typescript
// Allows ref to focus the element
const buttonRef = useRef<HTMLButtonElement>(null)

<Button ref={buttonRef}>Click me</Button>

// Later:
buttonRef.current?.focus()
```

### Form Libraries
```typescript
// Works with react-hook-form
const { register } = useForm()

<Input {...register('email')} />
// register() returns a ref, forwardRef makes it work
```

### Animation Libraries
```typescript
// Works with Framer Motion
import { motion } from 'framer-motion'

const MotionButton = motion(Button)

<MotionButton animate={{ scale: 1.1 }} />
```

---

## Type Safety Example

```typescript
// src/types/components.ts

import { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'

// Base props all components extend
export interface BaseComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  className?: string
  testId?: string
  ariaLabel?: string
}

// Button-specific props
export interface ButtonProps extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  isDisabled?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

// TypeScript ensures:
// 1. All HTML button attributes work (onClick, type, form, etc.)
// 2. Our custom props are typed
// 3. Invalid props cause compile errors
// 4. Autocomplete works in IDE
```

---

## Accessibility Built-in

```typescript
// Each component manages its own ARIA attributes

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, isDisabled, ariaLabel, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled || isLoading}
        aria-busy={isLoading}              // Screen reader: "Button is busy"
        aria-disabled={isDisabled}          // Screen reader: "Button is disabled"
        aria-label={ariaLabel || undefined} // Custom label if no text
        {...props}
      >
        {children}
      </button>
    )
  }
)

// Modal example
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="dialog"                    // ARIA role
        aria-modal="true"                // Indicates modal behavior
        aria-hidden={!isOpen}            // Hide from screen readers when closed
        {...props}
      >
        {children}
      </div>
    )
  }
)
```

---

## Tree-Shaking Example

```typescript
// User only imports what they need

// Option 1: Named imports
import { Card, CardBody } from '@/components/primitives/cards'

// Option 2: Destructured default
import { Card } from '@/components/primitives'

// Vite/Webpack will only bundle:
// - Card component
// - CardBody component
// NOT: CardHeader, CardFooter (unused)

// Bundle savings: ~2-3KB per unused sub-component
```

---

## Positive Consequences

### For Component Authors (Us)
- Clear pattern to follow for all 79 components
- Each part is independently testable
- Easy to extend (add new sub-components)
- ForwardRef enables advanced use cases

### For Component Users
- Maximum flexibility (compose as needed)
- Type-safe (TypeScript autocomplete)
- Accessible by default (built-in ARIA)
- Small bundle size (tree-shaking)
- Intuitive API (self-documenting)

### For Design System
- Consistent architecture across all components
- Easy to maintain (each part has single responsibility)
- Scalable (add more components with same pattern)
- Exportable (users get same structure)

---

## Negative Consequences & Mitigation

### More Verbose
**Issue:** More JSX than monolithic components

**Mitigation:**
- Provide shortcuts for common patterns
- Document simple vs. complex use cases
- Component snippets in VS Code

```typescript
// Shortcut pattern
export function SimpleCard({ title, children, actions }) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>{children}</CardBody>
      {actions && <CardFooter>{actions}</CardFooter>}
    </Card>
  )
}
```

---

### Learning Curve
**Issue:** Users must understand composition

**Mitigation:**
- Comprehensive documentation with examples
- Interactive Storybook demos
- Video tutorials
- Templates for common patterns

---

### Potential Misuse
**Issue:** Users might nest components incorrectly

**Mitigation:**
- TypeScript warnings for invalid nesting
- Runtime warnings in development
- Clear error messages

```typescript
// Runtime validation (development only)
if (process.env.NODE_ENV === 'development') {
  if (!isValidChild(child)) {
    console.error(
      `Invalid child in <Card>. Expected CardHeader, CardBody, or CardFooter.`
    )
  }
}
```

---

## Validation & Metrics

### Success Criteria
- [ ] All 79 components use compound pattern
- [ ] All components use forwardRef
- [ ] TypeScript types for all props
- [ ] ARIA attributes on all interactive components
- [ ] Tree-shaking verified (unused parts not bundled)
- [ ] Documentation includes composition examples

### Code Quality Checks
```typescript
// ESLint rule to enforce forwardRef
'react/display-name': 'error',
'react/no-unused-prop-types': 'error',

// TypeScript check for forwardRef usage
function isUsingForwardRef(component: any): boolean {
  return component.$$typeof === Symbol.for('react.forward_ref')
}
```

---

## Examples of 79 Components

### Atomic Components (Simple)
```typescript
<Badge variant="success">New</Badge>
<Avatar src="..." alt="..." size="md" />
<Divider orientation="horizontal" />
<Spinner size="md" />
```

### Composite Components (Complex)
```typescript
<Accordion>
  <AccordionItem value="1">
    <AccordionHeader>Section 1</AccordionHeader>
    <AccordionPanel>Content 1</AccordionPanel>
  </AccordionItem>
</Accordion>

<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Name</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Related Decisions

- **ADR-001:** Tailwind CSS (styling inside components)
- **ADR-002:** Token organization (component tokens)
- **Future ADR:** Accessibility testing strategy

---

## References

- [Radix UI Composition](https://www.radix-ui.com/docs/primitives/overview/composition)
- [React ForwardRef](https://react.dev/reference/react/forwardRef)
- [Chakra UI Patterns](https://chakra-ui.com/docs/styled-system/component-style)
- [WAI-ARIA Best Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## Notes

- `forwardRef` is required for all components that render DOM elements
- `displayName` helps with debugging and React DevTools
- Sub-components can be exported as named exports or namespaced (Card.Header)
- All components should spread `...props` to allow HTML attributes
- TypeScript `satisfies` keyword helps with type inference

---

**Decision Status:** ✅ Accepted
**Review Date:** End of Week 2 (validate with 10+ components built)
**Last Updated:** 2026-01-30
