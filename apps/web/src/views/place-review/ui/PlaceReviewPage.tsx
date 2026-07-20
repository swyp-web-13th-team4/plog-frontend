'use client';

import { useState } from 'react';

import { type PlaceLayer } from '@/entities/place';

import { NavigationHeader } from '@/shared/ui';

import { type ReviewSortType } from '../model/types';
import ReviewList from './ReviewList';
import ReviewOverview from './ReviewOverview';
import ReviewToolbar from './ReviewToolbar';

type PlaceReviewPageProps = {
  placeId: number;
  placeType: PlaceLayer;
};

export default function PlaceReviewPage({ placeType }: PlaceReviewPageProps) {
  const [sortType, setSortType] = useState<ReviewSortType>('LATEST');
  const [imageOnly, setImageOnly] = useState(false);
  return (
    <>
      <NavigationHeader title="리뷰" />
      <div className="pt-[var(--spacing-header)]">
        <ReviewOverview placeType={placeType} />
        <div className="h-2 w-full bg-semantic-bg-deep" />
        <div className="flex flex-col gap-2 p-6">
          <ReviewToolbar
            sortType={sortType}
            imageOnly={imageOnly}
            onSortTypeChange={setSortType}
            onShowImageChange={setImageOnly}
          />
          <ReviewList />
        </div>
      </div>
    </>
  );
}
