'use client';

import { type ReactNode, useEffect, useState } from 'react';

import * as amplitude from '@amplitude/unified';
import { ToastProvider } from '@plog/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { QUERY_CLIENT_DEFAULT_OPTIONS } from '@/shared/lib/query-client';

import GlobalDialog from './GlobalDialog';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: QUERY_CLIENT_DEFAULT_OPTIONS }),
  );

  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      !process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
    )
      return;

    amplitude.initAll(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 0.1 },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
      <GlobalDialog />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
