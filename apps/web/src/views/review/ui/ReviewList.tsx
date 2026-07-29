import { PlaceReviewListItem } from '@/entities/review';

import { ReviewDataEmptyState, ReviewImageDataEmptyState } from '@/shared/ui';

import ReviewItem from './ReviewItem';

export default function ReviewList({
  reviews,
  imageOnly,
}: {
  reviews: PlaceReviewListItem[];
  imageOnly: boolean;
}) {
  if (reviews.length === 0) {
    return (
      <div className="flex min-h-dvw flex-1 items-center justify-center bg-semantic-bg-deep">
        {imageOnly ? <ReviewImageDataEmptyState /> : <ReviewDataEmptyState />}
      </div>
    );
  }

  return (
    <section className="px-6">
      {reviews.map((review) => (
        <ReviewItem key={review.reviewId} review={review} />
      ))}
    </section>
  );
}
