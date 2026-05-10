'use client';

import { useQuery } from '@tanstack/react-query';

import { feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

import { type PostEditData } from './types';

function getPostForEdit(postId: number) {
  return clientApi.get<PostEditData>(`/post/${postId}/edit`);
}

export function useEditLogQuery(postId: number | null) {
  return useQuery({
    queryKey: feedQueryKeys.edit(postId),
    queryFn: () => getPostForEdit(postId as number),
    enabled: postId !== null && Number.isFinite(postId),
  });
}
