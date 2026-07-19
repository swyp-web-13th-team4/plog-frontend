import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

import { QUERY_CLIENT_DEFAULT_OPTIONS } from './query-client-options';

export const getQueryClient = cache(
  () => new QueryClient({ defaultOptions: QUERY_CLIENT_DEFAULT_OPTIONS }),
);
