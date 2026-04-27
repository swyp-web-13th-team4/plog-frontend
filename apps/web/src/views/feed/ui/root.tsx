'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRouter } from 'next/navigation';

import { Button, EmptyState, Spinner, useToast } from '@plog/ui';
import { type InfiniteData, useQueryClient } from '@tanstack/react-query';

import CopyLinkIcon from '@/shared/assets/icons/copy_link.svg';

import {
  FEED_QUERY_KEY,
  type FeedPage,
  useInfiniteFeedQuery,
} from '../model/query/useInfiniteScroll';
import FeedCard from './FeedCard';
import ScrollToTopButton from './ScrollToTopButton';

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
      <EmptyState
        title="아직 올라온 기록이 없어요"
        description="가장 먼저 기록을 남겨볼까요?"
        actions={
          <Button
            variant="outline"
            size="small"
            onClick={() => router.push('/log')}
          >
            기록하기
          </Button>
        }
      />
    );
  }

  return (
    <section className="relative">
      <div ref={topRef} aria-hidden="true" className="h-px w-full" />
      {posts.map((data, index) => (
        <FeedCard
          key={data.POST_INFO.id}
          post={data}
          isLast={index === posts.length - 1}
          onLike={(postId) => updatePostState(postId, 'isLiked')}
          onBookmark={(postId) => updatePostState(postId, 'isBookmarked')}
          onShare={() =>
            toast({
              icon: <CopyLinkIcon />,
              description: '링크가 복사되었습니다.',
            })
          }
        />
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
