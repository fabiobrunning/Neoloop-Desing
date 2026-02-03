import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<ProgressBar />)
      expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument()
    })

    it('renders all variants', () => {
      const variants = ['default', 'success', 'warning', 'error'] as const
      variants.forEach(v => {
        const { rerender, container } = render(<ProgressBar variant={v} />)
        expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders all sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      sizes.forEach(sz => {
        const { rerender, container } = render(<ProgressBar size={sz} />)
        expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders with value', () => {
      const { container } = render(<ProgressBar value={50} />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).toHaveAttribute('aria-valuenow', '50')
    })

    it('renders indeterminate state', () => {
      const { container } = render(<ProgressBar indeterminate />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).not.toHaveAttribute('aria-valuenow')
    })

    it('renders with label', () => {
      render(<ProgressBar label="Loading..." />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const { container } = render(<ProgressBar className="custom-class" />)
      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('custom-class')
    })
  })

  describe('Values', () => {
    it('accepts value prop', () => {
      const { container } = render(<ProgressBar value={50} />)
      expect(container.querySelector('[role="progressbar"]')).toHaveAttribute('aria-valuenow', '50')
    })

    it('supports custom max value', () => {
      const { container } = render(<ProgressBar value={50} max={200} />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).toHaveAttribute('aria-valuenow', '50')
      expect(bar).toHaveAttribute('aria-valuemax', '200')
    })

    it('renders 0% progress', () => {
      render(<ProgressBar value={0} showLabel />)
      expect(screen.getByText('0%')).toBeInTheDocument()
    })

    it('renders 50% progress', () => {
      render(<ProgressBar value={50} showLabel />)
      expect(screen.getByText('50%')).toBeInTheDocument()
    })

    it('renders 100% progress', () => {
      render(<ProgressBar value={100} showLabel />)
      expect(screen.getByText('100%')).toBeInTheDocument()
    })
  })

  describe('Label Display', () => {
    it('shows label text', () => {
      render(<ProgressBar label="Uploading" />)
      expect(screen.getByText('Uploading')).toBeInTheDocument()
    })

    it('shows percentage when showLabel is true', () => {
      render(<ProgressBar value={75} showLabel />)
      expect(screen.getByText('75%')).toBeInTheDocument()
    })

    it('shows both label and percentage', () => {
      render(<ProgressBar value={60} label="Upload" showLabel />)
      expect(screen.getByText('Upload')).toBeInTheDocument()
      expect(screen.getByText('60%')).toBeInTheDocument()
    })

    it('does not show percentage for indeterminate', () => {
      const { queryByText } = render(<ProgressBar indeterminate showLabel />)
      expect(queryByText(/\d+%/)).not.toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('applies full width', () => {
      const { container } = render(<ProgressBar />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass('w-full')
    })

    it('applies variant colors', () => {
      const { container: containerSuccess } = render(<ProgressBar variant="success" />)
      const html = containerSuccess.innerHTML
      expect(html).toContain('bg-green')

      const { container: containerError } = render(<ProgressBar variant="error" />)
      expect(containerError.innerHTML).toContain('bg-red')
    })
  })

  describe('Accessibility', () => {
    it('has role="progressbar"', () => {
      const { container } = render(<ProgressBar />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).toHaveAttribute('role', 'progressbar')
    })

    it('has aria-valuemin="0"', () => {
      const { container } = render(<ProgressBar />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).toHaveAttribute('aria-valuemin', '0')
    })

    it('has aria-valuemax', () => {
      const { container } = render(<ProgressBar max={200} />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).toHaveAttribute('aria-valuemax', '200')
    })

    it('has aria-valuenow for determinate', () => {
      const { container } = render(<ProgressBar value={45} />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).toHaveAttribute('aria-valuenow', '45')
    })

    it('does not have aria-valuenow for indeterminate', () => {
      const { container } = render(<ProgressBar indeterminate />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).not.toHaveAttribute('aria-valuenow')
    })

    it('has aria-label from label prop', () => {
      const { container } = render(<ProgressBar label="Download" />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).toHaveAttribute('aria-label', 'Download')
    })

    it('has default aria-label', () => {
      const { container } = render(<ProgressBar />)
      const bar = container.querySelector('[role="progressbar"]')
      expect(bar).toHaveAttribute('aria-label', 'Progress')
    })

    it('supports forwardRef', () => {
      const ref = { current: null }
      render(<ProgressBar ref={ref as any} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Edge Cases', () => {
    it('renders with decimal value', () => {
      render(<ProgressBar value={33.33} showLabel />)
      expect(screen.getByText('33%')).toBeInTheDocument()
    })

    it('rounds percentage correctly', () => {
      render(<ProgressBar value={33.6} showLabel />)
      expect(screen.getByText('34%')).toBeInTheDocument()
    })

    it('renders with very long label', () => {
      const longLabel = 'This is a very long label describing the progress...'
      render(<ProgressBar label={longLabel} />)
      expect(screen.getByText(longLabel)).toBeInTheDocument()
    })

    it('renders empty label gracefully', () => {
      const { container } = render(<ProgressBar label="" />)
      expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument()
    })
  })
})
