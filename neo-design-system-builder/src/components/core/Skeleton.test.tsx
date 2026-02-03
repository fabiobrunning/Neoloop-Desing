import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<Skeleton />)
      expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('renders text variant', () => {
      const { container } = render(<Skeleton variant="text" />)
      expect(container.querySelector('div')).toHaveClass('bg-gray-200')
    })

    it('renders rect variant', () => {
      const { container } = render(<Skeleton variant="rect" />)
      expect(container.querySelector('div')).toHaveClass('bg-gray-200')
    })

    it('renders circle variant', () => {
      const { container } = render(<Skeleton variant="circle" />)
      expect(container.querySelector('div')).toHaveClass('bg-gray-200')
    })

    it('renders with custom width', () => {
      const { container } = render(<Skeleton width={200} />)
      expect(container.querySelector('div')).toHaveStyle('width: 200px')
    })

    it('renders with custom height', () => {
      const { container } = render(<Skeleton height={100} />)
      expect(container.querySelector('div')).toHaveStyle('height: 100px')
    })

    it('renders multiple lines', () => {
      const { container } = render(<Skeleton lines={3} />)
      const divs = container.querySelectorAll('div')
      expect(divs.length).toBeGreaterThan(1)
    })

    it('renders with custom className', () => {
      const { container } = render(<Skeleton className="custom" />)
      expect(container.querySelector('div')).toHaveClass('custom')
    })
  })

  describe('Animation', () => {
    it('has animate-pulse by default', () => {
      const { container } = render(<Skeleton />)
      const html = container.innerHTML
      expect(html).toContain('animate-pulse')
    })

    it('removes animation when static is true', () => {
      const { container } = render(<Skeleton static />)
      const html = container.innerHTML
      expect(html).not.toContain('animate-pulse')
    })
  })

  describe('Variants', () => {
    it('text variant has correct classes', () => {
      const { container } = render(<Skeleton variant="text" />)
      const html = container.innerHTML
      expect(html).toContain('h-4')
      expect(html).toContain('rounded')
    })

    it('rect variant has rounded-lg', () => {
      const { container } = render(<Skeleton variant="rect" />)
      expect(container.innerHTML).toContain('rounded-lg')
    })

    it('circle variant has rounded-full', () => {
      const { container } = render(<Skeleton variant="circle" />)
      expect(container.innerHTML).toContain('rounded-full')
    })
  })

  describe('Accessibility', () => {
    it('supports forwardRef', () => {
      const ref = { current: null }
      render(<Skeleton ref={ref as any} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('has background color for contrast', () => {
      const { container } = render(<Skeleton />)
      expect(container.innerHTML).toContain('bg-gray-200')
    })

    it('renders with aria-hidden for decorative skeletons', () => {
      const { container } = render(<Skeleton aria-hidden />)
      expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('renders with string width', () => {
      const { container } = render(<Skeleton width="50%" />)
      expect(container.querySelector('div')).toHaveStyle('width: 50%')
    })

    it('renders with string height', () => {
      const { container } = render(<Skeleton height="200px" />)
      expect(container.querySelector('div')).toHaveStyle('height: 200px')
    })

    it('renders zero lines', () => {
      const { container } = render(<Skeleton lines={0} />)
      expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('renders many lines', () => {
      const { container } = render(<Skeleton lines={10} />)
      const divs = container.querySelectorAll('div')
      expect(divs.length).toBeGreaterThan(1)
    })
  })
})
