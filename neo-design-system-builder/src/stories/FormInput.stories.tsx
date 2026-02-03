import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Form Input Component for Stories
interface InputProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

const Input = ({
  label,
  placeholder,
  type = 'text',
  variant = 'default',
  size = 'md',
  error,
  disabled = false,
  required = false,
  helperText,
}: InputProps) => {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1rem', fontSize: '1rem' },
    lg: { padding: '1rem 1.25rem', fontSize: '1.125rem' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: '#1f2937',
      border: `1px solid ${error ? '#ef4444' : focused ? '#0ea5e9' : '#374151'}`,
    },
    filled: {
      backgroundColor: '#374151',
      border: `2px solid ${error ? '#ef4444' : focused ? '#0ea5e9' : 'transparent'}`,
      borderBottom: `2px solid ${error ? '#ef4444' : focused ? '#0ea5e9' : '#0ea5e9'}`,
      borderRadius: '8px 8px 0 0',
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `2px solid ${error ? '#ef4444' : focused ? '#0ea5e9' : '#374151'}`,
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px' }}>
      <label
        style={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: error ? '#ef4444' : '#e5e7eb',
        }}
      >
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        style={{
          ...sizeStyles[size],
          ...variantStyles[variant],
          borderRadius: variant === 'filled' ? '8px 8px 0 0' : '8px',
          color: '#fff',
          outline: 'none',
          transition: 'all 0.2s ease',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      />
      {(error || helperText) && (
        <span
          style={{
            fontSize: '0.75rem',
            color: error ? '#ef4444' : '#6b7280',
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};

const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component with multiple variants and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    variant: 'default',
    size: 'md',
  },
};

export const Filled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    variant: 'filled',
    size: 'md',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    variant: 'outlined',
    size: 'md',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    variant: 'default',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
    variant: 'default',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    variant: 'default',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    variant: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input label="Small" placeholder="Small input" size="sm" />
      <Input label="Medium" placeholder="Medium input" size="md" />
      <Input label="Large" placeholder="Large input" size="lg" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input label="Default" placeholder="Default variant" variant="default" />
      <Input label="Filled" placeholder="Filled variant" variant="filled" />
      <Input label="Outlined" placeholder="Outlined variant" variant="outlined" />
    </div>
  ),
};
