import { type QueryClientConfig } from '@tanstack/react-query';

export const QUERY_CLIENT_DEFAULT_OPTIONS = {
  queries: {
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  },
} satisfies QueryClientConfig['defaultOptions'];
