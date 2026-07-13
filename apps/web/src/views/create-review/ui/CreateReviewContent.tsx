import { notFound } from 'next/navigation';

import { type FeedDetailResponse } from '@/entities/feed';
import { getFeedPost } from '@/entities/feed/api/server';

import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';

import CreateReviewPage from './CreateReviewPage';

export default async function CreateReviewContent({
  postId,
}: {
  postId: string;
}) {
  let initialPost: FeedDetailResponse | undefined;

  try {
    initialPost = await getFeedPost(postId);
  } catch (error) {
    console.error('[CreateReviewContent] 서버 게시글 조회 실패', error);
    if (
      error instanceof ApiResponseError &&
      error.errorCode === API_ERROR_CODE.POST_NOT_FOUND
    ) {
      notFound();
    }

    return <CreateReviewPage postId={postId} />;
  }

  if (!initialPost) notFound();

  return <CreateReviewPage postId={postId} initialPost={initialPost} />;
}
