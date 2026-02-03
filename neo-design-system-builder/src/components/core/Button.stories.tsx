import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Plus, Download, Trash2, Check, AlertCircle } from 'lucide-react'

const meta = {
  title: 'Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'success', 'warning', 'info', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    children: 'Extra Small',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Large',
  },
}

export const WithIconLeft: Story = {
  args: {
    children: 'Add Item',
    icon: <Plus size={16} />,
    iconPosition: 'left',
  },
}

export const WithIconRight: Story = {
  args: {
    children: 'Download',
    icon: <Download size={16} />,
    iconPosition: 'right',
  },
}

export const IconOnly: Story = {
  args: {
    icon: <Trash2 size={16} />,
    'aria-label': 'Delete',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="space-x-2">
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 flex flex-col items-start">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <div className="space-x-2">
        <Button icon={<Check size={16} />}>With Icon</Button>
        <Button icon={<AlertCircle size={16} />} iconPosition="right">
          Icon Right
        </Button>
        <Button icon={<Plus size={16} />} aria-label="Add" />
      </div>
    </div>
  ),
}
