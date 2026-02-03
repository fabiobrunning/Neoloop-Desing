import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { Mail, Search, User, Lock } from 'lucide-react'

const meta = {
  title: 'Core/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    showCount: {
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
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: "We'll never share your username with anyone else.",
  },
}

export const WithIcon: Story = {
  args: {
    icon: <Mail size={18} />,
    type: 'email',
    placeholder: 'Email address',
  },
}

export const WithPrefix: Story = {
  args: {
    prefix: '$',
    type: 'number',
    placeholder: '0.00',
  },
}

export const WithSuffix: Story = {
  args: {
    suffix: 'kg',
    type: 'number',
    placeholder: 'Weight',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    maxLength: 100,
    showCount: true,
    placeholder: 'Tell us about yourself',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    state: 'error',
    helperText: 'Please enter a valid email address',
  },
}

export const SuccessState: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'valid@email.com',
    state: 'success',
    helperText: 'Email is available!',
  },
}

export const WarningState: Story = {
  args: {
    label: 'Password',
    type: 'password',
    state: 'warning',
    helperText: 'Password should be at least 8 characters',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'Cannot edit this',
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '400px' }}>
      <Input type="text" label="Text" placeholder="Enter text" />
      <Input type="email" label="Email" placeholder="you@example.com" />
      <Input type="password" label="Password" placeholder="Enter password" />
      <Input type="number" label="Number" placeholder="123" />
      <Input type="tel" label="Phone" placeholder="(555) 123-4567" />
      <Input type="url" label="Website" placeholder="https://example.com" />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '400px' }}>
      <Input state="default" label="Default" placeholder="Default state" />
      <Input
        state="error"
        label="Error"
        value="invalid@"
        helperText="Invalid email address"
      />
      <Input
        state="success"
        label="Success"
        value="valid@email.com"
        helperText="Email is available!"
      />
      <Input
        state="warning"
        label="Warning"
        value="weak"
        helperText="Password is too weak"
      />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '400px' }}>
      <Input icon={<Search size={18} />} placeholder="Search..." />
      <Input icon={<User size={18} />} label="Username" placeholder="johndoe" />
      <Input icon={<Mail size={18} />} label="Email" type="email" placeholder="you@example.com" />
      <Input icon={<Lock size={18} />} label="Password" type="password" placeholder="Enter password" />
    </div>
  ),
}

export const Playground: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    helperText: 'We will send you a confirmation email',
  },
}
