'use client';

import { useState } from 'react';

import { Avatar, Divider, Icon } from '@plog/ui';

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
            size={14}
            className={
              filled
                ? 'text-semantic-theme-amber-normal'
                : 'text-semantic-object-subtler'
            }
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
                  <span className="caption-md text-semantic-object-boldest">
                    {review.rating.toFixed(1)}
                  </span>
                  <Divider
                    orientation="vertical"
                    thickness="small"
                    className="2.5"
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
                      size={12}
                      className="text-semantic-object-subtle"
                    />
                    <span className="caption-md text-semantic-object-boldest">
                      {group.title}
                    </span>
                  </div>
                  <span className="caption-md text-semantic-object-bold">
                    {summary.label}
                  </span>
                </div>
              );
            })}
          </div>

          {review.content && (
            <p className="body-xs text-semantic-object-bold">
              {review.content}
            </p>
          )}
        </div>
        {hasImages && (
          <div className="grid grid-cols-3 gap-2">
            {images.slice(0, 3).map((image, index) => {
              const showMore = images.length >= 3 && index === 2;

              return (
                <button
                  key={`${review.memberKey}-${image}-${index}`}
                  type="button"
                  aria-label={`${review.nickname} 리뷰 이미지 ${index + 1} 보기`}
                  onClick={() => openImageModal(index)}
                  className="relative aspect-square min-w-0 cursor-pointer overflow-hidden rounded-xl bg-semantic-object-subtler"
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${review.nickname} 리뷰 이미지 ${index + 1}`}
                    fill
                    sizes="33vw"
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
      {hasImages && (
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
