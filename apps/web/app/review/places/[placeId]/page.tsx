import { notFound } from 'next/navigation';

import { PlaceReview } from '@/views/review';

type Props = {
  params: Promise<{ placeId: string }>;
};

export default async function Page({ params }: Props) {
  const { placeId } = await params;

  const numericPlaceId = Number(placeId);

  if (!Number.isInteger(numericPlaceId) || numericPlaceId <= 0) {
    notFound();
  }

  return <PlaceReview placeId={numericPlaceId} />;
}
