'use client';

import { useQuery } from '@tanstack/react-query';

import { FEED_QUERY_KEY, getFeedDetail } from '@/entities/feed';

export function useFeedDetailQuery(postId: number) {
  return useQuery({
    queryKey: [...FEED_QUERY_KEY, 'detail', postId],
    queryFn: () => getFeedDetail(postId),
    enabled: Number.isInteger(postId) && postId > 0,
  });
}
