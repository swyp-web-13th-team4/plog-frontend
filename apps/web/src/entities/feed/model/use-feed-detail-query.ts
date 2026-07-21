'use client';

import { useQuery } from '@tanstack/react-query';

import {
  type FeedDetailResponse,
  feedDetailResponseSchema,
} from '@/entities/feed/model/schemas';

import { clientApi } from '@/shared/api/client-api';
import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';

import { feedQueryKeys } from './query-keys';

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
  postId: number | null,
  initialData?: FeedDetailResponse,
) {
  const query = useQuery({
    queryKey: feedQueryKeys.detail(postId),
    queryFn: () => {
      if (postId === null || !Number.isInteger(postId) || postId <= 0) {
        throw new Error('조회할 게시글을 찾을 수 없습니다.');
      }

      return getFeedDetail(postId);
    },
    enabled: postId !== null && Number.isInteger(postId) && postId > 0,
    initialData,
    retry: false,
  });

  return {
    ...query,
    isPrivateAccessError: isPrivateAccessError(query.error),
  };
}
