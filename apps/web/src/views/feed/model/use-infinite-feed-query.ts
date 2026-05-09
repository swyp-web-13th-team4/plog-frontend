'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { FEED_QUERY_KEY, type FeedPage, type FeedPost } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

export { FEED_QUERY_KEY };

type FeedCursor = {
  lastPostId: number | null;
  createAt: string | null;
};

type FeedListResponse = {
  feedFindResponses: FeedPost[];
  lastPostId: number | null;
  createAt: string | null;
};

async function getFeedPage(
  { lastPostId, createAt }: FeedCursor = { lastPostId: null, createAt: null },
): Promise<FeedPage> {
  const params = new URLSearchParams();
  if (lastPostId !== null && lastPostId !== undefined) {
    params.set('lastPostId', String(lastPostId));
  }
  if (createAt) {
    params.set('createAt', createAt);
  }

  const query = params.toString();
  const data = await clientApi.get<FeedListResponse>(
    `/feed/list${query ? `?${query}` : ''}`,
  );

  return {
    items: data.feedFindResponses,
    lastPostId: data.lastPostId,
    createAt: data.createAt,
  };
}

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
      lastPostId: 0,
      createAt: new Date().toISOString(),
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
