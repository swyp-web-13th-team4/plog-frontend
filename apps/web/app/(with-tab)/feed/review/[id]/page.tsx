import { ReviewPage } from '@/views/review';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ReviewPage postId={id} />;
}
