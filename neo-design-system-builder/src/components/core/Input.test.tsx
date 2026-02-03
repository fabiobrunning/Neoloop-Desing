import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'
import { Mail } from 'lucide-react'

describe('Input', () => {
  describe('Rendering', () => {
    it('renders basic input', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Input label="Email" />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Input helperText="This is helper text" />)
      expect(screen.getByText('This is helper text')).toBeInTheDocument()
    })

    it('renders with icon', () => {
      render(<Input icon={<Mail data-testid="mail-icon" />} />)
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
    })

    it('renders with prefix', () => {
      render(<Input prefix="$" />)
      expect(screen.getByText('$')).toBeInTheDocument()
    })

    it('renders with suffix', () => {
      render(<Input suffix="kg" />)
      expect(screen.getByText('kg')).toBeInTheDocument()
    })

    it('renders character count when showCount is true', () => {
      render(<Input maxLength={100} showCount value="Hello" />)
      expect(screen.getByText('5/100')).toBeInTheDocument()
    })
  })

  describe('Input Types', () => {
    it('renders text input', () => {
      render(<Input type="text" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('renders email input', () => {
      render(<Input type="email" data-testid="email-input" />)
      expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email')
    })

    it('renders password input', () => {
      render(<Input type="password" data-testid="password-input" />)
      expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password')
    })

    it('renders number input', () => {
      render(<Input type="number" data-testid="number-input" />)
      expect(screen.getByTestId('number-input')).toHaveAttribute('type', 'number')
    })
  })

  describe('States', () => {
    it('renders default state', () => {
      render(<Input state="default" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-gray-300')
    })

    it('renders error state', () => {
      render(<Input state="error" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-red-500')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('renders success state', () => {
      render(<Input state="success" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveClass('border-green-500')
    })

    it('renders warning state', () => {
      render(<Input state="warning" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveClass('border-yellow-500')
    })

    it('is disabled when disabled prop is true', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('Password Input', () => {
    it('shows password toggle button', () => {
      render(<Input type="password" />)
      expect(screen.getByLabelText('Show password')).toBeInTheDocument()
    })

    it('toggles password visibility', async () => {
      const user = userEvent.setup()
      render(<Input type="password" data-testid="password-input" />)

      const input = screen.getByTestId('password-input')
      const toggle = screen.getByLabelText('Show password')

      expect(input).toHaveAttribute('type', 'password')

      await user.click(toggle)
      expect(input).toHaveAttribute('type', 'text')
      expect(screen.getByLabelText('Hide password')).toBeInTheDocument()

      await user.click(toggle)
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('Interactions', () => {
    it('calls onChange when value changes', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox')

      await user.type(input, 'Hello')

      expect(handleChange).toHaveBeenCalled()
    })

    it('updates value when typing', async () => {
      const user = userEvent.setup()
      render(<Input />)
      const input = screen.getByRole('textbox')

      await user.type(input, 'Test value')

      expect(input).toHaveValue('Test value')
    })

    it('respects maxLength', async () => {
      const user = userEvent.setup()
      render(<Input maxLength={5} />)
      const input = screen.getByRole('textbox')

      await user.type(input, '1234567890')

      expect(input).toHaveValue('12345')
    })
  })

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('associates label with input', () => {
      render(<Input label="Username" />)
      const input = screen.getByLabelText('Username')
      expect(input).toBeInTheDocument()
    })

    it('associates helper text with input', () => {
      render(<Input helperText="Helper" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby')
    })

    it('marks invalid input with aria-invalid', () => {
      render(<Input state="error" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('can be focused', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
    })
  })

  describe('Character Count', () => {
    it('shows character count', () => {
      render(<Input showCount maxLength={10} value="Hello" />)
      expect(screen.getByText('5/10')).toBeInTheDocument()
    })

    it('updates character count on input', async () => {
      const user = userEvent.setup()
      render(<Input showCount maxLength={10} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'Test')

      expect(screen.getByText('4/10')).toBeInTheDocument()
    })
  })
})
