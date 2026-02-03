import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select, SelectOption } from './Select'

const mockOptions: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Disabled Option', disabled: true },
]

describe('Select', () => {
  describe('Rendering', () => {
    it('renders with placeholder', () => {
      render(<Select options={mockOptions} placeholder="Select an option" />)
      expect(screen.getByText('Select an option')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Select options={mockOptions} label="Choose option" />)
      expect(screen.getByText('Choose option')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Select options={mockOptions} helperText="Pick one" />)
      expect(screen.getByText('Pick one')).toBeInTheDocument()
    })

    it('displays selected value', () => {
      render(<Select options={mockOptions} value="1" />)
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
  })

  describe('Dropdown Behavior', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} />)

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      expect(screen.getByRole('listbox')).toBeInTheDocument()
      mockOptions.forEach(opt => {
        if (!opt.disabled) {
          expect(screen.getByText(opt.label)).toBeInTheDocument()
        }
      })
    })

    it('closes dropdown on outside click', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <Select options={mockOptions} />
          <button>Outside</button>
        </div>
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)
      expect(screen.getByRole('listbox')).toBeInTheDocument()

      await user.click(screen.getByText('Outside'))
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('Selection', () => {
    it('calls onChange with selected value', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Select options={mockOptions} onChange={handleChange} />)

      await user.click(screen.getByRole('combobox'))
      await user.click(screen.getByText('Option 2'))

      expect(handleChange).toHaveBeenCalledWith('2')
    })

    it('closes dropdown after single selection', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} />)

      await user.click(screen.getByRole('combobox'))
      await user.click(screen.getByText('Option 1'))

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('does not select disabled option', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Select options={mockOptions} onChange={handleChange} />)

      await user.click(screen.getByRole('combobox'))
      await user.click(screen.getByText('Disabled Option'))

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Multiple Selection', () => {
    it('allows multiple selections', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Select options={mockOptions} multiple onChange={handleChange} />)

      await user.click(screen.getByRole('combobox'))
      await user.click(screen.getByText('Option 1'))
      await user.click(screen.getByText('Option 2'))

      expect(handleChange).toHaveBeenCalledWith(['1'])
      expect(handleChange).toHaveBeenCalledWith(['1', '2'])
    })

    it('shows checkboxes in multiple mode', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} multiple />)

      await user.click(screen.getByRole('combobox'))

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })

    it('keeps dropdown open in multiple mode', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} multiple />)

      await user.click(screen.getByRole('combobox'))
      await user.click(screen.getByText('Option 1'))

      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
  })

  describe('Search', () => {
    it('shows search input when searchable', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} searchable />)

      await user.click(screen.getByRole('combobox'))

      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })

    it('filters options based on search query', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} searchable />)

      await user.click(screen.getByRole('combobox'))
      await user.type(screen.getByPlaceholderText('Search...'), 'Option 2')

      expect(screen.getByText('Option 2')).toBeInTheDocument()
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    })

    it('shows no options message when no results', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} searchable />)

      await user.click(screen.getByRole('combobox'))
      await user.type(screen.getByPlaceholderText('Search...'), 'nonexistent')

      expect(screen.getByText('No options found')).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Select options={mockOptions} disabled />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-disabled', 'true')
    })

    it('does not open when disabled', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} disabled />)

      await user.click(screen.getByRole('combobox'))

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('shows loading state', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} loading />)

      await user.click(screen.getByRole('combobox'))

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('Clear', () => {
    it('shows clear button when clearable and has value', () => {
      render(<Select options={mockOptions} value="1" clearable />)
      expect(screen.getByLabelText('Clear selection')).toBeInTheDocument()
    })

    it('clears value when clear button clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Select options={mockOptions} value="1" clearable onChange={handleChange} />)

      await user.click(screen.getByLabelText('Clear selection'))

      expect(handleChange).toHaveBeenCalledWith('')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Select options={mockOptions} />)
      const trigger = screen.getByRole('combobox')

      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} />)

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
