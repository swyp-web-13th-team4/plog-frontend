import { CreateReviewPage } from '@/views/create-review';

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  return <CreateReviewPage postId={postId} />;
}
