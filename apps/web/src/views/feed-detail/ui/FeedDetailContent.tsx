import { notFound } from 'next/navigation';

import {
  type FeedDetailResponse,
  feedDetailResponseSchema,
} from '@/entities/feed/model/schemas';

import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';
import { serverApi } from '@/shared/api/server-api';

import FeedDetailCard from './FeedDetailCard';

export default async function FeedDetailContent({ id }: { id: string }) {
  let initialPost: FeedDetailResponse | undefined;

  try {
    initialPost = await serverApi.get(`/feed/${id}`, feedDetailResponseSchema);
  } catch (error) {
    if (
      error instanceof ApiResponseError &&
      error.errorCode === API_ERROR_CODE.POST_NOT_FOUND
    ) {
      notFound();
    }

    return <FeedDetailCard postId={id} />;
  }

  if (!initialPost) notFound();

  return <FeedDetailCard initialPost={initialPost} postId={id} />;
}
