'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { Avatar, Carousel, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { BookmarkButton } from '@/features/toggle-bookmark';

import { type FeedPost, TagBadgeGroup } from '@/entities/feed';

import { formatStudyDate, formatTimeAgo } from '../lib/time';

type FeedCarouselController = {
  slidePrev: () => void;
  slideNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
};

type FeedCardProps = {
  post: FeedPost;
  isLast: boolean;
  onLike: (postId: string) => void;
  onShare: () => void;
};

function ClampedContent({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-between gap-3">
      <p
        className={cn(
          'body-sm text-semantic-object-normal',
          !isExpanded && 'line-clamp-1',
        )}
      >
        {content}
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="caption-md flex shrink-0 cursor-pointer items-center gap-2 text-semantic-object-subtle"
          onClick={() => setIsExpanded(true)}
        >
          더보기
          <Icon name="chevron-right" size={9} />
        </button>
      )}
    </div>
  );
}

export default function FeedCard({
  post,
  isLast,
  onLike,
  onShare,
}: FeedCardProps) {
  const { POST_INFO } = post;
  const carouselRef = useRef<FeedCarouselController | null>(null);
  const [carouselState, setCarouselState] = useState({
    isBeginning: true,
    isEnd: POST_INFO.image.length <= 1,
  });
  const hasMultipleImages = POST_INFO.image.length > 1;

  const updateCarouselEdgeState = (swiper: FeedCarouselController) => {
    setCarouselState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  return (
    <div className={isLast ? '' : 'mb-13.5'}>
      <div className="flex items-center gap-3 px-6 py-3">
        <Avatar
          size="xsmall"
          src={POST_INFO.USER_INFO.profileImage}
          alt={`${POST_INFO.USER_INFO.nickname}의 프로필 이미지`}
        />
        <div className="flex flex-col gap-1">
          <span className="label-lg text-semantic-object-boldest">
            {POST_INFO.USER_INFO.nickname}
          </span>
          <span className="caption-md text-semantic-object-normal">
            {formatTimeAgo(POST_INFO.createdAt)}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="group relative">
          <Carousel
            aria-label={`${POST_INFO.title} 이미지 캐러셀`}
            onSwiper={(swiper) => {
              carouselRef.current = swiper;
              updateCarouselEdgeState(swiper);
            }}
            onChange={() => {
              if (carouselRef.current) {
                updateCarouselEdgeState(carouselRef.current);
              }
            }}
          >
            {POST_INFO.image.map((imageSrc, index) => (
              <Carousel.Slide key={`${POST_INFO.id}-image-${index}`}>
                <Image
                  src={imageSrc}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  alt={`${POST_INFO.title} 이미지 ${index + 1}`}
                  width={480}
                  height={480}
                />
              </Carousel.Slide>
            ))}
          </Carousel>

          {hasMultipleImages && (
            <div className="pointer-events-none absolute inset-y-0 z-10 flex w-full items-center justify-between px-3 opacity-0 transition-opacity group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
              {!carouselState.isBeginning ? (
                <button
                  type="button"
                  aria-label="이전 이미지 보기"
                  className="pointer-events-auto flex size-11 cursor-pointer items-center justify-center rounded-full bg-semantic-system-black/40 transition-colors hover:bg-semantic-system-black/50 active:bg-semantic-system-black/60"
                  onClick={(event) => {
                    event.stopPropagation();
                    carouselRef.current?.slidePrev();
                  }}
                >
                  <Icon
                    name="chevron-left"
                    className="text-semantic-system-white"
                  />
                </button>
              ) : (
                <div aria-hidden="true" className="size-11" />
              )}
              {!carouselState.isEnd ? (
                <button
                  type="button"
                  aria-label="다음 이미지 보기"
                  className="pointer-events-auto flex size-11 cursor-pointer items-center justify-center rounded-full bg-semantic-system-black/40 transition-colors hover:bg-semantic-system-black/50 active:bg-semantic-system-black/60"
                  onClick={(event) => {
                    event.stopPropagation();
                    carouselRef.current?.slideNext();
                  }}
                >
                  <Icon
                    name="chevron-right"
                    className="text-semantic-system-white"
                  />
                </button>
              ) : (
                <div aria-hidden="true" className="size-11" />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2.5 px-6 pt-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-1.5">
              <button
                aria-label={POST_INFO.isLiked ? '좋아요 취소' : '좋아요'}
                aria-pressed={POST_INFO.isLiked}
                type="button"
                className="flex cursor-pointer items-center"
                onClick={() => onLike(POST_INFO.id)}
              >
                {POST_INFO.isLiked ? (
                  <Icon
                    name="heart-filled"
                    className="text-semantic-feedback-error-neutral"
                  />
                ) : (
                  <Icon name="heart" className="text-semantic-object-normal" />
                )}
              </button>
              <span className="caption-md text-semantic-object-normal">
                {POST_INFO.heartCount < 1000 ? POST_INFO.heartCount : '999+'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <BookmarkButton
                postId={POST_INFO.id}
                isBookmarked={POST_INFO.isBookmarked}
              />
              <button
                aria-label="공유하기"
                type="button"
                className="cursor-pointer"
                onClick={onShare}
              >
                <Icon name="share" className="text-semantic-object-normal" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <span className="title-xs text-semantic-object-boldest">
                {POST_INFO.title}
              </span>
              <ClampedContent content={POST_INFO.content} />
            </div>
            <div className="flex justify-between rounded-xl border border-semantic-stroke-subtle p-4">
              <div className="flex flex-col gap-1.5">
                <span className="label-md text-semantic-object-bold">
                  {POST_INFO.PLACE_INFO.placeName}
                </span>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name="clock"
                      size={16}
                      className="text-semantic-object-normal"
                    />
                    <p className="caption-md text-semantic-object-normal">
                      {POST_INFO.PLACE_INFO.studyTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name="fire"
                      size={16}
                      className="text-semantic-object-normal"
                    />
                    <p className="caption-md text-semantic-object-normal">
                      {POST_INFO.PLACE_INFO.concentrateCount}/5
                    </p>
                  </div>
                </div>
              </div>
              <span className="caption-md text-semantic-object-subtle">
                {formatStudyDate(POST_INFO.PLACE_INFO.studyDate)}
              </span>
            </div>
            <TagBadgeGroup tags={POST_INFO.tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
