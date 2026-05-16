import { Suspense } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: '장소' };

import { notFound } from 'next/navigation';

import { PlaceFeedPage } from '@/views/map-place-feed';

type PlaceFeedPageProps = {
  params: Promise<{ placeId: string }>;
};

export default async function Page({ params }: PlaceFeedPageProps) {
  const { placeId } = await params;
  const id = Number(placeId);
  if (!Number.isInteger(id) || id <= 0) notFound();
  return (
    <Suspense>
      <PlaceFeedPage placeId={id} />
    </Suspense>
  );
}
