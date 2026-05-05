'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { FEED_QUERY_KEY, type FeedPage } from '@/entities/feed';

import { MOCK_FEED_DATA } from './mock-data';

const PAGE_SIZE = 10;
export { FEED_QUERY_KEY };

async function fetchFeedPage(pageParam: number): Promise<FeedPage> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const items = MOCK_FEED_DATA.slice(start, end);

  return {
    items,
    nextPage: end < MOCK_FEED_DATA.length ? pageParam + 1 : undefined,
  };
}

export function useInfiniteFeedQuery() {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchFeedPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
