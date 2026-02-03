// Lighthouse CI Configuration
// Performance budgets and CI integration for Phase 5

module.exports = {
  ci: {
    collect: {
      // Server configuration
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local',
      startServerReadyTimeout: 30000,

      // URLs to test
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/#/colors',
        'http://localhost:4173/#/typography',
      ],

      // Number of runs for statistical significance
      numberOfRuns: 3,

      // Chrome settings
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --headless --disable-gpu',
        throttlingMethod: 'devtools',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },

    assert: {
      preset: 'lighthouse:recommended',

      assertions: {
        // ===========================================
        // PERFORMANCE (Core Web Vitals)
        // ===========================================
        'categories:performance': ['error', { minScore: 0.8 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 4000 }],
        interactive: ['error', { maxNumericValue: 5000 }],

        // ===========================================
        // ACCESSIBILITY (WCAG 2.1 AA)
        // ===========================================
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'color-contrast': 'error',
        'button-name': 'error',
        'link-name': 'error',
        'image-alt': 'error',
        label: 'error',
        'html-has-lang': 'error',
        'document-title': 'error',
        'meta-viewport': 'error',
        'heading-order': 'warn',
        'bypass': 'warn',

        // ===========================================
        // BEST PRACTICES
        // ===========================================
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'errors-in-console': 'warn',
        'uses-https': 'off', // Disabled for localhost
        'no-vulnerable-libraries': 'error',
        deprecations: 'warn',
        'js-libraries': 'warn',
        'valid-source-maps': 'warn',

        // ===========================================
        // SEO
        // ===========================================
        'categories:seo': ['error', { minScore: 0.8 }],
        'meta-description': 'warn',
        viewport: 'error',
        'http-status-code': 'error',
        'is-crawlable': 'warn',

        // ===========================================
        // PWA (Disabled for now)
        // ===========================================
        'categories:pwa': 'off',

        // ===========================================
        // RESOURCE OPTIMIZATION
        // ===========================================
        'uses-rel-preconnect': 'warn',
        'uses-responsive-images': 'warn',
        'offscreen-images': 'warn',
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
        'modern-image-formats': 'warn',
        'uses-optimized-images': 'warn',
        'uses-text-compression': 'error',
        'uses-long-cache-ttl': 'warn',
        'efficient-animated-content': 'warn',

        // ===========================================
        // BUNDLE SIZE BUDGETS
        // ===========================================
        'resource-summary:script:size': ['error', { maxNumericValue: 307200 }], // 300KB JS
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 102400 }], // 100KB CSS
        'resource-summary:image:size': ['warn', { maxNumericValue: 409600 }], // 400KB images
        'resource-summary:font:size': ['warn', { maxNumericValue: 102400 }], // 100KB fonts
        'resource-summary:total:size': ['error', { maxNumericValue: 819200 }], // 800KB total
      },

      // Aggregation method for multiple runs
      aggregationMethod: 'median',
    },

    upload: {
      // Upload to temporary public storage for CI
      target: 'temporary-public-storage',

      // Report filename pattern
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',

      // GitHub integration
      githubToken: process.env.GITHUB_TOKEN,
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
