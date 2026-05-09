'use client';

// import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

// import { cn } from '@plog/utils';
//
// import {
//   FeedList,
//   type FeedViewType,
//   type RecordTypeValue,
// } from '@/widgets/feed-list';
//
// import { BookmarkButton } from '@/features/toggle-bookmark';
import { type FeedPost } from '@/entities/feed';

import { useScrollToTop } from '@/shared/lib/scroll-to-top';
import { ScrollToTopButton } from '@/shared/ui';

export default function UserFeedSection({ userId }: { userId: string }) {
  const router = useRouter();

  const { topRef, visible: scrollToTopVisible } = useScrollToTop();

  // const [sort, setSort] = useState<RecordTypeValue>('latest');

  // const sortedFeeds = useMemo(
  //   () => sortFeeds(userFeeds, sort),
  //   [userFeeds, sort],
  // );

  const handleFeedClick = (feed: FeedPost) => {
    router.push(
      `/feed/${feed.postId}?backTo=${encodeURIComponent(`/feed/users/${userId}`)}`,
    );
  };

  return (
    <section className="pt-3">
      <div ref={topRef} aria-hidden="true" className="h-px w-full" />
      {/*<FeedList*/}
      {/*  feeds={sortedFeeds}*/}
      {/*  sort={sort}*/}
      {/*  onSortChange={setSort}*/}
      {/*  sortItems={SORT_ITEMS}*/}
      {/*  onFeedClick={handleFeedClick}*/}
      {/*  toolbarConfig={{ viewToggle: true }}*/}
      {/*  renderAction={(feed, viewType: FeedViewType) => {*/}
      {/*    const isBookmarked = feed.bookMark;*/}
      {/*    return (*/}
      {/*      <BookmarkButton*/}
      {/*        postId={feed.postId}*/}
      {/*        isBookmarked={isBookmarked}*/}
      {/*        className={cn(*/}
      {/*          viewType === 'grid' &&*/}
      {/*            (isBookmarked*/}
      {/*              ? '[&_path]:fill-semantic-accent-normal'*/}
      {/*              : '[&_path]:fill-semantic-object-subtler'),*/}
      {/*        )}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}
      <ScrollToTopButton visible={scrollToTopVisible} />
    </section>
  );
}
