'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, Carousel, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { CopyLinkButton } from '@/features/copy-link';
import { BookmarkButton } from '@/features/toggle-bookmark';
import { LikeButton } from '@/features/toggle-like';

import {
  type FeedPost,
  formatStudyDuration,
  formatTimeAgo,
  TagBadgeGroup,
} from '@/entities/feed';

type FeedCarouselController = {
  slidePrev: () => void;
  slideNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
};

type FeedCardProps = {
  post: FeedPost;
  isLast: boolean;
};

function ClampedContent({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (isExpanded) return;
    const el = textRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [content, isExpanded]);

  return (
    <div className="flex justify-between gap-3">
      <p
        ref={textRef}
        className={cn(
          'body-sm text-semantic-object-normal',
          !isExpanded && 'line-clamp-1',
        )}
      >
        {content}
      </p>
      {!isExpanded && isClamped && (
        <button
          type="button"
          className="caption-md flex shrink-0 cursor-pointer items-center gap-0.5 text-semantic-object-subtle"
          onClick={() => setIsExpanded(true)}
        >
          더보기
          <Icon name="chevron-right" size={16} />
        </button>
      )}
    </div>
  );
}

export default function FeedCard({ post, isLast }: FeedCardProps) {
  const carouselRef = useRef<FeedCarouselController | null>(null);
  const [carouselState, setCarouselState] = useState({
    isBeginning: true,
    isEnd: post.postImages.length <= 1,
  });
  const router = useRouter();

  const hasMultipleImages = post.postImages.length > 1;
  const isProfileClickable = Boolean(post.memberKey) && !post.isAuthor;

  const updateCarouselEdgeState = (swiper: FeedCarouselController) => {
    setCarouselState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  const handleProfileClick = () => {
    if (!post.memberKey) return;
    if (post.isAuthor) return;
    router.push(`/feed/users/${encodeURIComponent(post.memberKey)}`);
  };

  return (
    <div className={isLast ? '' : 'mb-13.5'}>
      <div className="flex items-center gap-3 px-6 py-3">
        {isProfileClickable ? (
          <button
            type="button"
            aria-label={`${post.name} 프로필 보기`}
            onClick={handleProfileClick}
            className="flex cursor-pointer items-center justify-center rounded-full"
          >
            <Avatar
              size="xsmall"
              src={post.profileImage}
              alt={`${post.name}의 프로필 이미지`}
            />
          </button>
        ) : (
          <Avatar
            size="xsmall"
            src={post.profileImage}
            alt={`${post.name}의 프로필 이미지`}
          />
        )}
        <div className="flex flex-col gap-1">
          <span className="label-lg text-semantic-object-boldest">
            {post.name}
          </span>
          <span className="caption-md text-semantic-object-normal">
            {formatTimeAgo(post.createAt)}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="group relative">
          <Carousel
            aria-label={`${post.title} 이미지 캐러셀`}
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
            {post.postImages.map((imageSrc, index) => (
              <Carousel.Slide key={`${post.postId}-image-${index}`}>
                <Image
                  src={imageSrc}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  alt={`${post.title} 이미지 ${index + 1}`}
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
                    className="text-semantic-object-inverse"
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
                    className="text-semantic-object-inverse"
                  />
                </button>
              ) : (
                <div aria-hidden="true" className="size-11" />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2.5 px-6 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <LikeButton postId={post.postId} isLiked={post.like} />
              <span className="caption-md text-semantic-object-normal">
                {post.likes < 1000 ? post.likes : '999+'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <BookmarkButton
                postId={post.postId}
                isBookmarked={post.bookMark}
              />
              <CopyLinkButton postId={post.postId} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="title-xs mb-1 text-semantic-object-boldest">
                {post.title}
              </div>
              <ClampedContent content={post.contents} />
            </div>
            <Link
              className="flex cursor-pointer justify-between rounded-xl border border-semantic-stroke-subtle p-4"
              href={`/feed/${post.postId}`}
            >
              <div className="flex flex-col gap-1.5">
                <span className="label-md text-semantic-object-bold">
                  {post.placeName}
                </span>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name="clock"
                      size={16}
                      className="text-semantic-object-normal"
                    />
                    <p className="caption-md text-semantic-object-normal">
                      {formatStudyDuration(post.studyTime)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name="fire"
                      size={16}
                      className="text-semantic-object-normal"
                    />
                    <p className="caption-md text-semantic-object-normal">
                      {post.focus}/5
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <TagBadgeGroup tags={post.tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
