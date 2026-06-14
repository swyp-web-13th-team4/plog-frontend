'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Spinner } from '@plog/ui';

import { FeedList, type RecordTypeValue } from '@/widgets/feed-list';

import { BookmarkButton } from '@/features/toggle-bookmark';

import {
  type BookmarkSortType,
  type FeedItemProfileView,
  type PlaceTagValue,
} from '@/entities/feed';

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
    refetch,
  } = useMyBookmarksQuery(sort, tags);

  const router = useRouter();

  if (isPending)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner size="large" />
      </div>
    );

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <FetchErrorEmptyState onRetry={refetch} />
      </div>
    );
  }

  if (feeds.length === 0 && tags.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <BookmarkEmptyState />
      </div>
    );
  }

  const handleFeedClick = (feed: FeedItemProfileView) => {
    router.push(`/feed/${feed.postId}`);
  };

  return (
    <FeedList
      className="pt-6"
      feeds={feeds}
      sort={sort}
      onSortChange={(v) => setSort(v as BookmarkSortType)}
      onFeedClick={handleFeedClick}
      sortItems={SORT_ITEMS}
      tags={tags}
      onTagsChange={setTags}
      toolbarConfig={{ viewToggle: true, tagFilter: true }}
      emptyView={
        <div className="flex flex-1 items-center justify-center">
          <BookmarkEmptyState
            title="일치하는 정보가 없어요"
            description="다른 태그를 선택해 보세요."
          />
        </div>
      }
      renderAction={(feed, viewType) => (
        <BookmarkButton
          className={
            viewType === 'grid' ? 'text-semantic-object-subtler' : undefined
          }
          postId={feed.postId}
          isBookmarked={feed.bookMark}
          disableTracking
        />
      )}
    />
  );
}
