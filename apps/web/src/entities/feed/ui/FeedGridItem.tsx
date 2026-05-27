'use client';

import { type ReactNode } from 'react';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { ImageWithFallback } from '@/shared/ui';

import { formatStudyDuration } from '../lib/format';
import { type FeedPost } from '../model/types';
import TagBadgeGroup from './TagBadgeGroup';

type FeedGridItemProps = {
  feed: FeedPost;
  onClick?: () => void;
  action?: ReactNode;
};

export default function FeedGridItem({
  feed,
  onClick,
  action,
}: FeedGridItemProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn('flex flex-col gap-4', onClick && 'cursor-pointer')}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <ImageWithFallback
          src={feed.postImages[0]}
          alt={`${feed.title}의 대표 이미지`}
          fill
          sizes="208px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <div className="mt-1 flex items-center gap-1 text-semantic-object-subtler [&_path]:fill-semantic-object-subtler">
            <Icon name="clock" size={16} />
            <span className="caption-md">
              {formatStudyDuration(feed.studyTime)}
            </span>
          </div>
          {action}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="label-lg truncate text-semantic-object-boldest">
          {feed.title}
        </span>
        <div onClick={(event) => event.stopPropagation()}>
          <TagBadgeGroup tags={feed.tags} maxVisible={1} />
        </div>
      </div>
    </div>
  );
}
