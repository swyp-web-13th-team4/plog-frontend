'use client';

import { useState } from 'react';

import { FeedList, type RecordTypeValue } from '@/widgets/feed-list';

import { type BookmarkSortType, type PlaceTagValue } from '@/entities/feed';

import { useMyBookmarksQuery } from '../model/use-my-bookmarks-query';

const SORT_ITEMS: { value: RecordTypeValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'likes', label: '좋아요순' },
];

export default function BookmarkTab() {
  const [sort, setSort] = useState<BookmarkSortType>('latest');
  const [tags, setTags] = useState<PlaceTagValue[]>([]);
  const { data: feeds = [] } = useMyBookmarksQuery(sort, tags);

  return (
    <FeedList
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
