'use client';

import { useState } from 'react';

import { FeedList, type RecordTypeValue } from '@/widgets/feed-list';

import { type BookmarkSortType, type PlaceTagValue } from '@/entities/feed';

import { BookmarkEmptyState, FetchErrorEmptyState } from '@/shared/ui';

import { useMyBookmarksQuery } from '../model/use-my-bookmarks-query';

const SORT_ITEMS: { value: RecordTypeValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'likes', label: '좋아요순' },
];

export default function BookmarkTab() {
  const [sort, setSort] = useState<BookmarkSortType>('latest');
  const [tags, setTags] = useState<PlaceTagValue[]>([]);
  const {
    data: feeds = [],
    isPending,
    isError,
  } = useMyBookmarksQuery(sort, tags);

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
    />
  );
}
