import type { Meta, StoryObj } from '@storybook/react';

// Design Tokens Documentation Story
const DesignTokensShowcase = () => {
  const colors = {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  };

  const spacing = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  };

  const typography = {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  };

  return (
    <div style={{ padding: '2rem', color: '#fff', background: '#0a0a0a', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Design Tokens</h1>

      {/* Colors Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Colors</h2>

        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#9ca3af' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {Object.entries(colors.primary).map(([shade, color]) => (
            <div key={shade} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: color,
                  borderRadius: '8px',
                  marginBottom: '0.25rem',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{shade}</span>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#9ca3af' }}>Gray</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {Object.entries(colors.gray).map(([shade, color]) => (
            <div key={shade} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: color,
                  borderRadius: '8px',
                  marginBottom: '0.25rem',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{shade}</span>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#9ca3af' }}>Semantic</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {Object.entries(colors.semantic).map(([name, color]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '80px',
                  height: '60px',
                  backgroundColor: color,
                  borderRadius: '8px',
                  marginBottom: '0.25rem',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Spacing</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Object.entries(spacing).map(([name, value]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: '50px', fontSize: '0.875rem', color: '#9ca3af' }}>{name}</span>
              <div
                style={{
                  height: '24px',
                  width: value,
                  backgroundColor: '#0ea5e9',
                  borderRadius: '4px',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Typography</h2>

        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#9ca3af' }}>Font Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {Object.entries(typography.fontSizes).map(([name, size]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span style={{ width: '50px', fontSize: '0.875rem', color: '#9ca3af' }}>{name}</span>
              <span style={{ fontSize: size }}>The quick brown fox</span>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{size}</span>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#9ca3af' }}>Font Weights</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Object.entries(typography.fontWeights).map(([name, weight]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span style={{ width: '80px', fontSize: '0.875rem', color: '#9ca3af' }}>{name}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: weight }}>The quick brown fox</span>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{weight}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof DesignTokensShowcase> = {
  title: 'Design System/Design Tokens',
  component: DesignTokensShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Core design tokens for the Neo Design System including colors, spacing, and typography.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
