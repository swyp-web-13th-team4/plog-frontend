'use client';

import { useQuery } from '@tanstack/react-query';

import { feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

import { type FeedDetail } from './types';

function getFeedDetail(postId: number) {
  return clientApi.get<FeedDetail>(`/feed/${postId}`);
}

export function useFeedDetailQuery(postId: number) {
  return useQuery({
    queryKey: feedQueryKeys.detail(postId),
    queryFn: () => getFeedDetail(postId),
    enabled: Number.isInteger(postId) && postId > 0,
  });
}
