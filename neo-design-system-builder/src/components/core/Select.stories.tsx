import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectOption } from './Select'

const basicOptions: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
]

const countries: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'br', label: 'Brazil' },
  { value: 'jp', label: 'Japan' },
]

const meta = {
  title: 'Core/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
    disabled: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    clearable: {
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
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option',
  },
}

export const WithLabel: Story = {
  args: {
    options: basicOptions,
    label: 'Choose an option',
    placeholder: 'Select...',
  },
}

export const WithHelperText: Story = {
  args: {
    options: basicOptions,
    label: 'Country',
    helperText: 'Select your country',
    placeholder: 'Choose a country',
  },
}

export const Selected: Story = {
  args: {
    options: basicOptions,
    value: '2',
    label: 'Selected Option',
  },
}

export const Searchable: Story = {
  args: {
    options: countries,
    searchable: true,
    label: 'Country',
    placeholder: 'Search and select...',
  },
}

export const Multiple: Story = {
  args: {
    options: basicOptions,
    multiple: true,
    label: 'Select multiple',
    placeholder: 'Choose options',
  },
}

export const SearchableMultiple: Story = {
  args: {
    options: countries,
    multiple: true,
    searchable: true,
    label: 'Countries',
    placeholder: 'Select countries',
  },
}

export const Clearable: Story = {
  args: {
    options: basicOptions,
    clearable: true,
    value: '2',
    label: 'Clearable Select',
  },
}

export const ErrorState: Story = {
  args: {
    options: basicOptions,
    state: 'error',
    label: 'Required Field',
    helperText: 'This field is required',
    placeholder: 'Select an option',
  },
}

export const SuccessState: Story = {
  args: {
    options: basicOptions,
    state: 'success',
    value: '1',
    label: 'Valid Selection',
    helperText: 'Great choice!',
  },
}

export const WarningState: Story = {
  args: {
    options: basicOptions,
    state: 'warning',
    label: 'Deprecated Options',
    helperText: 'These options will be removed soon',
    placeholder: 'Select...',
  },
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    value: '1',
    label: 'Disabled Select',
  },
}

export const Loading: Story = {
  args: {
    options: [],
    loading: true,
    label: 'Loading Options',
    placeholder: 'Loading...',
  },
}

export const DisabledOptions: Story = {
  args: {
    options: [
      { value: '1', label: 'Available Option 1' },
      { value: '2', label: 'Disabled Option', disabled: true },
      { value: '3', label: 'Available Option 2' },
      { value: '4', label: 'Another Disabled', disabled: true },
    ],
    label: 'Some Disabled Options',
    placeholder: 'Select...',
  },
}

export const LongList: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      value: `${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    searchable: true,
    label: 'Long List (50 items)',
    placeholder: 'Search to find...',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '400px' }}>
      <Select
        options={basicOptions}
        state="default"
        label="Default"
        placeholder="Select..."
      />
      <Select
        options={basicOptions}
        state="error"
        label="Error"
        helperText="This field is required"
        placeholder="Select..."
      />
      <Select
        options={basicOptions}
        state="success"
        value="1"
        label="Success"
        helperText="Valid selection"
      />
      <Select
        options={basicOptions}
        state="warning"
        label="Warning"
        helperText="Consider changing this"
        placeholder="Select..."
      />
    </div>
  ),
}

export const Playground: Story = {
  args: {
    options: countries,
    label: 'Select Country',
    placeholder: 'Choose a country',
    searchable: true,
    clearable: true,
  },
}
