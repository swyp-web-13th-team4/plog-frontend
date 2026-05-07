'use client';

import { type ReactNode } from 'react';

import Image from 'next/image';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatStudyDuration } from '../lib/format';
import { type FeedPost } from '../model/types';
import TagBadgeGroup from './TagBadgeGroup';

type FeedGridItemProps = {
  feed: FeedPost;
  onClick?: () => void;
  renderAction?: ReactNode;
};

export default function FeedGridItem({
  feed,
  onClick,
  renderAction,
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
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={feed.POST_INFO.image[0]}
          alt={`${feed.POST_INFO.id}의 대표 이미지`}
          width={204}
          height={204}
          className="w-full object-cover"
        />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-semantic-object-subtler [&_path]:fill-semantic-object-subtler">
            <Icon name="clock" />
            <span className="caption-md">
              {formatStudyDuration(feed.POST_INFO.PLACE_INFO.studyTime)}
            </span>
          </div>
          {renderAction}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="label-lg text-semantic-object-boldest">
          {feed.POST_INFO.title}
        </span>
        <div onClick={(event) => event.stopPropagation()}>
          <TagBadgeGroup tags={feed.POST_INFO.tags} maxVisible={2} />
        </div>
      </div>
    </div>
  );
}
