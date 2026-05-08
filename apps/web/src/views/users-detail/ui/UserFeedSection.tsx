'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { cn } from '@plog/utils';

import {
  FeedList,
  type FeedViewType,
  type RecordTypeValue,
} from '@/widgets/feed-list';

import { BookmarkButton } from '@/features/toggle-bookmark';

import { type FeedPost } from '@/entities/feed';
import { MOCK_FEED_DATA } from '@/entities/feed/model/mock-data';

import { useScrollToTop } from '@/shared/lib/scroll-to-top';
import { ScrollToTopButton } from '@/shared/ui';

type BookmarkByPostId = Record<number, boolean>;

const SORT_ITEMS: { value: RecordTypeValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'likes', label: '좋아요순' },
  { value: 'focus', label: '집중도순' },
];

function sortFeeds(feeds: FeedPost[], sort: RecordTypeValue): FeedPost[] {
  return [...feeds].sort((a, b) => {
    if (sort === 'latest') return b.createAt.localeCompare(a.createAt);
    if (sort === 'likes') return b.likes - a.likes;
    if (sort === 'focus') return b.focus - a.focus;
    return 0;
  });
}

export default function UserFeedSection({ userId }: { userId: string }) {
  const router = useRouter();
  const { topRef, visible: scrollToTopVisible } = useScrollToTop();

  // TODO: API 연동 시 userId로 서버 필터링
  const userFeeds = MOCK_FEED_DATA;

  const [sort, setSort] = useState<RecordTypeValue>('latest');
  const [bookmarks, setBookmarks] = useState<BookmarkByPostId>({});

  const sortedFeeds = useMemo(
    () => sortFeeds(userFeeds, sort),
    [userFeeds, sort],
  );

  const handleBookmark = (postId: number) => {
    setBookmarks((prev) => {
      const feed = userFeeds.find((item) => item.postId === postId);
      const currentValue = prev[postId] ?? feed?.bookMark ?? false;
      return { ...prev, [postId]: !currentValue };
    });
  };

  const handleFeedClick = (feed: FeedPost) => {
    router.push(
      `/feed/${feed.postId}?backTo=${encodeURIComponent(`/feed/users/${userId}`)}`,
    );
  };

  return (
    <section className="pt-3">
      <div ref={topRef} aria-hidden="true" className="h-px w-full" />
      <FeedList
        feeds={sortedFeeds}
        sort={sort}
        onSortChange={setSort}
        sortItems={SORT_ITEMS}
        onFeedClick={handleFeedClick}
        toolbarConfig={{ viewToggle: true }}
        renderAction={(feed, viewType: FeedViewType) => {
          const isBookmarked = bookmarks[feed.postId] ?? feed.bookMark;
          return (
            <BookmarkButton
              postId={feed.postId}
              isBookmarked={isBookmarked}
              onToggle={handleBookmark}
              className={cn(
                viewType === 'grid' &&
                  (isBookmarked
                    ? '[&_path]:fill-semantic-accent-normal'
                    : '[&_path]:fill-semantic-object-subtler'),
              )}
            />
          );
        }}
      />
      <ScrollToTopButton visible={scrollToTopVisible} />
    </section>
  );
}
