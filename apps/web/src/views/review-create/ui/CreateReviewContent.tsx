import { notFound, redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getFeedPost } from '@/entities/feed/api/server';
import { feedQueryKeys } from '@/entities/feed/model/query-keys';
import { type FeedDetailResponse } from '@/entities/feed/model/schemas';

import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';
import { getQueryClient } from '@/shared/lib/query-client';

import CreateReviewPage from './CreateReviewPage';

export default async function CreateReviewContent({
  postId,
}: {
  postId: number;
}) {
  const queryClient = getQueryClient();
  let post: FeedDetailResponse;

  try {
    post = await queryClient.fetchQuery({
      queryKey: feedQueryKeys.detail(postId),
      queryFn: () => getFeedPost(String(postId)),
    });
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

  if (!post) notFound();

  if (!post.isAuthor) {
    redirect('/feed');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateReviewPage postId={postId} />
    </HydrationBoundary>
  );
}
