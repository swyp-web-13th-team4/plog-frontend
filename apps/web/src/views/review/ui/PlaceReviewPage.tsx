'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button, Spinner } from '@plog/ui';

import { type PlaceLayer } from '@/entities/place';
import { type ReviewSortType } from '@/entities/review';

import { FetchErrorEmptyState, NavigationHeader } from '@/shared/ui';

import { usePlaceReviewsQuery } from '../model/use-place-reviews-query';
import ReviewList from './ReviewList';
import ReviewOverview from './ReviewOverview';
import ReviewToolbar from './ReviewToolbar';

type PlaceReviewPageProps = {
  placeId: number;
  placeType: PlaceLayer;
};

function ReviewPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavigationHeader title="리뷰" />
      <section className="flex min-h-dvh flex-col pt-[var(--spacing-header)]">
        {children}
      </section>
    </>
  );
}

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
    isFetchNextPageError,
    isFetchingNextPage,
  } = usePlaceReviewsQuery({
    placeId,
    placeType,
    sortType,
    imageOnly,
  });

  const handleRetryNextPage = () => {
    void fetchNextPage();
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
      fetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  ]);

  if (isPending) {
    return (
      <ReviewPageLayout>
        <div className="flex flex-1 items-center justify-center">
          <Spinner size="large" />
        </div>
      </ReviewPageLayout>
    );
  }

  if (isError) {
    return (
      <ReviewPageLayout>
        <div className="flex flex-1 items-center justify-center">
          <FetchErrorEmptyState onRetry={refetch} />
        </div>
      </ReviewPageLayout>
    );
  }

  const summary = data.pages[0].summary;
  const reviews = data.pages.flatMap((page) => page.reviews.content);

  return (
    <ReviewPageLayout>
      <ReviewOverview placeType={placeType} summary={summary} />
      <div className="h-2 w-full bg-semantic-bg-deep" />

      <div className="flex flex-1 flex-col">
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

        {isFetchNextPageError && (
          <div
            role="alert"
            className="flex flex-col items-center justify-center gap-3 py-6"
          >
            <p className="body-sm text-semantic-object-normal">
              리뷰를 더 불러오지 못했어요.
            </p>
            <Button
              type="button"
              size="small"
              variant="outline"
              onClick={handleRetryNextPage}
            >
              다시 시도
            </Button>
          </div>
        )}
      </div>
    </ReviewPageLayout>
  );
}
