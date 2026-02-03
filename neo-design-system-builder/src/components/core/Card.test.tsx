import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card, CardHeader, CardBody, CardFooter } from './Card'

describe('Card', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('renders all variants', () => {
      const variants = ['blank', 'elevated', 'outline', 'filled'] as const

      variants.forEach(variant => {
        const { rerender } = render(<Card variant={variant}>{variant}</Card>)
        expect(screen.getByText(variant)).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('renders with custom className', () => {
      render(<Card className="custom-class">Content</Card>)
      const card = screen.getByText('Content').parentElement
      expect(card).toHaveClass('custom-class')
    })
  })

  describe('Variants', () => {
    it('applies blank variant', () => {
      render(<Card variant="blank">Blank</Card>)
      const card = screen.getByText('Blank').parentElement
      expect(card).toHaveClass('bg-white')
    })

    it('applies elevated variant', () => {
      render(<Card variant="elevated">Elevated</Card>)
      const card = screen.getByText('Elevated').parentElement
      expect(card).toHaveClass('bg-white')
    })

    it('applies outline variant', () => {
      render(<Card variant="outline">Outline</Card>)
      const card = screen.getByText('Outline').parentElement
      expect(card).toHaveClass('border')
    })

    it('applies filled variant', () => {
      render(<Card variant="filled">Filled</Card>)
      const card = screen.getByText('Filled').parentElement
      expect(card).toHaveClass('bg-gray-50')
    })
  })

  describe('Padding', () => {
    it('applies padding sizes', () => {
      const sizes = ['none', 'sm', 'md', 'lg', 'xl'] as const
      const expectedClasses = ['p-0', 'p-3', 'p-4', 'p-6', 'p-8']

      sizes.forEach((size, index) => {
        const { rerender } = render(<Card padding={size}>{size}</Card>)
        const card = screen.getByText(size).parentElement
        expect(card).toHaveClass(expectedClasses[index])
        rerender(<></>)
      })
    })
  })

  describe('Shadow', () => {
    it('applies shadow levels', () => {
      const shadows = ['none', 'sm', 'md', 'lg', 'xl'] as const
      const expectedClasses = ['shadow-none', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl']

      shadows.forEach((shadow, index) => {
        const { rerender } = render(<Card shadow={shadow}>{shadow}</Card>)
        const card = screen.getByText(shadow).parentElement
        expect(card).toHaveClass(expectedClasses[index])
        rerender(<></>)
      })
    })
  })

  describe('Radius', () => {
    it('applies border radius', () => {
      const radiuses = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const
      const expectedClasses = ['rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full']

      radiuses.forEach((radius, index) => {
        const { rerender } = render(<Card radius={radius}>{radius}</Card>)
        const card = screen.getByText(radius).parentElement
        expect(card).toHaveClass(expectedClasses[index])
        rerender(<></>)
      })
    })
  })

  describe('Clickable Card', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Card onClick={handleClick}>Clickable</Card>)
      const card = screen.getByRole('button')

      await user.click(card)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('has button role when clickable', () => {
      render(<Card onClick={() => {}}>Clickable</Card>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('is keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Card onClick={handleClick}>Clickable</Card>)
      const card = screen.getByRole('button')

      card.focus()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Composition', () => {
    it('renders with CardHeader', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
        </Card>
      )
      expect(screen.getByText('Header')).toBeInTheDocument()
    })

    it('renders with CardBody', () => {
      render(
        <Card>
          <CardBody>Body content</CardBody>
        </Card>
      )
      expect(screen.getByText('Body content')).toBeInTheDocument()
    })

    it('renders with CardFooter', () => {
      render(
        <Card>
          <CardFooter>Footer</CardFooter>
        </Card>
      )
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('renders complete card with all sections', () => {
      render(
        <Card>
          <CardHeader>Title</CardHeader>
          <CardBody>Content</CardBody>
          <CardFooter>Actions</CardFooter>
        </Card>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
      expect(screen.getByText('Actions')).toBeInTheDocument()
    })
  })
})
