'use client';

import { useRouter } from 'next/navigation';

import { AppBar } from '@plog/ui';

import { mockPlaceReviewSummary } from '@/widgets/place-review-summary';
import ReviewSummary from '@/widgets/place-review-summary/ui/ReviewSummary';

import { PlaceLayer } from '@/entities/place';

import ReviewLists from './ReviewLists';

export default function GetAllReviewsPage({
  placeId,
  placeType,
}: {
  placeId: number;
  placeType: PlaceLayer;
}) {
  const router = useRouter();
  const isRecord = placeType === 'record';
  return (
    <>
      <header>
        <AppBar
          variant="navigation"
          onBack={() => router.back()}
          title="리뷰"
        />
      </header>
      <ReviewSummary
        variant={isRecord ? 'record' : 'bookmark'}
        summary={mockPlaceReviewSummary}
      />
      <div aria-hidden="true" className="h-2 bg-semantic-bg-deep" />
      <ReviewLists placeId={placeId} />
    </>
  );
}
