'use client';

import { useQuery } from '@tanstack/react-query';

import { feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

import { type EditData } from './types';

function getPostForEdit(postId: number) {
  return clientApi.get<EditData>(`/post/${postId}/edit`);
}

export function useEditLogQuery(postId: number | null) {
  return useQuery({
    queryKey: feedQueryKeys.edit(postId),
    queryFn: () => getPostForEdit(postId as number),
    enabled: postId !== null && Number.isFinite(postId),
  });
}
