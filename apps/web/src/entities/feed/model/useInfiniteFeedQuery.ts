'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { MOCK_FEED_DATA } from '@/entities/feed/model/mock-data';

import { type FeedPage } from './types';

const PAGE_SIZE = 10;
export const FEED_QUERY_KEY = ['feed'] as const;

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
