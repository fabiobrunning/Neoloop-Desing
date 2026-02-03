import { describe, test } from 'vitest'
import { render } from '@testing-library/react'
import { checkA11y } from '@/tests/utils/a11y'
import { Spinner } from '@/src/components/core/Spinner'

describe('Spinner Accessibility', () => {
  test('has no axe violations - default', async () => {
    const { container } = render(<Spinner />)
    await checkA11y(container)
  })

  test('has no axe violations - all sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const sz of sizes) {
      const { container } = render(<Spinner size={sz} />)
      await checkA11y(container)
    }
  })

  test('has no axe violations - all variants', async () => {
    const variants = ['default', 'white', 'primary'] as const
    for (const v of variants) {
      const { container } = render(<Spinner variant={v} />)
      await checkA11y(container)
    }
  })

  test('has no axe violations - with custom label', async () => {
    const { container } = render(<Spinner label="Loading..." />)
    await checkA11y(container)
  })

  test('has no axe violations - with all features', async () => {
    const { container } = render(<Spinner size="lg" variant="primary" label="Processing..." />)
    await checkA11y(container)
  })
})
