import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState, NoResultsEmptyState, NoDataEmptyState, ErrorEmptyState } from './EmptyState'
import { Button } from './Button'
import { Upload } from 'lucide-react'

const meta: Meta<typeof EmptyState> = {
  title: 'Phase 3/Data/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    icon: 'default',
    title: 'No data available',
    description: 'There is no data to display at the moment.',
  },
}

export const Search: Story = {
  args: {
    icon: 'search',
    title: 'No results found',
    description: 'We couldn\'t find any results matching your search criteria.',
  },
}

export const Inbox: Story = {
  args: {
    icon: 'inbox',
    title: 'No messages',
    description: 'You don\'t have any messages yet. Start a conversation!',
  },
}

export const Error: Story = {
  args: {
    icon: 'error',
    title: 'Something went wrong',
    description: 'We encountered an error while loading this content. Please try again.',
  },
}

export const WithAction: Story = {
  args: {
    icon: 'inbox',
    title: 'No items',
    description: 'Get started by creating your first item.',
    action: <Button>Create Item</Button>,
  },
}

export const WithActions: Story = {
  args: {
    icon: 'search',
    title: 'No results found',
    description: 'Try adjusting your filters or search terms.',
    action: <Button>Clear Filters</Button>,
    secondaryAction: <Button variant="ghost">Reset Search</Button>,
  },
}

export const CustomIcon: Story = {
  args: {
    icon: <Upload className="h-16 w-16 text-blue-400" />,
    title: 'No files uploaded',
    description: 'Upload your first file to get started.',
    action: <Button>Upload File</Button>,
  },
}

export const SmallIcon: Story = {
  args: {
    icon: 'inbox',
    iconSize: 'sm',
    title: 'No notifications',
    description: 'You\'re all caught up!',
  },
}

export const LargeIcon: Story = {
  args: {
    icon: 'package',
    iconSize: 'lg',
    title: 'No products',
    description: 'Add products to your store to start selling.',
    action: <Button size="lg">Add Product</Button>,
  },
}

export const PrebuiltNoResults: Story = {
  render: () => (
    <NoResultsEmptyState
      action={<Button>Clear Filters</Button>}
    />
  ),
}

export const PrebuiltNoData: Story = {
  render: () => (
    <NoDataEmptyState
      action={<Button>Add Data</Button>}
    />
  ),
}

export const PrebuiltError: Story = {
  render: () => (
    <ErrorEmptyState
      action={<Button>Retry</Button>}
    />
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <EmptyState
          icon="search"
          title="No results"
          description="Try a different search"
          iconSize="sm"
        />
      </div>
      <div className="border rounded-lg p-4">
        <EmptyState
          icon="inbox"
          title="No messages"
          description="Start a conversation"
          iconSize="sm"
        />
      </div>
      <div className="border rounded-lg p-4">
        <EmptyState
          icon="error"
          title="Error"
          description="Something went wrong"
          iconSize="sm"
        />
      </div>
      <div className="border rounded-lg p-4">
        <EmptyState
          icon="package"
          title="No items"
          description="Add your first item"
          iconSize="sm"
        />
      </div>
    </div>
  ),
}
