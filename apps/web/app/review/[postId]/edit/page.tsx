import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CreateReviewPage } from '@/views/review-create';

export const metadata: Metadata = { title: '리뷰 수정' };

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId: reviewIdParam } = await params;
  const reviewId = Number(reviewIdParam);

  if (!Number.isInteger(reviewId) || reviewId <= 0) {
    notFound();
  }

  return <CreateReviewPage editReviewId={reviewId} />;
}
