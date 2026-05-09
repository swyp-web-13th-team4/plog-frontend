'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { FEED_QUERY_KEY, type FeedPage, getFeedPage } from '@/entities/feed';

export { FEED_QUERY_KEY };

type FeedCursor = {
  lastPostId: number | null;
  createAt: string | null;
};

export function useInfiniteFeedQuery() {
  return useInfiniteQuery<
    FeedPage,
    Error,
    { pages: FeedPage[]; pageParams: FeedCursor[] },
    typeof FEED_QUERY_KEY,
    FeedCursor
  >({
    queryKey: FEED_QUERY_KEY,
    queryFn: ({ pageParam }) => getFeedPage(pageParam),
    initialPageParam: {
      lastPostId: null,
      createAt: null,
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.items.length === 0) return undefined;
      if (lastPage.lastPostId === null) return undefined;
      if (lastPage.createAt === null) return undefined;
      if (
        lastPage.lastPostId === lastPageParam.lastPostId &&
        lastPage.createAt === lastPageParam.createAt
      ) {
        return undefined;
      }

      return {
        lastPostId: lastPage.lastPostId,
        createAt: lastPage.createAt,
      };
    },
  });
}
