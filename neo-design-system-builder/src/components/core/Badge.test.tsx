import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Badge } from './Badge'

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Badge>Default</Badge>)
      expect(screen.getByText('Default')).toBeInTheDocument()
    })

    it('renders all variants', () => {
      const variants = ['default', 'primary', 'success', 'warning', 'error', 'info'] as const

      variants.forEach(variant => {
        const { rerender } = render(<Badge variant={variant}>{variant}</Badge>)
        expect(screen.getByText(variant)).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders all sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const

      sizes.forEach(size => {
        const { rerender } = render(<Badge size={size}>{size}</Badge>)
        expect(screen.getByText(size)).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders with dot indicator', () => {
      render(<Badge dot>With Dot</Badge>)
      const badge = screen.getByText('With Dot')
      const span = badge.parentElement
      expect(span?.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    })

    it('renders without dot by default', () => {
      render(<Badge>Without Dot</Badge>)
      const badge = screen.getByText('Without Dot')
      const span = badge.parentElement
      expect(span?.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
    })

    it('renders remove button when removable is true', () => {
      render(<Badge removable>Removable</Badge>)
      expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
    })

    it('does not render remove button by default', () => {
      render(<Badge>Not Removable</Badge>)
      expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const { container } = render(<Badge className="custom-class">Custom</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('custom-class')
    })
  })

  describe('States', () => {
    it('applies correct styling for primary variant', () => {
      const { container } = render(<Badge variant="primary">Primary</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('applies correct styling for success variant', () => {
      const { container } = render(<Badge variant="success">Success</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('applies correct styling for warning variant', () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
    })

    it('applies correct styling for error variant', () => {
      const { container } = render(<Badge variant="error">Error</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('bg-red-100', 'text-red-800')
    })

    it('applies correct styling for info variant', () => {
      const { container } = render(<Badge variant="info">Info</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('bg-cyan-100', 'text-cyan-800')
    })

    it('applies correct sizing for small badge', () => {
      const { container } = render(<Badge size="sm">Small</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs')
    })

    it('applies correct sizing for medium badge', () => {
      const { container } = render(<Badge size="md">Medium</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('px-2.5', 'py-0.5', 'text-sm')
    })

    it('applies correct sizing for large badge', () => {
      const { container } = render(<Badge size="lg">Large</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('px-3', 'py-1', 'text-base')
    })

    it('renders dot with correct color for variant', () => {
      const { container } = render(<Badge variant="success" dot>With Dot</Badge>)
      const dot = container.querySelector('[aria-hidden="true"]')
      expect(dot).toHaveClass('bg-green-500')
    })
  })

  describe('Interactions', () => {
    it('calls onRemove when remove button is clicked', async () => {
      const user = userEvent.setup()
      const handleRemove = vi.fn()

      render(
        <Badge removable onRemove={handleRemove}>
          Removable Badge
        </Badge>
      )

      const removeButton = screen.getByRole('button', { name: /remove/i })
      await user.click(removeButton)

      expect(handleRemove).toHaveBeenCalledTimes(1)
    })

    it('stops event propagation when remove button is clicked', async () => {
      const user = userEvent.setup()
      const handleRemove = vi.fn()
      const handleParentClick = vi.fn()

      render(
        <div onClick={handleParentClick}>
          <Badge removable onRemove={handleRemove}>
            Removable Badge
          </Badge>
        </div>
      )

      const removeButton = screen.getByRole('button', { name: /remove/i })
      await user.click(removeButton)

      expect(handleParentClick).not.toHaveBeenCalled()
    })

    it('does not call onRemove if callback is not provided', async () => {
      const user = userEvent.setup()

      render(<Badge removable>Removable Badge</Badge>)

      const removeButton = screen.getByRole('button', { name: /remove/i })
      // Should not throw
      await user.click(removeButton)
    })
  })

  describe('Accessibility', () => {
    it('has accessible remove button with aria-label', () => {
      render(<Badge removable>Badge Label</Badge>)
      const removeButton = screen.getByRole('button', { name: /remove badge label/i })
      expect(removeButton).toHaveAttribute('aria-label', 'Remove Badge Label')
    })

    it('has focus visible on remove button', () => {
      render(<Badge removable>Removable</Badge>)
      const removeButton = screen.getByRole('button')
      removeButton.focus()
      expect(removeButton).toHaveFocus()
    })

    it('dot is hidden from screen readers', () => {
      render(<Badge dot>Badge with Dot</Badge>)
      const dot = screen.queryByRole('presentation')
      // dot has aria-hidden="true"
      const badge = screen.getByText('Badge with Dot')
      const span = badge.parentElement
      const hiddenDot = span?.querySelector('[aria-hidden="true"]')
      expect(hiddenDot).toHaveAttribute('aria-hidden', 'true')
    })

    it('remove button has proper type attribute', () => {
      render(<Badge removable>Removable</Badge>)
      const removeButton = screen.getByRole('button', { name: /remove/i })
      expect(removeButton).toHaveAttribute('type', 'button')
    })

    it('badge is inline-flex for proper layout', () => {
      const { container } = render(<Badge>Badge</Badge>)
      const badge = container.querySelector('span')
      expect(badge).toHaveClass('inline-flex')
    })
  })

  describe('Edge Cases', () => {
    it('renders with empty string content', () => {
      const { container } = render(<Badge>{''}</Badge>)
      expect(container.querySelector('span')).toBeInTheDocument()
    })

    it('renders with multiple children elements', () => {
      render(
        <Badge>
          <span>Part 1</span>
          <span>Part 2</span>
        </Badge>
      )
      expect(screen.getByText('Part 1')).toBeInTheDocument()
      expect(screen.getByText('Part 2')).toBeInTheDocument()
    })

    it('renders with special characters in content', () => {
      render(<Badge>@#$%</Badge>)
      expect(screen.getByText('@#$%')).toBeInTheDocument()
    })

    it('supports forwardRef', () => {
      const ref = { current: null }
      render(<Badge ref={ref as any}>Ref Badge</Badge>)
      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })
})
