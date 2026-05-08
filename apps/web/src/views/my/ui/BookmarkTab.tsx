'use client';

import { useState } from 'react';

import { cn } from '@plog/utils';

import {
  FeedList,
  type FeedViewType,
  type RecordTypeValue,
} from '@/widgets/feed-list';

import { BookmarkButton } from '@/features/toggle-bookmark';

import { type BookmarkSortType, type PlaceTagValue } from '@/entities/feed';

import { BookmarkEmptyState, FetchErrorEmptyState } from '@/shared/ui';

import { useMyBookmarksQuery } from '../model/use-my-bookmarks-query';

type BookmarkByPostId = Record<number, boolean>;

const SORT_ITEMS: { value: RecordTypeValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'likes', label: '좋아요순' },
];

export default function BookmarkTab() {
  const [sort, setSort] = useState<BookmarkSortType>('latest');
  const [tags, setTags] = useState<PlaceTagValue[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkByPostId>({});
  const {
    data: feeds = [],
    isPending,
    isError,
  } = useMyBookmarksQuery(sort, tags);

  const handleBookmark = (postId: number) => {
    setBookmarks((prev) => {
      const feed = feeds.find((item) => item.postId === postId);
      const current = prev[postId] ?? feed?.bookMark ?? false;
      return { ...prev, [postId]: !current };
    });
  };

  if (isPending) return null;

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <FetchErrorEmptyState />
      </div>
    );
  }

  if (feeds.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <BookmarkEmptyState />
      </div>
    );
  }

  return (
    <FeedList
      className="pt-6"
      feeds={feeds}
      sort={sort}
      onSortChange={(v) => setSort(v as BookmarkSortType)}
      sortItems={SORT_ITEMS}
      tags={tags}
      onTagsChange={setTags}
      toolbarConfig={{ viewToggle: true, tagFilter: true }}
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
  );
}
