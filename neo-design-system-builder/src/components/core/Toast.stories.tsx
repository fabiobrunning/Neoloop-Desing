import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast, toast } from './Toast'
import { Button } from './Button'

function ToastDemo() {
  const { showToast } = useToast()

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-4">Click buttons to show toasts</h3>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="success"
          onClick={() => showToast(toast.success('Changes saved successfully!'))}
        >
          Show Success Toast
        </Button>

        <Button
          variant="danger"
          onClick={() => showToast(toast.error('Failed to save changes. Please try again.'))}
        >
          Show Error Toast
        </Button>

        <Button
          variant="warning"
          onClick={() => showToast(toast.warning('Your session will expire in 5 minutes.'))}
        >
          Show Warning Toast
        </Button>

        <Button
          variant="info"
          onClick={() => showToast(toast.info('New update available.'))}
        >
          Show Info Toast
        </Button>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-3">With Title</h4>
        <Button
          onClick={() => showToast({
            variant: 'success',
            title: 'Upload Complete',
            message: 'Your file has been uploaded successfully.',
          })}
        >
          Show Toast with Title
        </Button>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-3">With Action</h4>
        <Button
          onClick={() => showToast({
            variant: 'info',
            message: 'You have 3 new notifications.',
            action: {
              label: 'View',
              onClick: () => alert('Viewing notifications...'),
            },
          })}
        >
          Show Toast with Action
        </Button>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-3">Custom Duration</h4>
        <Button
          onClick={() => showToast({
            variant: 'warning',
            message: 'This toast will stay for 10 seconds.',
            duration: 10000,
          })}
        >
          Show Long Toast (10s)
        </Button>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-3">Multiple Toasts</h4>
        <Button
          onClick={() => {
            showToast(toast.success('First toast'))
            setTimeout(() => showToast(toast.info('Second toast')), 500)
            setTimeout(() => showToast(toast.warning('Third toast')), 1000)
          }}
        >
          Show Multiple Toasts
        </Button>
      </div>
    </div>
  )
}

const meta: Meta<typeof ToastProvider> = {
  title: 'Phase 3/Feedback/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ToastProvider>

export const Default: Story = {
  render: () => <ToastDemo />,
}

export const TopRight: Story = {
  render: () => <ToastDemo />,
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
}

export const TopCenter: Story = {
  render: () => <ToastDemo />,
  decorators: [
    (Story) => (
      <ToastProvider position="top-center">
        <Story />
      </ToastProvider>
    ),
  ],
}

export const BottomRight: Story = {
  render: () => <ToastDemo />,
  decorators: [
    (Story) => (
      <ToastProvider position="bottom-right">
        <Story />
      </ToastProvider>
    ),
  ],
}
