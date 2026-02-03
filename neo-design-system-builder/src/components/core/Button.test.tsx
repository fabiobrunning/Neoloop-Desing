import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import { Plus } from 'lucide-react'

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders all variants', () => {
      const variants = ['primary', 'secondary', 'tertiary', 'danger', 'success', 'warning', 'info', 'ghost'] as const

      variants.forEach(variant => {
        const { rerender } = render(<Button variant={variant}>{variant}</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders all sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

      sizes.forEach(size => {
        const { rerender } = render(<Button size={size}>{size}</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders with icon on left', () => {
      render(
        <Button icon={<Plus data-testid="icon" />} iconPosition="left">
          Add Item
        </Button>
      )
      const button = screen.getByRole('button')
      const icon = screen.getByTestId('icon')
      expect(button).toContainElement(icon)
    })

    it('renders with icon on right', () => {
      render(
        <Button icon={<Plus data-testid="icon" />} iconPosition="right">
          Add Item
        </Button>
      )
      const button = screen.getByRole('button')
      const icon = screen.getByTestId('icon')
      expect(button).toContainElement(icon)
    })
  })

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Click me</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('shows loading spinner when loading', () => {
      render(<Button loading>Loading...</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('is disabled when loading', () => {
      render(<Button loading>Loading...</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button onClick={handleClick}>Click me</Button>)
      await user.click(screen.getByRole('button'))

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      )
      await user.click(screen.getByRole('button'))

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <Button onClick={handleClick} loading>
          Click me
        </Button>
      )
      await user.click(screen.getByRole('button'))

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Styling', () => {
    it('applies fullWidth class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>)
      expect(screen.getByRole('button')).toHaveClass('w-full')
    })

    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })
  })

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Button>Accessible</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('has aria-busy when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('can be focused', () => {
      render(<Button>Focus me</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })
  })
})
