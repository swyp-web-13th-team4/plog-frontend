'use client';

import { useQuery } from '@tanstack/react-query';

import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';

import { getFeedDetail } from '../api/client';
import { feedQueryKeys } from './query-keys';

function isPrivateAccessError(error: unknown) {
  return (
    error instanceof ApiResponseError &&
    error.errorCode === API_ERROR_CODE.FAILED_AUTH
  );
}

export function useFeedDetailQuery(postId: number) {
  const query = useQuery({
    queryKey: feedQueryKeys.detail(postId),
    queryFn: () => getFeedDetail(postId),
    enabled: Number.isInteger(postId) && postId > 0,
    retry: (_, error) => !isPrivateAccessError(error),
  });

  return {
    ...query,
    isPrivateAccessError: isPrivateAccessError(query.error),
  };
}
