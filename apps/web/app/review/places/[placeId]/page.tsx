import { notFound } from 'next/navigation';

import { PlaceReview } from '@/views/place-review';

type Props = {
  params: Promise<{ placeId: string }>;
  searchParams: Promise<{ type?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { placeId } = await params;
  const { type } = await searchParams;

  const numericPlaceId = Number(placeId);

  if (!Number.isInteger(numericPlaceId) || numericPlaceId <= 0) {
    notFound();
  }

  if (type !== 'record' && type !== 'bookmark') {
    notFound();
  }

  return <PlaceReview placeId={numericPlaceId} placeType={type} />;
}
