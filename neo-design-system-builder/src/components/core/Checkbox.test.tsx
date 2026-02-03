import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders without label', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Checkbox label="Subscribe" helperText="Get weekly updates" />)
      expect(screen.getByText('Get weekly updates')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(<Checkbox label="Required" error="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('renders checked when checked prop is true', () => {
      render(<Checkbox checked />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('is disabled when disabled prop is true', () => {
      render(<Checkbox disabled />)
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('sets indeterminate state', () => {
      render(<Checkbox indeterminate />)
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.indeterminate).toBe(true)
    })
  })

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Checkbox onChange={handleChange} />)
      await user.click(screen.getByRole('checkbox'))

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('toggles checked state when clicked', async () => {
      const user = userEvent.setup()
      render(<Checkbox label="Toggle me" />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()

      await user.click(checkbox)
      expect(checkbox).toBeChecked()

      await user.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    it('can be clicked via label', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Checkbox label="Click label" onChange={handleChange} />)
      await user.click(screen.getByText('Click label'))

      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Checkbox onChange={handleChange} disabled />)
      await user.click(screen.getByRole('checkbox'))

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Error State', () => {
    it('shows error message', () => {
      render(<Checkbox error="Error message" />)
      expect(screen.getByText('Error message')).toBeInTheDocument()
    })

    it('marks checkbox as invalid', () => {
      render(<Checkbox error="Error" />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('shows error with boolean true', () => {
      render(<Checkbox label="Required" error={true} />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('associates label with input', () => {
      render(<Checkbox label="Terms" />)
      const checkbox = screen.getByLabelText('Terms')
      expect(checkbox).toBeInTheDocument()
    })

    it('has aria-describedby for helper text', () => {
      render(<Checkbox helperText="Helper" />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-describedby')
    })

    it('has aria-invalid when error', () => {
      render(<Checkbox error="Error" />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('can be focused', () => {
      render(<Checkbox />)
      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()
      expect(checkbox).toHaveFocus()
    })

    it('can be toggled with keyboard', async () => {
      const user = userEvent.setup()
      render(<Checkbox label="Keyboard" />)

      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()

      await user.keyboard(' ')

      expect(checkbox).toBeChecked()
    })
  })

  describe('Indeterminate State', () => {
    it('shows minus icon when indeterminate', () => {
      render(<Checkbox indeterminate label="Select all" />)
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.indeterminate).toBe(true)
    })

    it('updates indeterminate state when prop changes', () => {
      const { rerender } = render(<Checkbox />)
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement

      expect(checkbox.indeterminate).toBe(false)

      rerender(<Checkbox indeterminate />)
      expect(checkbox.indeterminate).toBe(true)

      rerender(<Checkbox indeterminate={false} />)
      expect(checkbox.indeterminate).toBe(false)
    })
  })
})
