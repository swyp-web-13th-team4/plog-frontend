'use client';

import { useState } from 'react';

import { Button, Icon, Select } from '@plog/ui';
import { cn } from '@plog/utils';

import { mockReviewLists } from '../model/mock-data';
import { type UserReviewInfo } from '../model/types';
import ReviewItem from './ReviewItem';

const REVIEW_LIST_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '등록순', value: 'registered' },
  { label: '별점 높은순', value: 'highest' },
  { label: '별점 낮은순', value: 'lowest' },
];

function sortReviews(reviews: UserReviewInfo[], sort: string) {
  return [...reviews].sort((a, b) => {
    switch (sort) {
      case 'registered':
        return a.createdAt.localeCompare(b.createdAt);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'latest':
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });
}

export default function ReviewLists({ placeId }: { placeId: number }) {
  const [sort, setSort] = useState('latest');
  const [photoOnly, setPhotoOnly] = useState(false);

  const reviews = sortReviews(
    mockReviewLists.filter(
      (review) => !photoOnly || (review.images && review.images.length > 0),
    ),
    sort,
  );

  const handlePhotoOnlyToggle = () => {
    setPhotoOnly((prev) => !prev);
  };

  return (
    <section className="flex flex-col gap-2 px-6 py-5">
      <div className="flex gap-3 mobile:gap-2">
        <Select
          items={REVIEW_LIST_OPTIONS}
          value={sort}
          onValueChange={(value) => setSort(value as string)}
        />
        <Button
          size="small"
          aria-label="사진 리뷰만 보기"
          variant="outline"
          iconLeft={<Icon name="camera-filled" size={16} />}
          className={cn(
            'rounded-xl',
            photoOnly &&
              'bg-semantic-object-boldest text-semantic-system-white hover:bg-semantic-object-boldest',
          )}
          onClick={handlePhotoOnlyToggle}
        >
          사진 리뷰만 보기
        </Button>
      </div>

      <div className="flex flex-col">
        {reviews.map((review) => (
          <ReviewItem key={review.memberKey} review={review} />
        ))}
      </div>
    </section>
  );
}
