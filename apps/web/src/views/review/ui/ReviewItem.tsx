'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Avatar, Dropdown, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  isReviewEditable,
  PlaceReviewListItem,
  REVIEW_ENVIRONMENT_GROUPS,
  REVIEW_ENVIRONMENT_LABELS,
} from '@/entities/review';

import { formatDate } from '@/shared/lib/datetime';
import { dialog } from '@/shared/lib/dialog';
import { ImageWithFallback } from '@/shared/ui';

import { useDeleteReviewMutation } from '../model/use-delete-review-mutation';
import ImagesModal from './ImagesModal';

const EDITABLE_ACTION_OPTIONS = [
  { label: '삭제하기', value: 'delete' },
  { label: '수정하기', value: 'edit' },
];

const DELETE_ONLY_ACTION_OPTIONS = [{ label: '삭제하기', value: 'delete' }];

const MAX_VISIBLE_IMAGES = 3;

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`별점 ${rating}점`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          name="star-filled"
          boxed={false}
          className={cn(
            'size-3.5',
            index < rating
              ? 'text-semantic-theme-amber-neutral'
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
    ? EDITABLE_ACTION_OPTIONS
    : DELETE_ONLY_ACTION_OPTIONS;
  const visibleImages = review.imageUrls.slice(0, MAX_VISIBLE_IMAGES);
  const hiddenImageCount = review.imageUrls.length - visibleImages.length;

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
    <div className="flex flex-col gap-4 border-b border-semantic-stroke-subtle py-6 first:pt-0 last:border-b-0">
      <div className="flex flex-col gap-3">
        <div className="relative flex items-center gap-2.5">
          <Avatar
            size="xsmall"
            src={review.profileImageUrl}
            alt={`${review.nickname} 프로필`}
          />

          <div className="flex flex-1 flex-col gap-1 pr-8">
            <p className="label-md text-semantic-object-boldest">
              {review.nickname}
            </p>

            <div className="flex items-center gap-2">
              <RatingStars rating={review.rating} />
              <span className="caption-md mt-[1px] text-semantic-object-normal">
                {formatDate(review.createdAt, 'dot') ?? review.createdAt}
              </span>
            </div>
          </div>

          {review.isAuthor && (
            <div className="absolute top-0 right-0">
              <Dropdown
                aria-label="리뷰 관리 메뉴"
                items={authorActionOptions}
                trigger={
                  <Icon
                    name="more-vertical"
                    className="text-semantic-object-normal"
                    size={20}
                  />
                }
                disabled={deleteReviewMutation.isPending}
                onSelect={handleAuthorAction}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl border border-semantic-stroke-subtle bg-primitive-gray-20 p-4">
          {REVIEW_ENVIRONMENT_GROUPS.map(({ name, iconName }) => {
            const environment = review.environments.find(
              ({ environmentName }) => environmentName === name,
            );

            if (!environment) return null;

            return (
              <div key={name} className="flex items-center gap-2.5">
                <Icon
                  name={iconName}
                  boxed={false}
                  className="size-3.5 text-semantic-object-subtle"
                />
                <span className="label-sm text-semantic-object-bold">
                  {REVIEW_ENVIRONMENT_LABELS[name][environment.score]}
                </span>
              </div>
            );
          })}
        </div>

        {review.content && (
          <p className="body-sm text-semantic-object-bold">{review.content}</p>
        )}
      </div>

      {visibleImages.length > 0 && (
        <div className="flex gap-2">
          {visibleImages.map((imageUrl, index) => {
            const showHiddenImageCount =
              hiddenImageCount > 0 && index === visibleImages.length - 1;

            return (
              <button
                type="button"
                key={`${review.reviewId}-${imageUrl}-${index}`}
                aria-label={`${review.nickname} 리뷰 이미지 ${index + 1} 크게 보기`}
                onClick={() => setSelectedImageIndex(index)}
                className="relative size-25 cursor-pointer overflow-hidden rounded-xl bg-semantic-object-subtler"
              >
                <ImageWithFallback
                  src={imageUrl}
                  alt={`${review.nickname} 리뷰 이미지 ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
                {showHiddenImageCount && (
                  <span className="label-lg absolute inset-0 flex items-center justify-center bg-semantic-system-black/45 text-semantic-object-inverse">
                    +{hiddenImageCount}
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
