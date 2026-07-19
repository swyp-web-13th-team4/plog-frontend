import { cache } from 'react';

import { serverApi } from '@/shared/api/server-api';

import {
  buildFeedListPath,
  FEED_INITIAL_CURSOR,
  toFeedMainPage,
} from '../lib/feed-page';
import { feedDetailResponseSchema, feedResponseSchema } from '../model/schemas';
import { type FeedMainPage } from '../model/types';

export const getFeedPost = cache((id: string) =>
  serverApi.get(`/feed/${id}`, feedDetailResponseSchema),
);

export const getFeedList = cache(
  async (
    lastPostId: number | null = FEED_INITIAL_CURSOR.lastPostId,
  ): Promise<FeedMainPage> => {
    const data = await serverApi.get(
      buildFeedListPath(lastPostId),
      feedResponseSchema,
    );

    return toFeedMainPage(data);
  },
);
