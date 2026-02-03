import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders with image source', () => {
      render(<Avatar src="/avatar.jpg" alt="User Avatar" />)
      const img = screen.getByAltText('User Avatar')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '/avatar.jpg')
    })

    it('renders with initials when no image provided', () => {
      render(<Avatar initials="JD" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('renders with fallback when provided', () => {
      render(<Avatar fallback={<span>FB</span>} />)
      expect(screen.getByText('FB')).toBeInTheDocument()
    })

    it('renders default icon when no image, initials or fallback', () => {
      const { container } = render(<Avatar />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('renders all sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
      sizes.forEach(sz => {
        const { rerender, container } = render(<Avatar initials="A" size={sz} />)
        const avatar = container.querySelector('div')
        expect(avatar).toHaveClass('inline-flex')
        rerender(<></>)
      })
    })

    it('renders all shapes', () => {
      const shapes = ['circle', 'square'] as const
      shapes.forEach(s => {
        const { rerender, container } = render(<Avatar initials="A" shape={s} />)
        const avatar = container.querySelector('div')
        expect(avatar).toHaveClass(s === 'circle' ? 'rounded-full' : 'rounded-lg')
        rerender(<></>)
      })
    })

    it('renders status indicator when status is provided', () => {
      const { container } = render(<Avatar initials="A" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toBeInTheDocument()
      expect(status).toHaveAttribute('aria-label', 'online')
    })

    it('does not render status indicator when status is null', () => {
      const { container } = render(<Avatar initials="A" status={null} />)
      const status = container.querySelector('[role="status"]')
      expect(status).not.toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const { container } = render(<Avatar initials="A" className="custom-class" />)
      const avatar = container.querySelector('div')
      expect(avatar).toHaveClass('custom-class')
    })

    it('renders image with correct classes', () => {
      const { container } = render(<Avatar src="/avatar.jpg" alt="User" />)
      const img = container.querySelector('img')
      expect(img).toHaveClass('w-full', 'h-full', 'object-cover')
    })
  })


    it('shows online status with correct styling', () => {
      const { container } = render(<Avatar initials="A" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('bg-green-500')
    })

    it('shows offline status with correct styling', () => {
      const { container } = render(<Avatar initials="A" status="offline" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('bg-gray-400')
    })

    it('shows away status with correct styling', () => {
      const { container } = render(<Avatar initials="A" status="away" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('bg-yellow-500')
    })

    it('shows busy status with correct styling', () => {
      const { container } = render(<Avatar initials="A" status="busy" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('bg-red-500')
    })

    it('applies correct styling for circular shape status', () => {
      const { container } = render(<Avatar initials="A" shape="circle" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('rounded-full')
    })

    it('applies correct styling for square shape status', () => {
      const { container } = render(<Avatar initials="A" shape="square" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('rounded-sm')
    })
  })

  describe('Fallback Priority', () => {
    it('prioritizes image over initials', () => {
      render(<Avatar src="/avatar.jpg" initials="JD" alt="User" />)
      expect(screen.getByAltText('User')).toBeInTheDocument()
      expect(screen.queryByText('JD')).not.toBeInTheDocument()
    })

    it('prioritizes initials over fallback when image not provided', () => {
      render(<Avatar initials="JD" fallback={<span>Fallback</span>} />)
      expect(screen.getByText('JD')).toBeInTheDocument()
      expect(screen.queryByText('Fallback')).not.toBeInTheDocument()
    })

    it('shows fallback when no image and no initials', () => {
      render(<Avatar fallback={<span>Fallback</span>} />)
      expect(screen.getByText('Fallback')).toBeInTheDocument()
    })

    it('shows default icon when no image, initials or fallback', () => {
      const { container } = render(<Avatar />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has alt text for image', () => {
      render(<Avatar src="/avatar.jpg" alt="John Doe Avatar" />)
      const img = screen.getByAltText('John Doe Avatar')
      expect(img).toHaveAttribute('alt', 'John Doe Avatar')
    })

    it('has status indicator with aria-label', () => {
      const { container } = render(<Avatar initials="A" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveAttribute('aria-label')
    })

    it('has proper role for status indicator', () => {
      const { container } = render(<Avatar initials="A" status="away" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveAttribute('role', 'status')
    })

    it('has proper inline-flex for layout', () => {
      const { container } = render(<Avatar initials="A" />)
      const avatar = container.querySelector('div')
      expect(avatar).toHaveClass('inline-flex')
    })

    it('supports forwardRef', () => {
      const ref = { current: null }
      render(<Avatar initials="A" ref={ref as any} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('initials have select-none class for better UX', () => {
      const { container } = render(<Avatar initials="JD" />)
      const span = container.querySelector('span')
      expect(span).toHaveClass('select-none')
    })
  })

  describe('Edge Cases', () => {
    it('renders with two-character initials', () => {
      render(<Avatar initials="JD" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('renders with single character initials', () => {
      render(<Avatar initials="J" />)
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('renders with empty alt text', () => {
      render(<Avatar src="/avatar.jpg" alt="" />)
      const img = screen.getByAltText('')
      expect(img).toBeInTheDocument()
    })

    it('renders with numeric initials', () => {
      render(<Avatar initials="42" />)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('renders with complex fallback element', () => {
      render(
        <Avatar
          fallback={
            <div className="flex items-center justify-center">
              <span>Custom</span>
            </div>
          }
        />
      )
      expect(screen.getByText('Custom')).toBeInTheDocument()
    })

    it('maintains status indicator position with different sizes', () => {
      const sizes = ['sm', 'lg', '2xl'] as const
      sizes.forEach(s => {
        const { container } = render(<Avatar initials="A" size={s} status="online" />)
        const status = container.querySelector('[role="status"]')
        expect(status).toBeInTheDocument()
      })
    })

    it('renders with border on status indicator', () => {
      const { container } = render(<Avatar initials="A" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('border-2', 'border-white')
    })
  })
})
