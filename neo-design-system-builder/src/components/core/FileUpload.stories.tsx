import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'Phase 3/Data/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  args: {
    onUpload: async (files) => {
      console.log('Uploading files:', files)
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  },
}

export const Multiple: Story = {
  args: {
    multiple: true,
    onUpload: async (files) => {
      console.log('Uploading files:', files)
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  },
}

export const ImagesOnly: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
    onUpload: async (files) => {
      console.log('Uploading images:', files)
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  },
}

export const WithSizeLimit: Story = {
  args: {
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
    onUpload: async (files) => {
      console.log('Uploading files:', files)
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  },
}

export const WithMaxFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    onUpload: async (files) => {
      console.log('Uploading files:', files)
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  },
}

export const PDFOnly: Story = {
  args: {
    accept: 'application/pdf',
    multiple: true,
    onUpload: async (files) => {
      console.log('Uploading PDFs:', files)
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  },
}

export const VideoOnly: Story = {
  args: {
    accept: 'video/*',
    maxSize: 50 * 1024 * 1024, // 50MB
    onUpload: async (files) => {
      console.log('Uploading videos:', files)
      await new Promise(resolve => setTimeout(resolve, 3000))
    },
  },
}

export const WithoutList: Story = {
  args: {
    multiple: true,
    showList: false,
    onUpload: async (files) => {
      console.log('Uploading files:', files)
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  },
}

export const CompleteExample: Story = {
  args: {
    accept: 'image/*,.pdf',
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    showList: true,
    onUpload: async (files) => {
      console.log('Uploading files:', files)
      // Simulate upload with progress
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  },
}
