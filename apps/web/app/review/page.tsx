import { notFound } from 'next/navigation';

import { GetAllReviewsPage } from '@/views/review';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ placeId?: string; type?: string }>;
}) {
  const { placeId, type } = await searchParams;
  const placeType = type === 'bookmark' ? 'bookmark' : 'record';
  const numericPlaceId = Number(placeId);

  if (!Number.isInteger(numericPlaceId) || numericPlaceId <= 0) {
    notFound();
  }

  return <GetAllReviewsPage placeId={numericPlaceId} placeType={placeType} />;
}
