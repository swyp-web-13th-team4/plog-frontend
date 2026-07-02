import { cache } from 'react';

import { serverApi } from '@/shared/api/server-api';

import { feedProfileViewResponseSchema } from '../model/schemas';

export const getUserProfile = cache((id: string) =>
  serverApi.get(
    `/feed/profileView/${encodeURIComponent(id)}`,
    feedProfileViewResponseSchema,
  ),
);
