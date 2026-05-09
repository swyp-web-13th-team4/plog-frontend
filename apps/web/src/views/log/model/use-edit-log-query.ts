'use client';

import { useQuery } from '@tanstack/react-query';

import { FEED_QUERY_KEY, getPostForEdit } from '@/entities/feed';

export function useEditLogQuery(postId: number | null) {
  return useQuery({
    queryKey: [...FEED_QUERY_KEY, 'edit', postId],
    queryFn: () => getPostForEdit(postId as number),
    enabled: postId !== null && Number.isFinite(postId),
  });
}
