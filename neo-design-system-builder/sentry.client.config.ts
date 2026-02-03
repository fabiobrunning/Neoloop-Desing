// Sentry Error Tracking Configuration
// Production error monitoring and performance tracking

import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const ENVIRONMENT = import.meta.env.VITE_ENV || 'development';
const RELEASE = import.meta.env.VITE_RELEASE || 'neo-design-system@1.0.0';

export function initSentry() {
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
    release: RELEASE,

    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Performance sampling
    tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0,

    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Error filtering
    beforeSend(event, hint) {
      // Filter out known non-critical errors
      const error = hint.originalException;

      if (error instanceof Error) {
        // Ignore network errors from third-party scripts
        if (error.message?.includes('ResizeObserver loop')) {
          return null;
        }

        // Ignore cancelled requests
        if (error.name === 'AbortError') {
          return null;
        }
      }

      return event;
    },

    // Breadcrumb filtering
    beforeBreadcrumb(breadcrumb) {
      // Filter out noisy console logs
      if (breadcrumb.category === 'console' && breadcrumb.level === 'debug') {
        return null;
      }
      return breadcrumb;
    },

    // Tags for filtering
    initialScope: {
      tags: {
        component: 'design-system',
        version: '1.0.0',
      },
    },

    // Ignore specific errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
      'Loading chunk',
      'ChunkLoadError',
    ],

    // Deny URLs (third-party scripts)
    denyUrls: [
      /extensions\//i,
      /^chrome:\/\//i,
      /^moz-extension:\/\//i,
    ],
  });
}

// Error boundary wrapper
export function withSentryErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode
) {
  return Sentry.withErrorBoundary(Component, {
    fallback,
    showDialog: ENVIRONMENT !== 'production',
  });
}

// Manual error capture
export function captureException(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

// Performance transaction
export function startTransaction(name: string, op: string) {
  return Sentry.startSpan({ name, op }, () => {});
}

// User identification
export function setUser(user: { id: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

// Clear user on logout
export function clearUser() {
  Sentry.setUser(null);
}

export default { initSentry, captureException, setUser, clearUser };
