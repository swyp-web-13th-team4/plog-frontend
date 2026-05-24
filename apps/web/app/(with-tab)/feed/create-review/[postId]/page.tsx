import type { Metadata } from 'next';

import { CreateReviewPage } from '@/views/create-review';

export const metadata: Metadata = { title: '리뷰 작성' };

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  return <CreateReviewPage postId={postId} />;
}
