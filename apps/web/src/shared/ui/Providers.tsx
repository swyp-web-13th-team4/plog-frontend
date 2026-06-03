'use client';

import { type ReactNode, useState } from 'react';

import * as amplitude from '@amplitude/unified';
import { ToastProvider } from '@plog/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalDialog from './GlobalDialog';

if (process.env.NODE_ENV === 'production') {
  amplitude.initAll(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, {
    analytics: { autocapture: true },
    sessionReplay: { sampleRate: 0.1 },
  });
}

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
      <GlobalDialog />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
