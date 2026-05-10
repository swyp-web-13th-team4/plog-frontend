'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Spinner } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  FeedList,
  type FeedViewType,
  type RecordTypeValue,
} from '@/widgets/feed-list';

import { BookmarkButton } from '@/features/toggle-bookmark';

import { type FeedPost, type PostSortType } from '@/entities/feed';

import { useScrollToTop } from '@/shared/lib/scroll-to-top';
import {
  FetchErrorEmptyState,
  RecordEmptyState,
  ScrollToTopButton,
} from '@/shared/ui';

import { useFeedProfilePostsQuery } from '../model/use-feed-profile-posts-query';

const SORT_ITEMS: { value: PostSortType; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'focus', label: '집중도순' },
  { value: 'studyTime', label: '작업시간순' },
];

export default function UserFeedSection({ userId }: { userId: string }) {
  const router = useRouter();

  const { topRef, visible: scrollToTopVisible } = useScrollToTop();
  const [sort, setSort] = useState<PostSortType>('latest');

  const {
    data: feeds = [],
    isPending,
    isError,
    refetch,
  } = useFeedProfilePostsQuery(userId, sort);

  const handleFeedClick = (feed: FeedPost) => {
    router.push(
      `/feed/${feed.postId}?backTo=${encodeURIComponent(`/feed/users/${userId}`)}`,
    );
  };

  if (isError) {
    return (
      <section className="flex flex-1 items-center justify-center pt-3">
        <FetchErrorEmptyState onRetry={refetch} />
      </section>
    );
  }

  return (
    <section className="pt-3">
      <div ref={topRef} aria-hidden="true" className="h-px w-full" />
      <FeedList
        feeds={feeds}
        sort={sort}
        onSortChange={(value: RecordTypeValue) =>
          setSort(value as PostSortType)
        }
        sortItems={SORT_ITEMS}
        onFeedClick={handleFeedClick}
        toolbarConfig={{ viewToggle: true }}
        emptyView={
          <div className="flex flex-1 items-center justify-center">
            {isPending ? (
              <Spinner size="large" />
            ) : (
              <RecordEmptyState
                title="일치하는 정보가 없어요"
                description="다른 정렬 기준을 선택해 보세요."
              />
            )}
          </div>
        }
        renderAction={(feed, viewType: FeedViewType) => {
          const isBookmarked = feed.bookMark;
          return (
            <BookmarkButton
              postId={feed.postId}
              isBookmarked={isBookmarked}
              profilePostsTarget={{ memberKey: userId, sort }}
              className={cn(
                viewType === 'grid' &&
                  (isBookmarked
                    ? 'text-semantic-accent-normal'
                    : 'text-semantic-object-subtle'),
              )}
            />
          );
        }}
      />
      <ScrollToTopButton visible={scrollToTopVisible} />
    </section>
  );
}
