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
  useToast,
} from '@plog/ui';

import { formatStudyDate, formatTimeAgo } from '@/views/feed/model/lib/time';
import {
  type FeedPost,
  type FeedTag,
  MOCK_FEED_DATA,
} from '@/views/feed/model/query/useInfiniteScroll';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';
import ClockIcon from '@/shared/assets/icons/clock.svg';
import ConcentrateIcon from '@/shared/assets/icons/concentrate.svg';
import CopyLinkIcon from '@/shared/assets/icons/copy_link.svg';
import EmptyBookmarkIcon from '@/shared/assets/icons/empty_bookmark.svg';
import EmptyHeartIcon from '@/shared/assets/icons/empty_heart.svg';
import FillBookmarkIcon from '@/shared/assets/icons/fill_bookmark.svg';
import FillHeartIcon from '@/shared/assets/icons/fill_heart.svg';
import LeftIcon from '@/shared/assets/icons/left_arrow.svg';
import RightIcon from '@/shared/assets/icons/right_arrow.svg';
import ShareIcon from '@/shared/assets/icons/share.svg';

const DEFAULT_VISIBLE_TAG_COUNT = 3;

type FeedCarouselController = {
  slidePrev: () => void;
  slideNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
};

function TagBadgeGroup({ tags }: { tags: FeedTag[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTags = tags.slice(0, DEFAULT_VISIBLE_TAG_COUNT);
  const hiddenTags = tags.slice(DEFAULT_VISIBLE_TAG_COUNT);
  const hasHiddenTags = hiddenTags.length > 0;

  return (
    <div className="flex gap-2">
      {visibleTags.map((tag) => (
        <Badge
          key={tag.id}
          color="gray"
          variant="soft"
          className="caption-md flex items-center text-semantic-object-normal"
        >
          {tag.name}
        </Badge>
      ))}
      {hasHiddenTags && (
        <div className="relative">
          <Badge
            color="gray"
            variant="outline"
            className="caption-md flex cursor-pointer items-center text-semantic-object-normal"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {`+${hiddenTags.length}`}
          </Badge>

          {isExpanded && (
            <div className="absolute left-0 z-10 mt-2 min-w-max rounded-lg border border-semantic-stroke-subtle bg-semantic-system-white p-2">
              <div className="flex flex-col gap-2">
                {hiddenTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    color="gray"
                    variant="soft"
                    className="caption-md flex items-center text-semantic-object-normal"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MaxContentLength({
  content,
  maxLength,
}: {
  content: string;
  maxLength: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (content.length <= maxLength) {
    return <p className="body-sm text-semantic-object-normal">{content}</p>;
  }

  return (
    <div className="flex justify-between gap-3">
      <p className="body-sm text-semantic-object-normal">
        {isExpanded ? content : `${content.slice(0, maxLength)}...`}
      </p>

      {!isExpanded ? (
        <button
          type="button"
          className="caption-md flex cursor-pointer items-center gap-2 text-semantic-object-subtle"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          더보기
          <ArrowIcon />
        </button>
      ) : null}
    </div>
  );
}

export default function FeedDetailCard({ postId }: { postId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const feed = MOCK_FEED_DATA.find((item) => item.POST_INFO.id === postId);
  const [post, setPost] = useState<FeedPost | null>(feed ?? null);
  const carouselRef = useRef<FeedCarouselController | null>(null);
  const [carouselState, setCarouselState] = useState({
    isBeginning: true,
    isEnd: feed ? feed.POST_INFO.image.length <= 1 : true,
  });

  const updatePostState = (field: 'isLiked' | 'isBookmarked') => {
    setPost((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        POST_INFO: {
          ...prev.POST_INFO,
          [field]: !prev.POST_INFO[field],
        },
      };
    });
  };

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

  const { POST_INFO } = post;
  const hasMultipleImages = POST_INFO.image.length > 1;

  return (
    <section className="relative">
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
                  loading="eager"
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
                  <LeftIcon />
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
                  <RightIcon />
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
                type="button"
                className="cursor-pointer"
                onClick={() => updatePostState('isLiked')}
              >
                {POST_INFO.isLiked ? <FillHeartIcon /> : <EmptyHeartIcon />}
              </button>
              <span className="caption-md text-semantic-object-normal">
                {POST_INFO.heartCount < 1000 ? POST_INFO.heartCount : '999+'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => updatePostState('isBookmarked')}
              >
                {POST_INFO.isBookmarked ? (
                  <FillBookmarkIcon />
                ) : (
                  <EmptyBookmarkIcon />
                )}
              </button>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() =>
                  toast({
                    icon: <CopyLinkIcon />,
                    description: '링크가 복사되었습니다.',
                  })
                }
              >
                <ShareIcon />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <span className="title-xs text-semantic-object-boldest">
                {POST_INFO.title}
              </span>
              <MaxContentLength content={POST_INFO.content} maxLength={35} />
            </div>

            <div className="flex justify-between rounded-xl border border-semantic-stroke-subtle p-6">
              <div className="flex flex-col gap-1.5">
                <span className="label-md text-semantic-object-bold">
                  {POST_INFO.PLACE_INFO.placeName}
                </span>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <ClockIcon />
                    <p className="caption-md text-semantic-object-normal">
                      {POST_INFO.PLACE_INFO.studyTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ConcentrateIcon />
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
    </section>
  );
}
