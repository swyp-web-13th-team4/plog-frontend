'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Avatar, Badge, Button, Spinner, useToast } from '@plog/ui';
import { type InfiniteData, useQueryClient } from '@tanstack/react-query';

import ArrowIcon from '@/shared/assets/icons/arrow.svg';
import ClockIcon from '@/shared/assets/icons/clock.svg';
import ConcentrateIcon from '@/shared/assets/icons/concentrate.svg';
import CopyLinkIcon from '@/shared/assets/icons/copy_link.svg';
import EmptyBookmarkIcon from '@/shared/assets/icons/empty_bookmark.svg';
import EmptyHeartIcon from '@/shared/assets/icons/empty_heart.svg';
import FillBookmarkIcon from '@/shared/assets/icons/fill_bookmark.svg';
import FillHeartIcon from '@/shared/assets/icons/fill_heart.svg';
import ShareIcon from '@/shared/assets/icons/share.svg';

import {
  FEED_QUERY_KEY,
  type FeedPage,
  type FeedTag,
  useInfiniteFeedQuery,
} from '../model/query/useInfiniteScroll';
import ScrollToTopButton from './ScrollToTopButton';

const DEFAULT_VISIBLE_TAG_COUNT = 3;

function TagBadgeGroup({ tags }: { tags: FeedTag[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTags = tags.slice(0, DEFAULT_VISIBLE_TAG_COUNT);
  const hiddenTags = tags.slice(DEFAULT_VISIBLE_TAG_COUNT);
  const hasHiddenTags = hiddenTags.length > 0;

  return (
    <div className="flex gap-2">
      {visibleTags.map((tag) => (
        <Badge
          color="gray"
          variant="soft"
          className="caption-md flex items-center text-semantic-object-normal"
          key={tag.id}
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
                    color="gray"
                    variant="soft"
                    className="caption-md flex items-center text-semantic-object-normal"
                    key={tag.id}
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

export default function FeedPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetchNextPageError,
  } = useInfiniteFeedQuery();
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 200px 0px',
  });
  const { ref: topRef, inView: isTopAreaVisible } = useInView({
    threshold: 0,
  });
  const [canShowScrollToTopButton, setCanShowScrollToTopButton] =
    useState(false);
  const posts = data?.pages.flatMap((page) => page.items) ?? [];
  const router = useRouter();

  const updatePostState = (
    postId: string,
    field: 'isLiked' | 'isBookmarked',
  ) => {
    queryClient.setQueryData<InfiniteData<FeedPage>>(FEED_QUERY_KEY, (prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        pages: prev.pages.map((page) => ({
          ...page,
          items: page.items.map((post) =>
            post.POST_INFO.id === postId
              ? {
                  ...post,
                  POST_INFO: {
                    ...post.POST_INFO,
                    [field]: !post.POST_INFO[field],
                  },
                }
              : post,
          ),
        })),
      };
    });
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    const updateScrollableState = () => {
      setCanShowScrollToTopButton(
        document.documentElement.scrollHeight > window.innerHeight,
      );
    };

    updateScrollableState();
    window.addEventListener('resize', updateScrollableState);

    return () => {
      window.removeEventListener('resize', updateScrollableState);
    };
  }, [posts.length]);

  if (isPending) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <Spinner size="large" />
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center gap-3">
        <div className="flex flex-col gap-3">
          <span className="label-lg text-semantic-object-bold">
            아직 올라온 기록이 없어요
          </span>
          <p className="body-sm text-semantic-object-normal">
            가장 먼저 기록을 남겨볼까요?
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={() => router.push('/log')}
        >
          기록하기
        </Button>
      </section>
    );
  }

  return (
    <section className="relative">
      <div ref={topRef} aria-hidden="true" className="h-px w-full" />
      {posts.map((data, index) => (
        <div
          key={data.POST_INFO.id}
          className={`${index === posts.length - 1 ? '' : 'mb-13.5'}`}
        >
          <div className="flex items-center gap-3 px-6 py-3">
            <Avatar
              size="xsmall"
              src={data.POST_INFO.USER_INFO.profileImage}
              alt={`${data.POST_INFO.USER_INFO.nickname}의 프로필 이미지`}
            />
            <div className="flex flex-col gap-1">
              <span className="label-lg text-semantic-object-boldest">
                {data.POST_INFO.USER_INFO.nickname}
              </span>
              <span className="caption-md text-semantic-object-normal">
                {data.POST_INFO.createdAt}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <Image
              width={480}
              height={480}
              loading="eager"
              src={data.POST_INFO.image}
              alt={`${data.POST_INFO.title} 이미지`}
            />
            <div className="flex flex-col gap-2.5 px-6 pt-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      updatePostState(data.POST_INFO.id, 'isLiked')
                    }
                  >
                    {data.POST_INFO.isLiked ? (
                      <FillHeartIcon />
                    ) : (
                      <EmptyHeartIcon />
                    )}
                  </button>
                  <span className="caption-md text-semantic-object-normal">
                    {data.POST_INFO.heartCount < 1000
                      ? data.POST_INFO.heartCount
                      : '999+'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      updatePostState(data.POST_INFO.id, 'isBookmarked')
                    }
                  >
                    {data.POST_INFO.isBookmarked ? (
                      <FillBookmarkIcon />
                    ) : (
                      <EmptyBookmarkIcon />
                    )}
                  </button>
                  <button
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
                    {data.POST_INFO.title}
                  </span>
                  <MaxContentLength
                    content={data.POST_INFO.content}
                    maxLength={35}
                  />
                </div>
                <div className="flex justify-between rounded-xl border border-semantic-stroke-subtle p-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="label-md text-semantic-object-bold">
                      {data.POST_INFO.PLACE_INFO.placeName}
                    </span>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1.5">
                        <ClockIcon />
                        <p className="caption-md text-semantic-object-normal">
                          {data.POST_INFO.PLACE_INFO.studyTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ConcentrateIcon />
                        <p className="caption-md text-semantic-object-normal">
                          {data.POST_INFO.PLACE_INFO.concentrateCount}/5
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="caption-md text-semantic-object-subtle">
                    {data.POST_INFO.PLACE_INFO.studyDate}
                  </span>
                </div>
                <TagBadgeGroup tags={data.POST_INFO.tags} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {hasNextPage && (
        <div className="flex flex-col items-center justify-center gap-3 py-12">
          {isFetchingNextPage ? (
            <Spinner size="large" />
          ) : isFetchNextPageError ? (
            <>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="label-md text-semantic-object-bold">
                  데이터를 불러오지 못했습니다
                </p>
                <p className="body-sm text-semantic-object-subtle">
                  네트워크 연결 상태를 확인해 주세요.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="small"
                onClick={() => fetchNextPage()}
              >
                다시 시도
              </Button>
            </>
          ) : (
            <div ref={ref} aria-hidden="true" />
          )}
        </div>
      )}
      <div ref={ref} aria-hidden="true"></div>
      {!hasNextPage && posts.length > 0 && (
        <p className="body-sm py-12 text-center text-semantic-object-subtle">
          마지막 기록까지 확인했어요
        </p>
      )}
      <ScrollToTopButton
        visible={canShowScrollToTopButton && !isTopAreaVisible}
      />
    </section>
  );
}
