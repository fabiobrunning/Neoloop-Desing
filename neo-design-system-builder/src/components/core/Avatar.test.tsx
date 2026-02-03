import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders with image source', () => {
      render(<Avatar src="/avatar.jpg" alt="User Avatar" />)
      const img = screen.getByAltText('User Avatar')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '/avatar.jpg')
    })

    it('renders with initials', () => {
      render(<Avatar initials="JD" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('renders with fallback', () => {
      render(<Avatar fallback={<span>FB</span>} />)
      expect(screen.getByText('FB')).toBeInTheDocument()
    })

    it('renders default icon', () => {
      const { container } = render(<Avatar />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('renders all sizes', () => {
      ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].forEach(sz => {
        const { rerender, container } = render(<Avatar initials="A" size={sz as any} />)
        const avatar = container.querySelector('div')
        expect(avatar).toHaveClass('inline-flex')
        rerender(<></>)
      })
    })

    it('renders all shapes', () => {
      ['circle', 'square'].forEach(s => {
        const { rerender, container } = render(<Avatar initials="A" shape={s as any} />)
        const avatar = container.querySelector('div')
        expect(avatar).toHaveClass(s === 'circle' ? 'rounded-full' : 'rounded-lg')
        rerender(<></>)
      })
    })

    it('renders status indicator', () => {
      const { container } = render(<Avatar initials="A" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toBeInTheDocument()
      expect(status).toHaveAttribute('aria-label', 'online')
    })

    it('does not render status when null', () => {
      const { container } = render(<Avatar initials="A" status={null} />)
      const status = container.querySelector('[role="status"]')
      expect(status).not.toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const { container } = render(<Avatar initials="A" className="custom-class" />)
      const avatar = container.querySelector('div')
      expect(avatar).toHaveClass('custom-class')
    })
  })

  describe('States', () => {
    it('shows online status styling', () => {
      const { container } = render(<Avatar initials="A" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('bg-green-500')
    })

    it('shows offline status styling', () => {
      const { container } = render(<Avatar initials="A" status="offline" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('bg-gray-400')
    })

    it('shows away status styling', () => {
      const { container } = render(<Avatar initials="A" status="away" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('bg-yellow-500')
    })

    it('shows busy status styling', () => {
      const { container } = render(<Avatar initials="A" status="busy" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveClass('bg-red-500')
    })
  })

  describe('Fallback Priority', () => {
    it('prioritizes image over initials', () => {
      render(<Avatar src="/avatar.jpg" initials="JD" alt="User" />)
      expect(screen.getByAltText('User')).toBeInTheDocument()
      expect(screen.queryByText('JD')).not.toBeInTheDocument()
    })

    it('prioritizes initials over fallback', () => {
      render(<Avatar initials="JD" fallback={<span>Fallback</span>} />)
      expect(screen.getByText('JD')).toBeInTheDocument()
      expect(screen.queryByText('Fallback')).not.toBeInTheDocument()
    })

    it('shows fallback when no image/initials', () => {
      render(<Avatar fallback={<span>Fallback</span>} />)
      expect(screen.getByText('Fallback')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has alt text for image', () => {
      render(<Avatar src="/avatar.jpg" alt="John Doe" />)
      const img = screen.getByAltText('John Doe')
      expect(img).toHaveAttribute('alt', 'John Doe')
    })

    it('has status with aria-label', () => {
      const { container } = render(<Avatar initials="A" status="online" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveAttribute('aria-label')
    })

    it('has proper role for status', () => {
      const { container } = render(<Avatar initials="A" status="away" />)
      const status = container.querySelector('[role="status"]')
      expect(status).toHaveAttribute('role', 'status')
    })

    it('has inline-flex layout', () => {
      const { container } = render(<Avatar initials="A" />)
      const avatar = container.querySelector('div')
      expect(avatar).toHaveClass('inline-flex')
    })

    it('supports forwardRef', () => {
      const ref = { current: null }
      render(<Avatar initials="A" ref={ref as any} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Edge Cases', () => {
    it('renders with two-char initials', () => {
      render(<Avatar initials="JD" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('renders with one-char initials', () => {
      render(<Avatar initials="J" />)
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('renders with numeric initials', () => {
      render(<Avatar initials="42" />)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('renders with complex fallback', () => {
      render(
        <Avatar
          fallback={
            <div>
              <span>Custom</span>
            </div>
          }
        />
      )
      expect(screen.getByText('Custom')).toBeInTheDocument()
    })

    it('maintains status with different sizes', () => {
      ['sm', 'lg', '2xl'].forEach(s => {
        const { container } = render(<Avatar initials="A" size={s as any} status="online" />)
        const status = container.querySelector('[role="status"]')
        expect(status).toBeInTheDocument()
      })
    })

    it('image has object-cover', () => {
      const { container } = render(<Avatar src="/avatar.jpg" alt="User" />)
      const img = container.querySelector('img')
      expect(img).toHaveClass('object-cover')
    })
  })
})
