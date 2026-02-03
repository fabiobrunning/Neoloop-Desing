import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<Spinner />)
      expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    })

    it('renders all sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      sizes.forEach(sz => {
        const { rerender, container } = render(<Spinner size={sz} />)
        const spinner = container.querySelector('[role="status"]')
        expect(spinner).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders all variants', () => {
      const variants = ['default', 'white', 'primary'] as const
      variants.forEach(v => {
        const { rerender, container } = render(<Spinner variant={v} />)
        const spinner = container.querySelector('[role="status"]')
        expect(spinner).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders with custom className', () => {
      const { container } = render(<Spinner className="custom-class" />)
      const wrapper = container.querySelector('[role="status"]')
      expect(wrapper).toHaveClass('custom-class')
    })

    it('renders with custom label', () => {
      render(<Spinner label="Processing..." />)
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('applies sm size classes', () => {
      const { container } = render(<Spinner size="sm" />)
      const classes = container.querySelector('[role="status"]')?.innerHTML
      expect(classes).toContain('w-4')
      expect(classes).toContain('h-4')
      expect(classes).toContain('border-2')
    })

    it('applies md size classes', () => {
      const { container } = render(<Spinner size="md" />)
      const classes = container.querySelector('[role="status"]')?.innerHTML
      expect(classes).toContain('w-8')
      expect(classes).toContain('h-8')
      expect(classes).toContain('border-2')
    })

    it('applies lg size classes', () => {
      const { container } = render(<Spinner size="lg" />)
      const classes = container.querySelector('[role="status"]')?.innerHTML
      expect(classes).toContain('w-12')
      expect(classes).toContain('h-12')
      expect(classes).toContain('border-3')
    })
  })

  describe('Variants', () => {
    it('applies default variant colors', () => {
      const { container } = render(<Spinner variant="default" />)
      const classes = container.querySelector('[role="status"]')?.innerHTML
      expect(classes).toContain('border-gray-300')
      expect(classes).toContain('border-t-blue-600')
    })

    it('applies white variant colors', () => {
      const { container } = render(<Spinner variant="white" />)
      const classes = container.querySelector('[role="status"]')?.innerHTML
      expect(classes).toContain('border-t-white')
    })

    it('applies primary variant colors', () => {
      const { container } = render(<Spinner variant="primary" />)
      const classes = container.querySelector('[role="status"]')?.innerHTML
      expect(classes).toContain('border-blue-200')
      expect(classes).toContain('border-t-blue-600')
    })
  })

  describe('Animation', () => {
    it('has animate-spin class', () => {
      const { container } = render(<Spinner />)
      const classes = container.querySelector('[role="status"]')?.innerHTML
      expect(classes).toContain('animate-spin')
    })

    it('has rounded-full for circular shape', () => {
      const { container } = render(<Spinner />)
      const classes = container.querySelector('[role="status"]')?.innerHTML
      expect(classes).toContain('rounded-full')
    })
  })

  describe('Accessibility', () => {
    it('has role="status"', () => {
      const { container } = render(<Spinner />)
      const wrapper = container.querySelector('[role="status"]')
      expect(wrapper).toHaveAttribute('role', 'status')
    })

    it('has aria-live="polite"', () => {
      const { container } = render(<Spinner />)
      const wrapper = container.querySelector('[role="status"]')
      expect(wrapper).toHaveAttribute('aria-live', 'polite')
    })

    it('has aria-label with custom label', () => {
      const { container } = render(<Spinner label="Loading data..." />)
      const wrapper = container.querySelector('[role="status"]')
      expect(wrapper).toHaveAttribute('aria-label', 'Loading data...')
    })

    it('has default aria-label', () => {
      const { container } = render(<Spinner />)
      const wrapper = container.querySelector('[role="status"]')
      expect(wrapper).toHaveAttribute('aria-label', 'Loading...')
    })

    it('has sr-only label for screen readers', () => {
      const { container } = render(<Spinner label="Loading..." />)
      const srLabel = container.querySelector('.sr-only')
      expect(srLabel).toHaveClass('sr-only')
      expect(srLabel).toHaveTextContent('Loading...')
    })

    it('supports forwardRef', () => {
      const ref = { current: null }
      render(<Spinner ref={ref as any} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('wrapper is inline-block', () => {
      const { container } = render(<Spinner />)
      const wrapper = container.querySelector('[role="status"]')
      expect(wrapper).toHaveClass('inline-block')
    })
  })

  describe('Edge Cases', () => {
    it('renders with empty label', () => {
      const { container } = render(<Spinner label="" />)
      const wrapper = container.querySelector('[role="status"]')
      expect(wrapper).toHaveAttribute('aria-label', '')
    })

    it('renders with very long label', () => {
      const longLabel = 'Loading the content for this very important page with lots of data...'
      render(<Spinner label={longLabel} />)
      expect(screen.getByText(longLabel)).toBeInTheDocument()
    })

    it('renders with special characters in label', () => {
      render(<Spinner label="Loading @#$%..." />)
      expect(screen.getByText('Loading @#$%...')).toBeInTheDocument()
    })

    it('renders with space-separated classes', () => {
      const { container } = render(<Spinner size="lg" variant="primary" />)
      const html = container.innerHTML
      expect(html).toContain('w-12')
      expect(html).toContain('h-12')
      expect(html).toContain('border-blue-200')
    })
  })
})
