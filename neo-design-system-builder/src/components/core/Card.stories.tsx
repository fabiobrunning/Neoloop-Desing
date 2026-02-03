import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Button } from './Button'

const meta = {
  title: 'Core/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blank', 'elevated', 'outline', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Blank: Story = {
  args: {
    variant: 'blank',
    padding: 'md',
    children: 'This is a blank card',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    shadow: 'md',
    padding: 'lg',
    children: 'This card has elevation',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    padding: 'lg',
    children: 'This card has an outline',
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    padding: 'lg',
    children: 'This card has a filled background',
  },
}

export const WithHeader: Story = {
  render: () => (
    <Card variant="outline" padding="none">
      <CardHeader className="px-6 pt-6">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-gray-500">Card subtitle</p>
      </CardHeader>
      <CardBody className="px-6">
        <p>This is the card body content. It contains the main information.</p>
      </CardBody>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card variant="outline" padding="none">
      <CardBody className="px-6 pt-6">
        <h3 className="text-lg font-semibold mb-2">Confirm Action</h3>
        <p>Are you sure you want to proceed with this action?</p>
      </CardBody>
      <CardFooter className="px-6 pb-6 flex gap-2">
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Complete: Story = {
  render: () => (
    <Card variant="outline" padding="none">
      <CardHeader className="px-6 pt-6">
        <h3 className="text-lg font-semibold">Complete Card</h3>
        <p className="text-sm text-gray-500">With header, body, and footer</p>
      </CardHeader>
      <CardBody className="px-6">
        <p className="mb-3">
          This card demonstrates all three sections working together.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
          <li>Header with title and subtitle</li>
          <li>Body with content</li>
          <li>Footer with actions</li>
        </ul>
      </CardBody>
      <CardFooter className="px-6 pb-6 flex justify-between">
        <Button variant="ghost" size="sm">
          Learn More
        </Button>
        <Button variant="primary" size="sm">
          Get Started
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Clickable: Story = {
  args: {
    variant: 'outline',
    padding: 'lg',
    onClick: () => alert('Card clicked!'),
    children: 'Click me! I am an interactive card.',
  },
}

export const NoPadding: Story = {
  render: () => (
    <Card variant="outline" padding="none">
      <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600" />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Image Card</h3>
        <p className="text-gray-600">
          This card has no padding to allow full-bleed images.
        </p>
      </div>
    </Card>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '400px' }}>
      <Card variant="blank" padding="lg">
        <strong>Blank:</strong> Minimal styling
      </Card>
      <Card variant="elevated" shadow="md" padding="lg">
        <strong>Elevated:</strong> With shadow
      </Card>
      <Card variant="outline" padding="lg">
        <strong>Outline:</strong> With border
      </Card>
      <Card variant="filled" padding="lg">
        <strong>Filled:</strong> With background
      </Card>
    </div>
  ),
}

export const AllShadows: Story = {
  render: () => (
    <div className="space-y-8" style={{ width: '400px' }}>
      <Card shadow="none" padding="lg" variant="outline">
        No Shadow
      </Card>
      <Card shadow="sm" padding="lg">
        Small Shadow
      </Card>
      <Card shadow="md" padding="lg">
        Medium Shadow
      </Card>
      <Card shadow="lg" padding="lg">
        Large Shadow
      </Card>
      <Card shadow="xl" padding="lg">
        Extra Large Shadow
      </Card>
    </div>
  ),
}

export const AllPadding: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '400px' }}>
      <Card variant="outline" padding="none">
        <div className="bg-gray-100 text-center">No Padding</div>
      </Card>
      <Card variant="outline" padding="sm">
        Small Padding
      </Card>
      <Card variant="outline" padding="md">
        Medium Padding
      </Card>
      <Card variant="outline" padding="lg">
        Large Padding
      </Card>
      <Card variant="outline" padding="xl">
        Extra Large Padding
      </Card>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
    shadow: 'md',
    radius: 'lg',
    children: 'Customize this card in the controls below',
  },
}
