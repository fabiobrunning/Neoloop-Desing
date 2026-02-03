import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Core/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile link component with variants, sizes, states, and accessibility features.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline', 'muted', 'inline'],
      description: 'Visual variant of the link'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the link'
    },
    external: {
      control: 'boolean',
      description: 'Show external icon and open in new tab'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the link'
    },
    href: {
      control: 'text',
      description: 'URL to link to'
    }
  }
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '/example'
  }
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Link href="/example" variant="default">Default Link</Link>
      <Link href="/example" variant="underline">Underlined Link</Link>
      <Link href="/example" variant="muted">Muted Link</Link>
      <Link href="/example" variant="inline">Inline Link</Link>
    </div>
  )
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Link href="/example" size="sm">Small Link</Link>
      <Link href="/example" size="md">Medium Link (Default)</Link>
      <Link href="/example" size="lg">Large Link</Link>
    </div>
  )
};

// External Links
export const ExternalLinks: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Link href="https://google.com" external>Google (External)</Link>
      <Link href="https://github.com" external variant="underline">GitHub (External)</Link>
      <Link href="https://example.com" external size="lg">Large External Link</Link>
    </div>
  )
};

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Link href="/example" disabled>Disabled Default</Link>
      <Link href="/example" disabled variant="underline">Disabled Underline</Link>
      <Link href="https://example.com" disabled external>Disabled External</Link>
    </div>
  )
};

// In Context
export const InParagraph: Story = {
  render: () => (
    <div className="max-w-2xl">
      <p className="text-gray-700 leading-relaxed">
        This is a paragraph with a{' '}
        <Link href="/example" variant="inline">inline link</Link>
        {' '}that flows naturally with the text. You can also have{' '}
        <Link href="https://example.com" variant="inline" external>
          external links
        </Link>
        {' '}in your content.
      </p>
    </div>
  )
};

// Navigation Menu
export const NavigationMenu: Story = {
  render: () => (
    <nav className="bg-gray-100 p-6 rounded-lg">
      <ul className="flex flex-col gap-3">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
};

// Footer Links
export const FooterLinks: Story = {
  render: () => (
    <footer className="bg-gray-900 text-white p-8 rounded-lg">
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold mb-3">Company</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="/about" variant="muted">About Us</Link></li>
            <li><Link href="/team" variant="muted">Team</Link></li>
            <li><Link href="/careers" variant="muted">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Product</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="/features" variant="muted">Features</Link></li>
            <li><Link href="/pricing" variant="muted">Pricing</Link></li>
            <li><Link href="/demo" variant="muted">Demo</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Social</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="https://twitter.com" variant="muted" external>Twitter</Link></li>
            <li><Link href="https://linkedin.com" variant="muted" external>LinkedIn</Link></li>
            <li><Link href="https://github.com" variant="muted" external>GitHub</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
};

// Special Link Types
export const SpecialLinks: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Link href="mailto:hello@example.com">Email Link</Link>
      <Link href="tel:+1234567890">Phone Link</Link>
      <Link href="#section">Hash/Anchor Link</Link>
      <Link href="/download.pdf" download>Download Link</Link>
    </div>
  )
};

// Visited State (requires actual navigation)
export const VisitedState: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-sm text-gray-600 mb-2">Click links to see visited state</p>
      <Link href="#visited-1">Link 1 (Click me)</Link>
      <Link href="#visited-2">Link 2 (Click me)</Link>
      <Link href="#visited-3" variant="underline">Link 3 (Click me)</Link>
    </div>
  )
};

// Dark Mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-start">
        <Link href="/example">Default Link (Dark)</Link>
        <Link href="/example" variant="underline">Underline Link (Dark)</Link>
        <Link href="https://example.com" external>External Link (Dark)</Link>
        <Link href="/example" disabled>Disabled Link (Dark)</Link>
      </div>
    </div>
  )
};

// Interactive States
export const InteractiveStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div>
        <p className="text-sm font-medium mb-2">Hover State</p>
        <Link href="/example">Hover over this link</Link>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Focus State</p>
        <Link href="/example">Tab to focus this link</Link>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Active State</p>
        <Link href="/example">Click and hold this link</Link>
      </div>
    </div>
  )
};
