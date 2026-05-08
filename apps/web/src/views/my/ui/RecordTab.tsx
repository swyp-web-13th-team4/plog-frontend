'use client';

import { useState } from 'react';

import { FeedList, type RecordTypeValue } from '@/widgets/feed-list';

import { type PlaceTagValue, type PostSortType } from '@/entities/feed';

import { useMyPostsQuery } from '../model/use-my-posts-query';

const SORT_ITEMS: { value: RecordTypeValue; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'focus', label: '집중도순' },
  { value: 'studyTime', label: '작업시간순' },
];

export default function RecordTab() {
  const [sort, setSort] = useState<PostSortType>('latest');
  const [tags, setTags] = useState<PlaceTagValue[]>([]);
  const { data: feeds = [] } = useMyPostsQuery(sort, tags);

  return (
    <FeedList
      feeds={feeds}
      sort={sort}
      onSortChange={(v) => setSort(v as PostSortType)}
      sortItems={SORT_ITEMS}
      tags={tags}
      onTagsChange={setTags}
      toolbarConfig={{ viewToggle: true, tagFilter: true }}
    />
  );
}
