'use client';

import { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { cn } from '@plog/utils';

import { FeedList, type RecordTypeValue } from '@/widgets/feed-list';

import { BookmarkButton } from '@/features/toggle-bookmark';

import { type FeedPost } from '@/entities/feed';
import { MOCK_FEED_DATA } from '@/entities/feed/model/mock-data';

import { ScrollToTopButton } from '@/shared/ui';

type BookmarkByPostId = Record<string, boolean>;

const SCROLL_TO_TOP_VISIBLE_OFFSET = 80;

function sortFeeds(feeds: FeedPost[], sort: RecordTypeValue): FeedPost[] {
  return [...feeds].sort((a, b) => {
    if (sort === 'latest')
      return b.POST_INFO.createdAt.localeCompare(a.POST_INFO.createdAt);
    if (sort === 'like') return b.POST_INFO.heartCount - a.POST_INFO.heartCount;
    if (sort === 'concentrate')
      return (
        b.POST_INFO.PLACE_INFO.concentrateCount -
        a.POST_INFO.PLACE_INFO.concentrateCount
      );
    return 0;
  });
}

export default function UserFeedSection({ userId }: { userId: string }) {
  const [sort, setSort] = useState<RecordTypeValue>('latest');
  const [bookmarks, setBookmarks] = useState<BookmarkByPostId>({});
  const [canShowScrollToTopButton, setCanShowScrollToTopButton] =
    useState(false);

  const userFeeds = useMemo(
    () =>
      MOCK_FEED_DATA.filter((item) => item.POST_INFO.USER_INFO.id === userId),
    [userId],
  );

  const sortedFeeds = useMemo(
    () => sortFeeds(userFeeds, sort),
    [userFeeds, sort],
  );

  const router = useRouter();

  const handleBookmark = (postId: string) => {
    setBookmarks((prev) => {
      const feed = userFeeds.find((item) => item.POST_INFO.id === postId);
      const currentValue =
        prev[postId] ?? feed?.POST_INFO.isBookmarked ?? false;
      return { ...prev, [postId]: !currentValue };
    });
  };

  const handleFeedClick = (feed: FeedPost) => {
    router.push(
      `/feed/${feed.POST_INFO.id}?backTo=${encodeURIComponent(`/feed/users/${feed.POST_INFO.USER_INFO.id}`)}`,
    );
  };

  useEffect(() => {
    const updateScrollState = () => {
      setCanShowScrollToTopButton(
        document.documentElement.scrollHeight > window.innerHeight &&
          window.scrollY > SCROLL_TO_TOP_VISIBLE_OFFSET,
      );
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [userId]);

  return (
    <section className="pt-3">
      <FeedList
        feeds={sortedFeeds}
        sort={sort}
        onSortChange={setSort}
        onFeedClick={handleFeedClick}
        toolbarConfig={{ viewToggle: true }}
        renderAction={(feed, viewType) => {
          const isBookmarked =
            bookmarks[feed.POST_INFO.id] ?? feed.POST_INFO.isBookmarked;
          return (
            <BookmarkButton
              postId={feed.POST_INFO.id}
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
      <ScrollToTopButton visible={canShowScrollToTopButton} />
    </section>
  );
}
