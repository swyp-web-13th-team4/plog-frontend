import { Suspense } from 'react';

import { PlaceFeedPage } from '@/views/map-place-feed';

type PlaceFeedPageProps = {
  params: Promise<{ placeId: string }>;
};

export default async function Page({ params }: PlaceFeedPageProps) {
  const { placeId } = await params;
  return (
    <Suspense>
      <PlaceFeedPage placeId={Number(placeId)} />
    </Suspense>
  );
}
