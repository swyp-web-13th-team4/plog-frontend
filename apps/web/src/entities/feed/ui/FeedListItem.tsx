'use client';

import { type ReactNode } from 'react';

import Image from 'next/image';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatStudyDuration } from '../lib/format';
import { type FeedPost } from '../model/types';
import TagBadgeGroup from './TagBadgeGroup';

type FeedListItemProps = {
  feed: FeedPost;
  onClick?: () => void;
  action?: ReactNode;
};

export default function FeedListItem({
  feed,
  onClick,
  action,
}: FeedListItemProps) {
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
      className={cn(
        'flex gap-4 border-b border-b-semantic-object-subtler bg-semantic-system-white px-6 py-5',
        onClick && 'cursor-pointer',
      )}
    >
      <div className="relative size-30 overflow-hidden rounded-xl mobile:size-27">
        <Image
          src={feed.postImages[0]}
          alt={`${feed.title}의 대표 이미지`}
          fill
          sizes="(max-width: 440px) 108px, 120px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="relative">
          <div onClick={(event) => event.stopPropagation()}>
            <TagBadgeGroup
              tags={feed.tags}
              maxVisible={1}
              popoverSide="right"
            />
          </div>
          <div className="absolute top-0 right-0">{action}</div>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="label-lg text-semantic-object-boldest">
            {feed.title}
          </span>
          <span className="caption-md truncate text-semantic-object-normal">
            {feed.contents}
          </span>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <Icon
              name="clock"
              size={16}
              className="text-semantic-object-subtle"
            />
            <span className="caption-md text-semantic-object-bold">
              {formatStudyDuration(feed.studyTime)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon
              name="fire"
              size={16}
              className="text-semantic-object-subtle"
            />
            <span className="caption-md text-semantic-object-bold">
              {`집중도 ${feed.focus}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
