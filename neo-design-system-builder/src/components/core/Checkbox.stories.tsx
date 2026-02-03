import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { useState } from 'react'

const meta = {
  title: 'Core/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Checkbox label',
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked checkbox',
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked checkbox',
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Select all (indeterminate)',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled checkbox',
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Disabled and checked',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'Get weekly updates about new features',
  },
}

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue',
  },
}

export const NoLabel: Story = {
  args: {
    'aria-label': 'Checkbox without visible label',
  },
}

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Checkbox
        label="Toggle me"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    )
  },
}

export const SelectAll: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, label: 'Item 1', checked: false },
      { id: 2, label: 'Item 2', checked: false },
      { id: 3, label: 'Item 3', checked: false },
    ])

    const allChecked = items.every(item => item.checked)
    const someChecked = items.some(item => item.checked)
    const indeterminate = someChecked && !allChecked

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      setItems(items.map(item => ({ ...item, checked: e.target.checked })))
    }

    const handleItemChange = (id: number) => {
      setItems(items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ))
    }

    return (
      <div className="space-y-2">
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={handleSelectAll}
        />
        <div className="ml-6 space-y-2">
          {items.map(item => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={() => handleItemChange(item.id)}
            />
          ))}
        </div>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Unchecked" checked={false} />
      <Checkbox label="Checked" checked={true} />
      <Checkbox label="Indeterminate" indeterminate={true} />
      <Checkbox label="Disabled" disabled={true} />
      <Checkbox label="Disabled Checked" disabled={true} checked={true} />
      <Checkbox label="With Helper" helperText="This is helper text" />
      <Checkbox label="With Error" error="This field is required" />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => {
    const [form, setForm] = useState({
      newsletter: false,
      terms: false,
      updates: false,
    })

    const [errors, setErrors] = useState({
      terms: '',
    })

    const handleSubmit = () => {
      if (!form.terms) {
        setErrors({ terms: 'You must accept the terms and conditions' })
      } else {
        setErrors({ terms: '' })
        alert('Form submitted!')
      }
    }

    return (
      <div className="space-y-4">
        <Checkbox
          label="Subscribe to newsletter"
          checked={form.newsletter}
          onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
          helperText="Get weekly updates about new features"
        />
        <Checkbox
          label="Accept terms and conditions"
          checked={form.terms}
          onChange={(e) => {
            setForm({ ...form, terms: e.target.checked })
            setErrors({ terms: '' })
          }}
          error={errors.terms}
        />
        <Checkbox
          label="Receive product updates"
          checked={form.updates}
          onChange={(e) => setForm({ ...form, updates: e.target.checked })}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    )
  },
}

export const Playground: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    helperText: 'Please read our terms carefully',
  },
}
