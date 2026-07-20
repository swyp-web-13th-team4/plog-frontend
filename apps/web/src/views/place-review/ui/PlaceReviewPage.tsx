'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 200px 0px',
  });
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePlaceReviewsQuery({
    placeId,
    placeType,
    sortType,
    imageOnly,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <>
        <NavigationHeader title="리뷰" />
        <main className="flex min-h-dvh flex-col pt-[var(--spacing-header)]">
          <section className="flex flex-1 items-center justify-center">
            <Spinner size="large" />
          </section>
        </main>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <NavigationHeader title="리뷰" />
        <main className="flex min-h-dvh flex-col pt-[var(--spacing-header)]">
          <section className="flex flex-1 items-center justify-center">
            <FetchErrorEmptyState onRetry={refetch} />
          </section>
        </main>
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

          {hasNextPage && <div ref={ref} aria-hidden="true" />}

          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-6">
              <Spinner size="large" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
