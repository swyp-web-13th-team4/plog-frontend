'use client';

import { useState } from 'react';

import { Spinner } from '@plog/ui';

import { type PlaceLayer } from '@/entities/place';
import { type ReviewSortType } from '@/entities/review';

import { FetchErrorEmptyState, NavigationHeader } from '@/shared/ui';

import usePlaceReviewsQuery from '../model/use-place-reviews-query';
import ReviewList from './ReviewList';
import ReviewOverview from './ReviewOverview';
import ReviewToolbar from './ReviewToolbar';

type PlaceReviewPageProps = {
  placeId: number;
  placeType: PlaceLayer;
};

export default function PlaceReviewPage({
  placeId,
  placeType,
}: PlaceReviewPageProps) {
  const [sortType, setSortType] = useState<ReviewSortType>('LATEST');
  const [imageOnly, setImageOnly] = useState(false);
  const { data, isPending, isError, refetch } = usePlaceReviewsQuery({
    placeId,
    placeType,
    sortType,
    imageOnly,
  });

  if (isPending) {
    return (
      <>
        <NavigationHeader title="리뷰" />
        <section className="flex min-h-screen items-center justify-center pt-[var(--spacing-header)]">
          <Spinner size="large" />
        </section>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <NavigationHeader title="리뷰" />
        <section className="flex min-h-screen items-center justify-center pt-[var(--spacing-header)]">
          <FetchErrorEmptyState onRetry={refetch} />
        </section>
      </>
    );
  }

  const summary = data.pages[0].summary;
  const reviews = data.pages.flatMap((page) => page.reviews.content);

  return (
    <>
      <NavigationHeader title="리뷰" />
      <div className="flex min-h-dvh flex-col pt-[var(--spacing-header)]">
        <ReviewOverview placeType={placeType} summary={summary} />
        <div className="h-2 w-full bg-semantic-bg-deep" />

        <div className="flex flex-1 flex-col gap-2">
          <ReviewToolbar
            sortType={sortType}
            imageOnly={imageOnly}
            onSortTypeChange={setSortType}
            onShowImageChange={setImageOnly}
          />
          <ReviewList reviews={reviews} imageOnly={imageOnly} />
        </div>
      </div>
    </>
  );
}
