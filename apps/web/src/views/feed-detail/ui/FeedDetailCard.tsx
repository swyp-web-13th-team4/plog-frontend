'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Avatar,
  Badge,
  Button,
  Carousel,
  EmptyState,
  Icon,
  Spinner,
} from '@plog/ui';

import { CopyLinkButton } from '@/features/copy-link';
import { BookmarkButton } from '@/features/toggle-bookmark';
import { LikeButton } from '@/features/toggle-like';

import { FeedStatsSummary, TagBadgeGroup } from '@/entities/feed';
import { formatStudyDate, formatTimeAgo } from '@/entities/feed';

import { dialog } from '@/shared/lib/dialog';

import { useDeletePostMutation } from '../model/use-delete-post-mutation';
import { useFeedDetailQuery } from '../model/use-feed-detail-query';

type FeedCarouselController = {
  slidePrev: () => void;
  slideNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
};

type DropdownOption = { label: string; value: string };

// TODO: Dropdown 디자인 시스템 컴포넌트로 분리
function Dropdown({
  options,
  onSelect,
  disabled,
}: {
  options: DropdownOption[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="게시글 관리 메뉴"
        aria-expanded={open}
        aria-haspopup="menu"
        disabled={disabled}
        className="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-semantic-bg-deep disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Icon name="more-vertical" className="text-semantic-object-normal" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 overflow-hidden rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white p-1.5"
        >
          <ul className="flex flex-col gap-2">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="menuitem"
                  className="label-sm flex min-h-[30px] w-23 cursor-pointer items-center rounded-md px-1.5 py-1 transition-colors hover:bg-semantic-bg-deep hover:text-semantic-object-bold"
                  onClick={() => {
                    setOpen(false);
                    onSelect(option.value);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const AUTHOR_ACTION_OPTIONS = [
  { label: '삭제하기', value: 'delete' },
  { label: '수정하기', value: 'edit' },
];

export default function FeedDetailCard({ postId }: { postId: string }) {
  const router = useRouter();
  const numericPostId = Number(postId);
  const isValidPostId = Number.isInteger(numericPostId) && numericPostId > 0;
  const {
    data: post,
    isError,
    isPending,
    refetch,
  } = useFeedDetailQuery(numericPostId);
  const carouselRef = useRef<FeedCarouselController | null>(null);
  const [carouselState, setCarouselState] = useState({
    isBeginning: true,
    isEnd: true,
  });
  const deletePostMutation = useDeletePostMutation();

  const updateCarouselEdgeState = (swiper: FeedCarouselController) => {
    setCarouselState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  const handleAuthorAction = async (value: unknown) => {
    if (value === 'delete') {
      const confirmed = await dialog.confirm({
        message: '기록을 삭제하시겠습니까?',
        description: '삭제한 게시글은 복구할 수 없습니다.',
        confirmLabel: '확인',
        cancelLabel: '취소',
      });

      if (confirmed) deletePostMutation.mutate(numericPostId);
      return;
    }

    if (value === 'edit') {
      router.push(`/log?postId=${numericPostId}`);
    }
  };

  if (!isValidPostId) {
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

  if (isPending) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <Spinner size="large" />
      </section>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <EmptyState
          title="피드를 불러오지 못했어요"
          description="네트워크 연결 상태를 확인한 뒤 다시 시도해 주세요."
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="small" onClick={() => refetch()}>
                다시 시도
              </Button>
              <Button
                variant="outline"
                size="small"
                onClick={() => router.push('/feed')}
              >
                피드로 돌아가기
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  const hasMultipleImages = post.postImages.length > 1;
  const isMyPost = post.isAuthor;

  return (
    <section className="relative">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
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
        {isMyPost && (
          <Dropdown
            options={AUTHOR_ACTION_OPTIONS}
            disabled={deletePostMutation.isPending}
            onSelect={handleAuthorAction}
          />
        )}
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
                  unoptimized
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
                <CopyLinkButton postId={post.postId} />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="title-xs text-semantic-object-boldest">
                  {post.placeName}
                </span>
                {post.category && (
                  <Badge color="skyblue" variant="soft">
                    {post.category}
                  </Badge>
                )}
              </div>
              {isMyPost && <CopyLinkButton postId={post.postId} />}
            </div>
            <p className="body-sm text-semantic-object-normal">
              {post.address}
            </p>
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
