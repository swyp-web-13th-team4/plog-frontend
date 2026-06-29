'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Icon, Spinner } from '@plog/ui';

import { FeedList, type RecordTypeValue } from '@/widgets/feed-list';

import { BookmarkButton } from '@/features/toggle-bookmark';

import {
  type FeedProfileItem,
  type PlaceTagValue,
  type PostSortType,
} from '@/entities/feed';

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
  const {
    data: feeds = [],
    isPending,
    isError,
    refetch,
  } = useMyPostsQuery(sort, tags);

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
        <RecordEmptyState />
      </div>
    );
  }

  const handleFeedClick = (feed: FeedProfileItem) => {
    router.push(`/feed/${feed.postId}`);
  };

  return (
    <FeedList
      className="pt-6"
      feeds={feeds}
      sort={sort}
      onSortChange={(v) => setSort(v as PostSortType)}
      onFeedClick={handleFeedClick}
      sortItems={SORT_ITEMS}
      tags={tags}
      onTagsChange={setTags}
      toolbarConfig={{ viewToggle: true, tagFilter: true }}
      emptyView={
        <div className="flex flex-1 items-center justify-center">
          <RecordEmptyState
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
      renderThumbnailBadge={(feed) =>
        !feed.isPublic ? (
          <Icon
            name="lock-filled"
            size={20}
            className="text-semantic-object-subtler"
            aria-label="비공개 게시물"
          />
        ) : undefined
      }
    />
  );
}
