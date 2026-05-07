'use client';

import { type ReactNode } from 'react';

import { Icon, IconButton, Select } from '@plog/ui';

import { FeedGridItem, FeedListItem, type FeedPost } from '@/entities/feed';

import {
  type FeedViewType,
  RECORD_OPTION_ITEMS,
  type RecordTypeValue,
  type ToolbarConfig,
} from '../model/types';
import { useFeedViewType } from '../model/use-feed-view-type';

type FeedListProps = {
  feeds: FeedPost[];
  sort: RecordTypeValue;
  onSortChange: (sort: RecordTypeValue) => void;
  renderAction?: (feed: FeedPost, viewType: FeedViewType) => ReactNode;
  onFeedClick?: (feed: FeedPost) => void;
  toolbarConfig?: ToolbarConfig;
  className?: string;
};

function isRecordTypeValue(value: string): value is RecordTypeValue {
  return RECORD_OPTION_ITEMS.some((option) => option.value === value);
}

export default function FeedList({
  feeds,
  sort,
  onSortChange,
  renderAction,
  onFeedClick,
  toolbarConfig,
  className,
}: FeedListProps) {
  const { viewType, toggleViewType } = useFeedViewType();

  return (
    <section className={className}>
      <div className="flex justify-between px-6">
        <Select
          value={sort}
          items={RECORD_OPTION_ITEMS}
          placeholder={RECORD_OPTION_ITEMS[0].label}
          onValueChange={(value) => {
            if (typeof value === 'string' && isRecordTypeValue(value)) {
              onSortChange(value);
            }
          }}
        />
        <div className="flex gap-2">
          {toolbarConfig?.tagFilter && (
            <IconButton
              aria-label="태그 필터"
              icon={<Icon name="filter" />}
              size="small"
              variant="outline"
            />
          )}
          {toolbarConfig?.viewToggle && (
            <IconButton
              aria-label={
                viewType === 'list'
                  ? '그리드 형식으로 게시글 보기'
                  : '리스트 형식으로 게시글 보기'
              }
              icon={
                viewType === 'list' ? (
                  <Icon name="grid" />
                ) : (
                  <Icon name="list" />
                )
              }
              size="small"
              variant="outline"
              onClick={toggleViewType}
            />
          )}
        </div>
      </div>
      {viewType === 'list' ? (
        <div>
          {feeds.map((feed) => (
            <FeedListItem
              key={feed.postId}
              feed={feed}
              onClick={onFeedClick ? () => onFeedClick(feed) : undefined}
              action={renderAction?.(feed, viewType)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 px-5 py-6">
          {feeds.map((feed) => (
            <FeedGridItem
              key={feed.postId}
              feed={feed}
              onClick={onFeedClick ? () => onFeedClick(feed) : undefined}
              action={renderAction?.(feed, viewType)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
