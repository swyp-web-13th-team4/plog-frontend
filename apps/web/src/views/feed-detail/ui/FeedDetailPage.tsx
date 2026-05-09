import FeedDetailCard from './FeedDetailCard';

export default async function FeedDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ backTo?: string }>;
}) {
  const { id } = await params;
  const backTo = searchParams ? (await searchParams).backTo : undefined;
  const safeBackTo = backTo?.startsWith('/feed/users/') ? backTo : undefined;

  return <FeedDetailCard postId={id} backTo={safeBackTo} />;
}
