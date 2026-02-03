import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { checkA11y, assertAriaAttributes } from '@/tests/utils/a11y'
import { Badge } from '@/src/components/core/Badge'

describe('Badge Accessibility', () => {
  test('has no axe violations - default', async () => {
    const { container } = render(<Badge>Default Badge</Badge>)
    await checkA11y(container)
  })

  test('has no axe violations - all variants', async () => {
    const variants = ['default', 'primary', 'success', 'warning', 'error', 'info'] as const
    for (const variant of variants) {
      const { container } = render(<Badge variant={variant}>{variant}</Badge>)
      await checkA11y(container)
    }
  })

  test('has no axe violations - all sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { container } = render(<Badge size={size}>{size}</Badge>)
      await checkA11y(container)
    }
  })

  test('has no axe violations - with dot', async () => {
    const { container } = render(<Badge dot>With Dot</Badge>)
    await checkA11y(container)
  })

  test('has no axe violations - removable', async () => {
    const { container } = render(<Badge removable>Removable Badge</Badge>)
    await checkA11y(container)
  })

  test('has no axe violations - with all features combined', async () => {
    const { container } = render(
      <Badge variant="success" size="lg" dot removable>
        Full Featured Badge
      </Badge>
    )
    await checkA11y(container)
  })

  test('remove button has proper aria-label', () => {
    render(<Badge removable>Delete This</Badge>)
    const removeButton = screen.getByRole('button', { name: /remove delete this/i })
    expect(removeButton).toHaveAttribute('aria-label', 'Remove Delete This')
  })

  test('remove button is keyboard accessible', () => {
    render(<Badge removable>Keyboard Badge</Badge>)
    const removeButton = screen.getByRole('button')
    removeButton.focus()
    expect(removeButton).toHaveFocus()
  })

  test('dot is hidden from assistive technologies', () => {
    const { container } = render(<Badge dot>Badge with Dot</Badge>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toHaveAttribute('aria-hidden', 'true')
  })

  test('remove button has correct type for semantic HTML', () => {
    render(<Badge removable>Badge</Badge>)
    const removeButton = screen.getByRole('button', { name: /remove/i })
    expect(removeButton).toHaveAttribute('type', 'button')
  })

  test('maintains sufficient color contrast for default variant', () => {
    const { container } = render(<Badge variant="default">Default</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('text-gray-800', 'bg-gray-100')
  })

  test('maintains sufficient color contrast for primary variant', () => {
    const { container } = render(<Badge variant="primary">Primary</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('text-blue-800', 'bg-blue-100')
  })

  test('maintains sufficient color contrast for success variant', () => {
    const { container } = render(<Badge variant="success">Success</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('text-green-800', 'bg-green-100')
  })

  test('maintains sufficient color contrast for warning variant', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('text-yellow-800', 'bg-yellow-100')
  })

  test('maintains sufficient color contrast for error variant', () => {
    const { container } = render(<Badge variant="error">Error</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('text-red-800', 'bg-red-100')
  })

  test('maintains sufficient color contrast for info variant', () => {
    const { container } = render(<Badge variant="info">Info</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('text-cyan-800', 'bg-cyan-100')
  })

  test('is semantic HTML with proper element', () => {
    const { container } = render(<Badge>Semantic Badge</Badge>)
    const badge = container.querySelector('span')
    expect(badge?.tagName).toBe('SPAN')
  })

  test('remove button ring is visible on focus', () => {
    const { container } = render(<Badge removable>Focus Badge</Badge>)
    const removeButton = container.querySelector('button')
    expect(removeButton).toHaveClass('focus:ring-2', 'focus:ring-offset-1')
  })

  test('remove button has hover state for visual feedback', () => {
    const { container } = render(<Badge removable>Hover Badge</Badge>)
    const removeButton = container.querySelector('button')
    expect(removeButton).toHaveClass('hover:opacity-70')
  })
})
