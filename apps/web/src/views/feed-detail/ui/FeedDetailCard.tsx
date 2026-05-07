'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Avatar,
  Badge,
  Button,
  Carousel,
  EmptyState,
  Icon,
  useToast,
} from '@plog/ui';

import { CopyLinkButton } from '@/features/copy-link';
import { BookmarkButton } from '@/features/toggle-bookmark';
import { LikeButton } from '@/features/toggle-like';

import { FeedPost, FeedStatsSummary, TagBadgeGroup } from '@/entities/feed';
import { formatStudyDate, formatTimeAgo } from '@/entities/feed';
import { MOCK_FEED_DATA } from '@/entities/feed/model/mock-data';

type FeedCarouselController = {
  slidePrev: () => void;
  slideNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
};

export default function FeedDetailCard({ postId }: { postId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const feed = MOCK_FEED_DATA.find((item) => item.postId === Number(postId));
  const [post, setPost] = useState<FeedPost | null>(feed ?? null);
  const carouselRef = useRef<FeedCarouselController | null>(null);
  const [carouselState, setCarouselState] = useState({
    isBeginning: true,
    isEnd: feed ? feed.postImages.length <= 1 : true,
  });

  const updateCarouselEdgeState = (swiper: FeedCarouselController) => {
    setCarouselState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <EmptyState
          title="피드를 찾을 수 없어요"
          description="목록으로 돌아가서 다른 기록을 확인해 보세요."
          actions={
            <Button
              variant="outline"
              size="small"
              onClick={() => router.push('/feed')}
            >
              피드로 돌아가기
            </Button>
          }
        />
      </div>
    );
  }

  const hasMultipleImages = post.postImages.length > 1;
  const isMyPost = post.name === '승민';

  return (
    <section className="relative">
      <div className="flex items-center gap-3 px-6 py-3">
        <Avatar
          size="xsmall"
          src={post.profileImage}
          alt={`${post.name}의 프로필 이미지`}
        />
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
                  loading="eager"
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
          {!isMyPost && (
            <div className="flex justify-between">
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
                <CopyLinkButton />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="title-xs text-semantic-object-boldest">
                  {post.placeName}
                </span>
                {post.placeCategory && (
                  <Badge color="skyblue" variant="soft">
                    {post.placeCategory}
                  </Badge>
                )}
              </div>
              {isMyPost && (
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() =>
                    toast({
                      icon: <Icon name="link" />,
                      description: '링크가 복사되었습니다.',
                    })
                  }
                >
                  <Icon name="share" className="text-semantic-object-normal" />
                </button>
              )}
            </div>
          </div>
          <FeedStatsSummary
            isUserOwnFeed={isMyPost}
            primaryLabel="좋아요"
            primaryValue={post.likes}
            totalWorkTime={post.studyTime}
            focusLevel={post.focus}
          />
          <TagBadgeGroup tags={post.tags} />
        </div>
        <div className="mt-7 flex flex-col border-t border-semantic-object-subtler px-6 py-7">
          <div className="flex items-center justify-between">
            <span className="title-xs text-semantic-object-boldest">
              {post.title}
            </span>
            <p className="caption-md text-semantic-object-subtle">
              {formatStudyDate(post.createAt)}
            </p>
          </div>
          <span className="body-sm text-semantic-object-normal">
            {post.contents}
          </span>
        </div>
      </div>
    </section>
  );
}
