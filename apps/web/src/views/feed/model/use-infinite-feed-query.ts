'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { type FeedPage, type FeedPost, feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

type FeedCursor = {
  lastPostId: number | null;
};

type FeedListResponse = {
  feedFindResponses: FeedPost[];
  lastPostId: number | null;
};

async function getFeedPage(
  { lastPostId }: FeedCursor = { lastPostId: null },
): Promise<FeedPage> {
  const params = new URLSearchParams();
  if (lastPostId !== null && lastPostId !== undefined) {
    params.set('lastPostId', String(lastPostId));
  }

  const query = params.toString();
  const data = await clientApi.get<FeedListResponse>(
    `/feed/list${query ? `?${query}` : ''}`,
  );

  return {
    items: data.feedFindResponses,
    lastPostId: data.lastPostId,
    createAt: null,
  };
}

export function useInfiniteFeedQuery() {
  return useInfiniteQuery<
    FeedPage,
    Error,
    { pages: FeedPage[]; pageParams: FeedCursor[] },
    typeof feedQueryKeys.all,
    FeedCursor
  >({
    queryKey: feedQueryKeys.all,
    queryFn: ({ pageParam }) => getFeedPage(pageParam),
    initialPageParam: {
      lastPostId: 0,
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.items.length === 0) return undefined;
      if (lastPage.lastPostId === null) return undefined;
      if (lastPage.lastPostId === lastPageParam.lastPostId) return undefined;

      return {
        lastPostId: lastPage.lastPostId,
      };
    },
  });
}
