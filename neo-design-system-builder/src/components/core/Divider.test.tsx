import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<Divider />)
      expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('renders horizontal orientation', () => {
      const { container } = render(<Divider orientation="horizontal" />)
      expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('renders vertical orientation', () => {
      const { container } = render(<Divider orientation="vertical" />)
      expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Divider label="Or" />)
      expect(screen.getByText('Or')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const { container } = render(<Divider className="custom" />)
      expect(container.querySelector('div')).toHaveClass('custom')
    })
  })

  describe('Accessibility', () => {
    it('supports forwardRef', () => {
      const ref = { current: null }
      render(<Divider ref={ref as any} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('has semantic element', () => {
      const { container } = render(<Divider />)
      expect(container.querySelector('div')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('renders with empty label', () => {
      const { container } = render(<Divider label="" />)
      expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('renders with long label', () => {
      const longLabel = 'This is a very long divider label for testing purposes'
      render(<Divider label={longLabel} />)
      expect(screen.getByText(longLabel)).toBeInTheDocument()
    })
  })
})
