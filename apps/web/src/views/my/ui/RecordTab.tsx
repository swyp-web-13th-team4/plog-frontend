'use client';

import { useState } from 'react';

import { FeedList, type RecordTypeValue } from '@/widgets/feed-list';

import { BookmarkButton } from '@/features/toggle-bookmark';

import { type PlaceTagValue, type PostSortType } from '@/entities/feed';

import { FetchErrorEmptyState, RecordEmptyState } from '@/shared/ui';

import { useMyPostsQuery } from '../model/use-my-posts-query';

const SORT_ITEMS: { value: RecordTypeValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'focus', label: '집중도순' },
  { value: 'studyTime', label: '작업시간순' },
];

export default function RecordTab() {
  const [sort, setSort] = useState<PostSortType>('latest');
  const [tags, setTags] = useState<PlaceTagValue[]>([]);
  const { data: feeds = [], isPending, isError } = useMyPostsQuery(sort, tags);

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
        <RecordEmptyState />
      </div>
    );
  }

  return (
    <FeedList
      className="pt-6"
      feeds={feeds}
      sort={sort}
      onSortChange={(v) => setSort(v as PostSortType)}
      sortItems={SORT_ITEMS}
      tags={tags}
      onTagsChange={setTags}
      toolbarConfig={{ viewToggle: true, tagFilter: true }}
      renderAction={(feed) => (
        <BookmarkButton postId={feed.postId} isBookmarked={feed.bookMark} />
      )}
    />
  );
}
