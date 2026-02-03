/**
 * React Query Provider
 * Configures QueryClient with optimized settings
 */

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/**
 * Query Client configuration
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: data considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,

      // Cache time: unused data kept for 10 minutes
      gcTime: 10 * 60 * 1000,

      // Retry configuration
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch configuration
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      retryDelay: 1000,
    },
  },
});

/**
 * Query Provider Props
 */
interface QueryProviderProps {
  children: ReactNode;
  enableDevtools?: boolean;
}

/**
 * Query Provider Component
 */
export const QueryProvider: React.FC<QueryProviderProps> = ({ children, enableDevtools = true }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {enableDevtools && <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />}
    </QueryClientProvider>
  );
};

export { queryClient };
