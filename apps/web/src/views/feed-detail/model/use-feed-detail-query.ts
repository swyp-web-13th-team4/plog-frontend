'use client';

import { useQuery } from '@tanstack/react-query';

import { type FeedPost, feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

function getFeedDetail(postId: number) {
  return clientApi.get<FeedPost>(`/feed/${postId}`);
}

export function useFeedDetailQuery(postId: number) {
  return useQuery({
    queryKey: feedQueryKeys.detail(postId),
    queryFn: () => getFeedDetail(postId),
    enabled: Number.isInteger(postId) && postId > 0,
  });
}
