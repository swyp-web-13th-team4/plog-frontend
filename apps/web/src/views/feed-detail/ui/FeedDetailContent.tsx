import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getFeedPost } from '@/entities/feed/api/server';
import { feedQueryKeys } from '@/entities/feed/model/query-keys';
import { type FeedDetailResponse } from '@/entities/feed/model/schemas';

import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';
import { getQueryClient } from '@/shared/lib/query-client';

import FeedDetailCard from './FeedDetailCard';

export default async function FeedDetailContent({ id }: { id: string }) {
  const queryClient = getQueryClient();
  let post: FeedDetailResponse;

  try {
    post = await queryClient.fetchQuery({
      queryKey: feedQueryKeys.detail(id),
      queryFn: () => getFeedPost(id),
    });
  } catch (error) {
    if (
      error instanceof ApiResponseError &&
      error.errorCode === API_ERROR_CODE.POST_NOT_FOUND
    ) {
      notFound();
    }

    return <FeedDetailCard postId={id} />;
  }

  if (!post) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedDetailCard postId={id} />
    </HydrationBoundary>
  );
}
