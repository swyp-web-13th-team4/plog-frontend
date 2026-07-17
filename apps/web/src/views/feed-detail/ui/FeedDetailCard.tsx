'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Avatar, Badge, Carousel, Dropdown, Icon, Spinner } from '@plog/ui';

import { ShareButton } from '@/features/share-post';
import { BookmarkButton } from '@/features/toggle-bookmark';
import { LikeButton } from '@/features/toggle-like';

import {
  ExpandablePlaceTags,
  type FeedDetailItem,
  FeedStatsSummary,
  formatDate,
  formatTimeAgo,
  PrivacySettingSection,
  useFeedDetailQuery,
} from '@/entities/feed';

import { dialog } from '@/shared/lib/dialog';
import { FetchErrorEmptyState } from '@/shared/ui';

import { useDeletePostMutation } from '../model/use-delete-post-mutation';

type FeedCarouselController = {
  slidePrev: () => void;
  slideNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
};

const AUTHOR_ACTION_OPTIONS = [
  { label: '삭제하기', value: 'delete' },
  { label: '수정하기', value: 'edit' },
];

type CarouselNavButtonProps = {
  label: string;
  icon: 'chevron-left' | 'chevron-right';
  onNavigate: () => void;
};

function CarouselNavButton({
  label,
  icon,
  onNavigate,
}: CarouselNavButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="pointer-events-auto flex size-11 cursor-pointer items-center justify-center rounded-full bg-semantic-system-black/40 transition-colors hover:bg-semantic-system-black/50 active:bg-semantic-system-black/60"
      onClick={(event) => {
        event.stopPropagation();
        onNavigate();
      }}
    >
      <Icon name={icon} className="text-semantic-object-inverse" />
    </button>
  );
}

type FeedDetailCardProps = {
  postId: string;
  initialPost?: FeedDetailItem;
};

export default function FeedDetailCard({
  postId,
  initialPost,
}: FeedDetailCardProps) {
  const [carouselState, setCarouselState] = useState({
    isBeginning: true,
    isEnd: true,
  });

  const carouselRef = useRef<FeedCarouselController | null>(null);

  const router = useRouter();
  const numericPostId = Number(postId);

  const {
    data: post,
    isError,
    isPending,
    isPrivateAccessError,
    refetch,
  } = useFeedDetailQuery(numericPostId, initialPost);

  const deletePostMutation = useDeletePostMutation();
  const privateAccessHandledRef = useRef(false);

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

  useEffect(() => {
    if (!isPrivateAccessError || privateAccessHandledRef.current) return;

    privateAccessHandledRef.current = true;

    const redirectPrivatePostAccess = async () => {
      await dialog.alert('비공개 게시글입니다.');
      router.replace('/');
    };

    void redirectPrivatePostAccess();
  }, [isPrivateAccessError, router]);

  if (isPending) {
    return (
      <section className="flex min-h-screen items-center justify-center pt-[var(--spacing-header)]">
        <Spinner size="large" />
      </section>
    );
  }

  if (isPrivateAccessError) {
    return null;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-[var(--spacing-header)]">
        <FetchErrorEmptyState onRetry={() => refetch()} />
      </div>
    );
  }

  const hasMultipleImages = post.postImages.length > 1;
  const isMyPost = post.isAuthor ?? false;
  const isProfileClickable = Boolean(post.memberKey) && !isMyPost;
  const isPrivate = post.scope === 'PRIVATE';

  const handleProfileClick = () => {
    if (!post.memberKey) return;
    router.push(`/feed/users/${encodeURIComponent(post.memberKey)}`);
  };

  return (
    <section className="relative pt-[var(--spacing-header)]">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
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
        {isMyPost && (
          <Dropdown
            aria-label="게시글 관리 메뉴"
            items={AUTHOR_ACTION_OPTIONS}
            trigger={
              <Icon
                name="more-vertical"
                className="text-semantic-object-normal"
              />
            }
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
                <CarouselNavButton
                  label="이전 이미지 보기"
                  icon="chevron-left"
                  onNavigate={() => carouselRef.current?.slidePrev()}
                />
              ) : (
                <div aria-hidden="true" className="size-11" />
              )}
              {!carouselState.isEnd ? (
                <CarouselNavButton
                  label="다음 이미지 보기"
                  icon="chevron-right"
                  onNavigate={() => carouselRef.current?.slideNext()}
                />
              ) : (
                <div aria-hidden="true" className="size-11" />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2.5 px-6 pt-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-1.5">
              <LikeButton
                postId={post.postId}
                isLiked={post.like}
                disableTracking={isMyPost}
              />
              <span className="caption-md text-semantic-object-normal">
                {post.likes < 1000 ? post.likes : '999+'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <BookmarkButton
                postId={post.postId}
                isBookmarked={post.bookMark}
                disableTracking={isMyPost}
              />
              <ShareButton
                postId={post.postId}
                title={post.title}
                text={post.contents}
                isOwner={isMyPost}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Badge variant="soft" color="orange">
                {post.category}
              </Badge>
            </div>
            <div className="flex flex-col gap-1">
              <span className="title-xs text-semantic-object-boldest">
                {post.placeName}
              </span>
              <p className="body-sm text-semantic-object-normal">
                {post.address}
              </p>
            </div>
          </div>
          <FeedStatsSummary
            isUserOwnFeed={isMyPost}
            primaryLabel="좋아요"
            primaryValue={post.likes}
            totalWorkTime={post.studyTime}
            focusLevel={post.focus}
          />
          <ExpandablePlaceTags tags={post.tags} />
        </div>
        <div className="mt-7 flex flex-col border-t border-semantic-object-subtler px-6 py-7">
          <span className="title-xs mb-1 text-semantic-object-boldest">
            {post.title}
          </span>
          <p className="body-sm mb-3 text-semantic-object-normal">
            {post.contents}
          </p>
          <span className="caption-md self-end text-semantic-object-subtle">
            {formatDate(post.createAt)}
          </span>
        </div>
      </div>
      {isPrivate && (
        <div className="px-6 pb-bottom-tab">
          <PrivacySettingSection scope="PRIVATE" />
        </div>
      )}
    </section>
  );
}
