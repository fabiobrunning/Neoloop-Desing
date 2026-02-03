import { describe, test } from 'vitest'
import { render } from '@testing-library/react'
import { checkA11y } from '@/tests/utils/a11y'
import { Avatar } from '@/src/components/core/Avatar'

describe('Avatar Accessibility', () => {
  test('has no axe violations - with image', async () => {
    const { container } = render(<Avatar src="/avatar.jpg" alt="User" />)
    await checkA11y(container)
  })

  test('has no axe violations - with initials', async () => {
    const { container } = render(<Avatar initials="JD" />)
    await checkA11y(container)
  })

  test('has no axe violations - with fallback', async () => {
    const { container } = render(<Avatar fallback={<span>FB</span>} />)
    await checkA11y(container)
  })

  test('has no axe violations - default icon', async () => {
    const { container } = render(<Avatar />)
    await checkA11y(container)
  })

  test('has no axe violations - all sizes', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
    for (const s of sizes) {
      const { container } = render(<Avatar initials="A" size={s} />)
      await checkA11y(container)
    }
  })

  test('has no axe violations - all shapes', async () => {
    const shapes = ['circle', 'square'] as const
    for (const shape of shapes) {
      const { container } = render(<Avatar initials="A" shape={shape} />)
      await checkA11y(container)
    }
  })

  test('has no axe violations - all statuses', async () => {
    const statuses = ['online', 'offline', 'away', 'busy'] as const
    for (const status of statuses) {
      const { container } = render(<Avatar initials="A" status={status} />)
      await checkA11y(container)
    }
  })

  test('has no axe violations - with all features', async () => {
    const { container } = render(
      <Avatar src="/avatar.jpg" alt="User" initials="JD" size="lg" shape="square" status="online" />
    )
    await checkA11y(container)
  })
})
