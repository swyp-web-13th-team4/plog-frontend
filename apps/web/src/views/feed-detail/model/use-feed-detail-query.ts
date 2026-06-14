'use client';

import { useQuery } from '@tanstack/react-query';

import {
  type FeedDetailResponse,
  feedDetailResponseSchema,
  feedQueryKeys,
} from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';
import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';

function getFeedDetail(postId: number) {
  return clientApi.get(`/feed/${postId}`, feedDetailResponseSchema);
}

function isPrivateAccessError(error: unknown) {
  return (
    error instanceof ApiResponseError &&
    error.errorCode === API_ERROR_CODE.FAILED_AUTH
  );
}

export function useFeedDetailQuery(
  postId: number,
  initialData?: FeedDetailResponse,
) {
  const query = useQuery({
    queryKey: feedQueryKeys.detail(postId),
    queryFn: () => getFeedDetail(postId),
    enabled: Number.isInteger(postId) && postId > 0,
    initialData,
    retry: false,
  });

  return {
    ...query,
    isPrivateAccessError: isPrivateAccessError(query.error),
  };
}
