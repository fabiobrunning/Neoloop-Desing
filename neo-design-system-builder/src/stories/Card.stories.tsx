import type { Meta, StoryObj } from '@storybook/react';

// Card Component for Stories
interface CardProps {
  title: string;
  description?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const Card = ({ title, description, variant = 'default', size = 'md', children }: CardProps) => {
  const baseStyles: React.CSSProperties = {
    borderRadius: '12px',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '1rem', maxWidth: '280px' },
    md: { padding: '1.5rem', maxWidth: '360px' },
    lg: { padding: '2rem', maxWidth: '480px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
    },
    elevated: {
      backgroundColor: '#1f2937',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
    },
    outlined: {
      backgroundColor: 'transparent',
      border: '2px solid #0ea5e9',
    },
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  };

  return (
    <div style={{ ...baseStyles, ...sizeStyles[size], ...variantStyles[variant] }}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: size === 'lg' ? '1.5rem' : '1.25rem' }}>{title}</h3>
      {description && (
        <p style={{ margin: '0 0 1rem 0', color: '#9ca3af', fontSize: '0.875rem' }}>{description}</p>
      )}
      {children}
    </div>
  );
};

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component for displaying content in a contained format.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'glass'],
      description: 'Visual style variant of the card',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the card',
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a description of the card content.',
    variant: 'default',
    size: 'md',
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    description: 'This card has an elevated shadow effect.',
    variant: 'elevated',
    size: 'md',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    description: 'This card has an outlined border style.',
    variant: 'outlined',
    size: 'md',
  },
};

export const Glass: Story = {
  args: {
    title: 'Glass Card',
    description: 'This card has a glassmorphism effect.',
    variant: 'glass',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    title: 'Small Card',
    description: 'Compact size card.',
    variant: 'default',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Card',
    description: 'Large size card with more space for content.',
    variant: 'default',
    size: 'lg',
  },
};

export const WithContent: Story = {
  args: {
    title: 'Card with Content',
    description: 'This card contains additional elements.',
    variant: 'elevated',
    size: 'md',
  },
  render: (args) => (
    <Card {...args}>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0ea5e9',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Primary
        </button>
        <button
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: '1px solid #374151',
            borderRadius: '6px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Secondary
        </button>
      </div>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card title="Default" description="Default variant" variant="default" />
      <Card title="Elevated" description="Elevated variant" variant="elevated" />
      <Card title="Outlined" description="Outlined variant" variant="outlined" />
      <Card title="Glass" description="Glass variant" variant="glass" />
    </div>
  ),
};
