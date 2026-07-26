import { Suspense } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CreateReviewContent } from '@/views/review-create';
import CreateReviewLoading from '@/views/review-create/ui/CreateReviewLoading';

export const metadata: Metadata = { title: '리뷰 작성' };

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId: postIdParam } = await params;
  const postId = Number(postIdParam);
  if (!Number.isInteger(postId) || postId <= 0) notFound();

  return (
    <Suspense fallback={<CreateReviewLoading />}>
      <CreateReviewContent postId={postId} />
    </Suspense>
  );
}
