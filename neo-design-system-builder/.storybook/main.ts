import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  viteFinal: async (config) => {
    return {
      ...config,
      build: {
        ...config.build,
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: ['react', 'react-dom', 'recharts', 'lucide-react', 'framer-motion'],
      },
    };
  },
};

export default config;
