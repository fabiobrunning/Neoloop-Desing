import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ConfirmDialog, useConfirmDialog } from './ConfirmDialog'
import { Button } from './Button'

function ConfirmDialogDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Confirm Dialog
      </Button>

      <ConfirmDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={async () => {
          await new Promise(resolve => setTimeout(resolve, 1000))
          alert('Confirmed!')
        }}
        title="Are you sure?"
        description="This action cannot be undone."
      />
    </div>
  )
}

function ConfirmDialogHookDemo() {
  const { confirm, ConfirmDialog } = useConfirmDialog()

  const handleDelete = async () => {
    await confirm({
      title: 'Delete Item',
      description: 'Are you sure you want to delete this item? This action cannot be undone.',
      variant: 'danger',
      confirmText: 'Delete',
      onConfirm: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Item deleted!')
      },
    })
  }

  return (
    <div>
      <Button variant="danger" onClick={handleDelete}>
        Delete Item
      </Button>
      {ConfirmDialog}
    </div>
  )
}

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Phase 3/Feedback/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

export const Default: Story = {
  render: () => <ConfirmDialogDemo />,
}

export const Danger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Account
        </Button>

        <ConfirmDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert('Account deleted!')
          }}
          title="Delete Account"
          description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
          variant="danger"
          confirmText="Delete Account"
        />
      </div>
    )
  },
}

export const Warning: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div>
        <Button variant="warning" onClick={() => setIsOpen(true)}>
          Reset Settings
        </Button>

        <ConfirmDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert('Settings reset!')
          }}
          title="Reset Settings"
          description="Are you sure you want to reset all settings to their default values?"
          variant="warning"
          confirmText="Reset"
        />
      </div>
    )
  },
}

export const WithHook: Story = {
  render: () => <ConfirmDialogHookDemo />,
}

export const AllVariants: Story = {
  render: () => {
    const [variant, setVariant] = useState<'default' | 'danger' | 'warning' | 'info'>('default')
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="space-y-4">
        <div className="flex gap-3">
          <Button onClick={() => { setVariant('default'); setIsOpen(true) }}>
            Default
          </Button>
          <Button variant="danger" onClick={() => { setVariant('danger'); setIsOpen(true) }}>
            Danger
          </Button>
          <Button variant="warning" onClick={() => { setVariant('warning'); setIsOpen(true) }}>
            Warning
          </Button>
          <Button variant="info" onClick={() => { setVariant('info'); setIsOpen(true) }}>
            Info
          </Button>
        </div>

        <ConfirmDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert(`Confirmed: ${variant}`)
          }}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Action`}
          description="Are you sure you want to proceed with this action?"
          variant={variant}
          confirmText="Confirm"
        />
      </div>
    )
  },
}
