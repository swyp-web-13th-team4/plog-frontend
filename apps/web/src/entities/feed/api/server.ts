import { cache } from 'react';

import { serverApi } from '@/shared/api/server-api';

import { feedDetailResponseSchema, feedResponseSchema } from '../model/schemas';
import { type FeedMainPage } from '../model/types';

export const getFeedPost = cache((id: string) =>
  serverApi.get(`/feed/${id}`, feedDetailResponseSchema),
);

export const getFeedList = cache(async (): Promise<FeedMainPage> => {
  const data = await serverApi.get(
    '/feed/list?lastPostId=0',
    feedResponseSchema,
  );

  return {
    items: data.feedFindResponses,
    lastPostId: data.lastPostId,
    createAt: data.createdAt,
  };
});
