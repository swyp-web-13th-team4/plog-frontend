'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Avatar, Divider, Dropdown, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { isReviewEditable, PlaceReviewListItem } from '@/entities/review';

import { formatDate } from '@/shared/lib/datetime';
import { dialog } from '@/shared/lib/dialog';
import { ImageWithFallback } from '@/shared/ui';

import { useDeleteReviewMutation } from '../model/use-delete-review-mutation';
import ImagesModal from './ImagesModal';

const AUTHOR_ACTION_OPTIONS = [
  { label: '삭제하기', value: 'delete' },
  { label: '수정하기', value: 'edit' },
];

const DELETE_ACTION_OPTIONS = [{ label: '삭제하기', value: 'delete' }];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`별점 ${rating}점`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          name="star-filled"
          boxed={false}
          className={cn(
            'size-4',
            index < rating
              ? 'text-semantic-theme-amber-normal'
              : 'text-semantic-object-subtler',
          )}
        />
      ))}
    </div>
  );
}

export default function ReviewItem({
  review,
}: {
  review: PlaceReviewListItem;
}) {
  const router = useRouter();
  const deleteReviewMutation = useDeleteReviewMutation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const canEdit = isReviewEditable(review.createdAt);
  const authorActionOptions = canEdit
    ? AUTHOR_ACTION_OPTIONS
    : DELETE_ACTION_OPTIONS;
  const visibleImages = review.imageUrls.slice(0, 3);

  const handleAuthorAction = async (value: string) => {
    if (value === 'delete') {
      const confirmed = await dialog.confirm({
        message: '리뷰를 삭제하시겠어요?',
        description: '삭제한 리뷰는 복구할 수 없어요.',
        confirmLabel: '삭제',
        cancelLabel: '취소',
      });

      if (confirmed) deleteReviewMutation.mutate(review.reviewId);
      return;
    }

    if (value === 'edit' && canEdit) {
      router.push(`/review/${review.reviewId}/edit`);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-b border-semantic-stroke-subtle py-6 last:border-b-0">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <Avatar
            size="xsmall"
            src={review.profileImageUrl}
            alt={`${review.nickname} 프로필`}
          />

          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <p className="label-lg text-semantic-object-boldest">
                {review.nickname}
              </p>

              {review.isAuthor && (
                <Dropdown
                  aria-label="리뷰 관리 메뉴"
                  items={authorActionOptions}
                  trigger={
                    <Icon
                      name="more-vertical"
                      className="text-semantic-object-normal"
                    />
                  }
                  disabled={deleteReviewMutation.isPending}
                  onSelect={handleAuthorAction}
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <RatingStars rating={review.rating} />
              <span className="label-md text-semantic-object-boldest">
                {review.rating.toFixed(1)}
              </span>
              <Divider orientation="vertical" className="h-2.5" />
              <span className="caption-md text-semantic-object-normal">
                {formatDate(review.createdAt, 'dot') ?? review.createdAt}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl border border-semantic-stroke-subtle bg-primitive-gray-20 px-6 py-5">
          {review.environments.map((environment) => (
            <div
              key={environment.environmentName}
              className="flex items-center gap-2.5"
            >
              <div className="flex items-center gap-1">
                <Icon
                  name={environment.iconName}
                  boxed={false}
                  className="size-3.5 text-semantic-object-subtle"
                />
                <span className="label-sm text-semantic-object-boldest">
                  {environment.title}
                </span>
              </div>
              <span className="label-sm text-semantic-object-bold">
                {environment.label}
              </span>
            </div>
          ))}
        </div>

        {review.content && (
          <p className="body-sm whitespace-pre-wrap text-semantic-object-bold">
            {review.content}
          </p>
        )}
      </div>

      {visibleImages.length > 0 && (
        <div className="flex gap-2">
          {visibleImages.map((imageUrl, index) => {
            const remainingCount =
              review.imageUrls.length - visibleImages.length;
            const showRemainingCount = remainingCount > 0 && index === 2;

            return (
              <button
                type="button"
                key={`${review.reviewId}-${imageUrl}-${index}`}
                aria-label={`${review.nickname} 리뷰 이미지 ${index + 1} 크게 보기`}
                onClick={() => setSelectedImageIndex(index)}
                className="relative size-20 cursor-pointer overflow-hidden rounded-xl bg-semantic-object-subtler"
              >
                <ImageWithFallback
                  src={imageUrl}
                  alt={`${review.nickname} 리뷰 이미지 ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
                {showRemainingCount && (
                  <span className="label-lg absolute inset-0 flex items-center justify-center bg-semantic-system-black/45 text-semantic-object-inverse">
                    +{remainingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {selectedImageIndex !== null && (
        <ImagesModal
          open
          images={review.imageUrls}
          initialIndex={selectedImageIndex}
          onOpenChange={(open) => {
            if (!open) setSelectedImageIndex(null);
          }}
        />
      )}
    </div>
  );
}
