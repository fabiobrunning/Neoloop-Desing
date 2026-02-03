import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'integration',
      include: ['**/*.integration.test.{ts,tsx}'],
      testTimeout: 15000,
      hookTimeout: 15000
    }
  })
);
