'use client';

import { type ReactNode } from 'react';

import { Chip, Icon, IconButton, Select } from '@plog/ui';
import { cn } from '@plog/utils';

import { ReviewTagsSheet } from '@/features/select-review-tags';

import {
  FeedGridItem,
  FeedListItem,
  type FeedPost,
  PLACE_TAG_LABELS,
  type PlaceTagValue,
} from '@/entities/feed';

import {
  type FeedViewType,
  type RecordTypeValue,
  type ToolbarConfig,
} from '../model/types';
import { useFeedViewType } from '../model/use-feed-view-type';

type FeedListProps = {
  feeds: FeedPost[];
  sort: RecordTypeValue;
  onSortChange: (sort: RecordTypeValue) => void;
  sortItems: { value: RecordTypeValue; label: string }[];
  tags?: PlaceTagValue[];
  onTagsChange?: (tags: PlaceTagValue[]) => void;
  renderAction?: (feed: FeedPost, viewType: FeedViewType) => ReactNode;
  renderThumbnailBadge?: (feed: FeedPost) => ReactNode;
  onFeedClick?: (feed: FeedPost) => void;
  toolbarConfig?: ToolbarConfig;
  emptyView?: ReactNode;
  className?: string;
};

export default function FeedList({
  feeds,
  sort,
  onSortChange,
  sortItems,
  tags = [],
  onTagsChange,
  renderAction,
  renderThumbnailBadge,
  onFeedClick,
  toolbarConfig,
  emptyView,
  className,
}: FeedListProps) {
  const { viewType, toggleViewType } = useFeedViewType();

  return (
    <section className={cn('flex w-full flex-col', className)}>
      <div className="flex justify-between px-6">
        <Select
          value={sort}
          items={sortItems}
          placeholder={sortItems[0].label}
          onValueChange={(value) => {
            if (typeof value === 'string') {
              onSortChange(value as RecordTypeValue);
            }
          }}
        />
        <div className="flex gap-2">
          {toolbarConfig?.tagFilter && onTagsChange && (
            <ReviewTagsSheet value={tags} onChange={onTagsChange}>
              <IconButton
                className={
                  tags.length > 0
                    ? 'border-semantic-accent-normal [&_svg]:size-5 [&_svg]:fill-semantic-accent-normal'
                    : '[&_svg]:size-5'
                }
                aria-label="태그 필터"
                icon={<Icon name="filter" />}
                size="small"
                variant="outline"
              />
            </ReviewTagsSheet>
          )}
          {toolbarConfig?.viewToggle && (
            <IconButton
              className="[&_svg]:size-5"
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
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pt-3">
          {tags.map((tag) => (
            <Chip
              key={tag}
              size="small"
              variant="soft"
              pressed
              onClick={() => onTagsChange?.(tags.filter((t) => t !== tag))}
            >
              {PLACE_TAG_LABELS[tag]}
              <Icon name="close" size={16} />
            </Chip>
          ))}
        </div>
      )}
      {feeds.length === 0 ? (
        emptyView
      ) : viewType === 'list' ? (
        <div>
          {feeds.map((feed) => (
            <FeedListItem
              key={feed.postId}
              feed={feed}
              onClick={onFeedClick ? () => onFeedClick(feed) : undefined}
              action={renderAction?.(feed, viewType)}
              thumbnailBadge={renderThumbnailBadge?.(feed)}
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
