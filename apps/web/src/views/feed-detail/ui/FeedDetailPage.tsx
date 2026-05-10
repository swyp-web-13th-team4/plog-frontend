import FeedDetailCard from './FeedDetailCard';

export default async function FeedDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <FeedDetailCard postId={id} />;
}
