import { cache } from 'react';

import { serverApi } from '@/shared/api/server-api';

import { feedDetailResponseSchema } from '../model/schemas';

export const getFeedPost = cache((id: string) =>
  serverApi.get(`/feed/${id}`, feedDetailResponseSchema),
);
