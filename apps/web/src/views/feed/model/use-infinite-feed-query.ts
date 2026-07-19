'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  buildFeedListPath,
  FEED_INITIAL_CURSOR,
  type FeedCursor,
  type FeedMainPage,
  feedQueryKeys,
  feedResponseSchema,
  getFeedNextCursor,
  toFeedMainPage,
} from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

async function getFeedPage({
  lastPostId,
}: FeedCursor = FEED_INITIAL_CURSOR): Promise<FeedMainPage> {
  const data = await clientApi.get(
    buildFeedListPath(lastPostId),
    feedResponseSchema,
  );

  return toFeedMainPage(data);
}

export function useInfiniteFeedQuery() {
  return useInfiniteQuery<
    FeedMainPage,
    Error,
    { pages: FeedMainPage[]; pageParams: FeedCursor[] },
    typeof feedQueryKeys.all,
    FeedCursor
  >({
    queryKey: feedQueryKeys.all,
    queryFn: ({ pageParam }) => getFeedPage(pageParam),
    initialPageParam: FEED_INITIAL_CURSOR,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      getFeedNextCursor(lastPage, lastPageParam),
  });
}
