'use client';

import { useState } from 'react';

import { Avatar, Divider, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { REVIEW_ENVIRONMENT_GROUP_MAP } from '@/entities/review';

import { ImageWithFallback } from '@/shared/ui';

import { type UserReviewInfo } from '../model/types';
import ImagesModal from './ImagesModal';

type ReviewItemProps = {
  review: UserReviewInfo;
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`별점 ${rating}점`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < rating;

        return (
          <Icon
            key={index}
            name="star-filled"
            boxed={false}
            className={cn(
              'h-4 w-4 mobile:h-3.5 mobile:w-3.5',
              filled
                ? 'text-semantic-theme-amber-normal'
                : 'text-semantic-object-subtler',
            )}
          />
        );
      })}
    </div>
  );
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const images = review.images ?? [];
  const hasImages = images.length > 0;
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-semantic-stroke-subtle py-6 last:border-b-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <Avatar
              size="xsmall"
              src={review.profileImageUrl}
              alt={`${review.nickname} 프로필`}
            />
            <div className="flex flex-col gap-2">
              <p className="label-md text-semantic-object-boldest">
                {review.nickname}
              </p>
              <div className="flex gap-1">
                <RatingStars rating={review.rating} />
                <div className="flex gap-1">
                  <span className="label-md text-semantic-object-boldest mobile:text-semantic-caption-md mobile:leading-semantic-caption-md mobile:font-semantic-caption-md">
                    {review.rating.toFixed(1)}
                  </span>
                  <Divider
                    orientation="vertical"
                    thickness="small"
                    className="h-2.5"
                  />
                  <span className="caption-md shrink-0 text-semantic-object-normal">
                    {review.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-row-2 grid grid-cols-2 gap-4 rounded-xl border border-semantic-stroke-subtle bg-primitive-gray-20 p-4">
            {review.environmentSummaries.map((summary) => {
              const group = REVIEW_ENVIRONMENT_GROUP_MAP[summary.type];

              return (
                <div
                  key={summary.type}
                  className="flex items-center justify-start gap-1.5"
                >
                  <div className="flex items-center gap-1">
                    <Icon
                      name={group.iconName}
                      boxed={false}
                      className="h-3.5 w-3.5 text-semantic-object-subtle mobile:h-3 mobile:w-3"
                    />
                    <span className="label-sm text-semantic-object-boldest mobile:text-semantic-caption-sm mobile:leading-semantic-caption-sm mobile:font-semantic-caption-sm">
                      {group.title}
                    </span>
                  </div>
                  <span className="label-sm text-semantic-object-bold mobile:text-semantic-caption-sm mobile:leading-semantic-caption-sm mobile:font-semantic-caption-sm">
                    {summary.label}
                  </span>
                </div>
              );
            })}
          </div>

          {review.content && (
            <p className="body-sm text-semantic-object-bold mobile:text-semantic-body-xs mobile:leading-semantic-body-xs mobile:font-semantic-body-xs">
              {review.content}
            </p>
          )}
        </div>
        {hasImages && (
          <div className="flex gap-2">
            {images.slice(0, 3).map((image, index) => {
              const showMore = images.length > 3 && index === 2;

              return (
                <button
                  key={`${review.memberKey}-${image}-${index}`}
                  type="button"
                  aria-label={`${review.nickname} 리뷰 이미지 ${index + 1} 보기`}
                  onClick={() => openImageModal(index)}
                  className="relative size-20 min-w-0 cursor-pointer overflow-hidden rounded-xl bg-semantic-object-subtler"
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${review.nickname} 리뷰 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {showMore && (
                    <span className="label-lg absolute inset-0 flex items-center justify-center bg-semantic-system-black/45 text-semantic-object-inverse">
                      더보기
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {hasImages && imageModalOpen && (
        <ImagesModal
          open={imageModalOpen}
          images={images}
          initialIndex={selectedImageIndex}
          onOpenChange={setImageModalOpen}
        />
      )}
    </>
  );
}
