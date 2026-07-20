'use client';

import { Avatar, Divider, Dropdown, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  type ReviewEnvironmentIconName,
  type ReviewEnvironmentName,
} from '@/entities/review';

import { ImageWithFallback } from '@/shared/ui';

const AUTHOR_ACTION_OPTIONS = [
  { label: '삭제하기', value: 'delete' },
  { label: '수정하기', value: 'edit' },
];

type ReviewEnvironmentItem = {
  environmentName: ReviewEnvironmentName;
  title: string;
  iconName: ReviewEnvironmentIconName;
  label: string;
};

export type ReviewItemData = {
  reviewId: number;
  nickname: string;
  profileImageUrl?: string;
  isAuthor: boolean;
  rating: number;
  createdAt: string;
  environments: ReviewEnvironmentItem[];
  content: string | null;
  imageUrls: string[];
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`별점 ${rating}점`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          name="star-filled"
          boxed={false}
          className={cn(
            'size-4 mobile:size-3.5',
            index < rating
              ? 'text-semantic-theme-amber-normal'
              : 'text-semantic-object-subtler',
          )}
        />
      ))}
    </div>
  );
}

export default function ReviewItem({ review }: { review: ReviewItemData }) {
  const visibleImages = review.imageUrls.slice(0, 3);

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
              <p className="label-lg text-semantic-object-boldest mobile:text-semantic-label-md mobile:leading-semantic-label-md mobile:font-semantic-label-md">
                {review.nickname}
              </p>

              {review.isAuthor && (
                <Dropdown
                  aria-label="리뷰 관리 메뉴"
                  items={AUTHOR_ACTION_OPTIONS}
                  trigger={
                    <Icon
                      name="more-vertical"
                      className="text-semantic-object-normal"
                    />
                  }
                  onSelect={() => {}}
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <RatingStars rating={review.rating} />
              <span className="label-md text-semantic-object-boldest mobile:text-semantic-caption-md mobile:leading-semantic-caption-md mobile:font-semantic-caption-md">
                {review.rating.toFixed(1)}
              </span>
              <Divider orientation="vertical" className="h-2.5" />
              <span className="caption-md text-semantic-object-normal">
                {review.createdAt}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl border border-semantic-stroke-subtle bg-primitive-gray-20 px-6 py-5 mobile:gap-4 mobile:p-4">
          {review.environments.map((environment) => (
            <div
              key={environment.environmentName}
              className="flex items-center gap-2.5 mobile:gap-1.5"
            >
              <div className="flex items-center gap-1">
                <Icon
                  name={environment.iconName}
                  boxed={false}
                  className="size-3.5 text-semantic-object-subtle mobile:size-3"
                />
                <span className="label-sm mobile:leading-semantic-caption-sm mobile:font-semantic-caption-sm text-semantic-object-boldest mobile:text-primitive-11">
                  {environment.title}
                </span>
              </div>
              <span className="label-sm mobile:leading-semantic-caption-sm mobile:font-semantic-caption-sm text-semantic-object-bold mobile:text-primitive-11">
                {environment.label}
              </span>
            </div>
          ))}
        </div>

        {review.content && (
          <p className="body-sm whitespace-pre-wrap text-semantic-object-bold mobile:text-semantic-body-xs mobile:leading-semantic-body-xs mobile:font-semantic-body-xs">
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
              <div
                key={`${review.reviewId}-${imageUrl}-${index}`}
                className="relative size-20 overflow-hidden rounded-xl bg-semantic-object-subtler"
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
