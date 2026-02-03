import { describe, test } from 'vitest'
import { render } from '@testing-library/react'
import { checkA11y } from '@/tests/utils/a11y'
import { ProgressBar } from '@/src/components/core/ProgressBar'

describe('ProgressBar Accessibility', () => {
  test('has no axe violations - default', async () => {
    const { container } = render(<ProgressBar />)
    await checkA11y(container)
  })

  test('has no axe violations - with value', async () => {
    const { container } = render(<ProgressBar value={50} />)
    await checkA11y(container)
  })

  test('has no axe violations - indeterminate', async () => {
    const { container } = render(<ProgressBar indeterminate />)
    await checkA11y(container)
  })

  test('has no axe violations - all variants', async () => {
    const variants = ['default', 'success', 'warning', 'error'] as const
    for (const v of variants) {
      const { container } = render(<ProgressBar variant={v} />)
      await checkA11y(container)
    }
  })

  test('has no axe violations - all sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const sz of sizes) {
      const { container } = render(<ProgressBar size={sz} />)
      await checkA11y(container)
    }
  })

  test('has no axe violations - with label', async () => {
    const { container } = render(<ProgressBar label="Loading..." showLabel />)
    await checkA11y(container)
  })

  test('has no axe violations - full featured', async () => {
    const { container } = render(
      <ProgressBar value={75} variant="success" size="lg" label="Uploading" showLabel />
    )
    await checkA11y(container)
  })
})
