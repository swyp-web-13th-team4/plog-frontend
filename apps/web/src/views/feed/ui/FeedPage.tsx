'use client';

import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRouter } from 'next/navigation';

import { Button, Icon, Spinner, useToast } from '@plog/ui';

import { useScrollToTop } from '@/shared/lib/scroll-to-top';
import {
  FetchErrorEmptyState,
  RecordEmptyState,
  ScrollToTopButton,
} from '@/shared/ui';

import { useInfiniteFeedQuery } from '../model/use-infinite-feed-query';
import FeedCard from './FeedCard';

export default function FeedPage() {
  const { topRef, visible: scrollToTopVisible } = useScrollToTop();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
    isFetchNextPageError,
    refetch,
  } = useInfiniteFeedQuery();

  const { ref, inView } = useInView({
    rootMargin: '0px 0px 200px 0px',
  });

  const { toast } = useToast();

  const router = useRouter();

  const posts = useMemo(() => {
    const seenPostIds = new Set<number>();

    return (
      data?.pages
        .flatMap((page) => page.items)
        .filter((post) => {
          if (seenPostIds.has(post.postId)) return false;
          seenPostIds.add(post.postId);
          return true;
        }) ?? []
    );
  }, [data?.pages]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <Spinner size="large" />
      </section>
    );
  }

  if (isError && posts.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <FetchErrorEmptyState
          description="네트워크 연결 상태를 확인한 뒤 다시 시도해 주세요."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <RecordEmptyState
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
      </div>
    );
  }

  return (
    <section className="relative">
      <div ref={topRef} aria-hidden="true" className="h-px w-full" />
      {posts.map((data, index) => (
        <FeedCard
          key={data.postId}
          post={data}
          isLast={index === posts.length - 1}
          onShare={() =>
            toast({
              icon: <Icon name="link" />,
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
      <ScrollToTopButton visible={scrollToTopVisible} />
    </section>
  );
}
