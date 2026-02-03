import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'
import { Button } from './Button'

const meta: Meta<typeof Alert> = {
  title: 'Phase 3/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your changes have been saved successfully.',
    dismissible: true,
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'Failed to save changes. Please try again.',
    dismissible: true,
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Your session will expire in 5 minutes. Please save your work.',
    dismissible: true,
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'A new software update is available. Click to learn more.',
    dismissible: true,
  },
}

export const WithAction: Story = {
  args: {
    variant: 'error',
    title: 'Connection Lost',
    message: 'Unable to connect to server. Check your internet connection.',
    action: {
      label: 'Retry',
      onClick: () => alert('Retrying...'),
    },
    dismissible: true,
  },
}

export const WithoutTitle: Story = {
  args: {
    variant: 'success',
    message: 'Your changes have been saved successfully.',
    dismissible: true,
  },
}

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur on Sunday at 2:00 AM UTC.',
    showIcon: false,
    dismissible: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="success"
        title="Success"
        message="Your changes have been saved successfully."
        dismissible
      />
      <Alert
        variant="error"
        title="Error"
        message="Failed to save changes. Please try again."
        dismissible
      />
      <Alert
        variant="warning"
        title="Warning"
        message="Your session will expire in 5 minutes."
        dismissible
      />
      <Alert
        variant="info"
        title="Information"
        message="A new software update is available."
        dismissible
      />
    </div>
  ),
}

export const WithComplexContent: Story = {
  args: {
    variant: 'warning',
    title: 'Storage Almost Full',
    message: (
      <div>
        <p className="mb-2">You are using 95% of your storage quota.</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Delete unused files to free up space</li>
          <li>Upgrade to a larger plan</li>
          <li>Archive old projects</li>
        </ul>
      </div>
    ),
    action: {
      label: 'Upgrade Plan',
      onClick: () => alert('Opening upgrade dialog...'),
    },
    dismissible: true,
  },
}
