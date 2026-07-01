import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CreateReviewPage } from '@/views/create-review';

export const metadata: Metadata = { title: '리뷰 작성' };

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const id = Number(postId);
  if (!Number.isInteger(id) || id <= 0) notFound();

  return <CreateReviewPage postId={postId} />;
}
