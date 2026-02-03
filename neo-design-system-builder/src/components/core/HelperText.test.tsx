import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HelperText } from './HelperText'

describe('HelperText', () => {
  describe('Rendering', () => {
    it('renders with content', () => {
      render(<HelperText>Help text</HelperText>)
      expect(screen.getByText('Help text')).toBeInTheDocument()
    })

    it('renders all variants', () => {
      const variants = ['default', 'success', 'error', 'warning', 'info'] as const
      variants.forEach(v => {
        const { rerender } = render(<HelperText variant={v}>Text</HelperText>)
        expect(screen.getByText('Text')).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders all sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      sizes.forEach(sz => {
        const { rerender } = render(<HelperText size={sz}>Text</HelperText>)
        expect(screen.getByText('Text')).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders with icon', () => {
      render(<HelperText icon={<span data-testid="icon">✓</span>}>Success</HelperText>)
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const { container } = render(<HelperText className="custom">Text</HelperText>)
      expect(container.querySelector('span, div')).toHaveClass('custom')
    })
  })

  describe('Accessibility', () => {
    it('supports forwardRef', () => {
      const ref = { current: null }
      render(<HelperText ref={ref as any}>Text</HelperText>)
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })

    it('has semantic content', () => {
      render(<HelperText>Helper text</HelperText>)
      expect(screen.getByText('Helper text')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('renders with empty content', () => {
      const { container } = render(<HelperText>{''}</HelperText>)
      expect(container.querySelector('span, div')).toBeInTheDocument()
    })

    it('renders with long text', () => {
      const longText = 'This is a very long helper text that explains something in detail'
      render(<HelperText>{longText}</HelperText>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })
  })
})
