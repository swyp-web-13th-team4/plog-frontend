import { GetAllReviewsPage } from '@/views/review';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ placeId?: string; type?: string }>;
}) {
  const { placeId, type } = await searchParams;
  const placeType = type === 'bookmark' ? 'bookmark' : 'record';

  return <GetAllReviewsPage placeId={Number(placeId)} placeType={placeType} />;
}
