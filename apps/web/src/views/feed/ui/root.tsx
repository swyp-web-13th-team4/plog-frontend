'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Image from 'next/image';

import { Avatar, Badge, Spinner, useToast } from '@plog/ui';
import { type InfiniteData, useQueryClient } from '@tanstack/react-query';

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

const DEFAULT_VISIBLE_TAG_COUNT = 3;

function TagBadgeGroup({ tags }: { tags: FeedTag[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTags = tags.slice(0, DEFAULT_VISIBLE_TAG_COUNT);
  const hiddenTags = tags.slice(DEFAULT_VISIBLE_TAG_COUNT);
  const hasHiddenTags = hiddenTags.length > 0;

  return (
    <div className="flex flex-wrap gap-2">
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

export default function FeedPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, fetchNextPage, isFetchingNextPage, isPending } =
    useInfiniteFeedQuery();
  const { ref, inView } = useInView();
  const posts = data?.pages.flatMap((page) => page.items) ?? [];

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

  if (isPending) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <Spinner size="large" />
      </section>
    );
  }

  return (
    <section>
      {posts.map((data) => (
        <div key={data.POST_INFO.id} className="mb-13.5">
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
                  <p className="body-sm text-semantic-object-normal">
                    {data.POST_INFO.content}
                  </p>
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
      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Spinner size="large" />
        </div>
      )}
      <div ref={ref} aria-hidden="true"></div>
    </section>
  );
}
