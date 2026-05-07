'use client';

import { type ReactNode } from 'react';

import Image from 'next/image';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatStudyDuration } from '../lib/format';
import { type FeedPost } from '../model/types';
import TagBadgeGroup from './TagBadgeGroup';

type GridFeedProps = {
  feeds: FeedPost[];
  className?: string;
  onFeedClick?: (feed: FeedPost) => void;
  renderAction?: (feed: FeedPost) => ReactNode;
};

export default function GridFeed({
  feeds,
  className,
  onFeedClick,
  renderAction,
}: GridFeedProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-6 px-5 py-6', className)}>
      {feeds.map((feed) => (
        <div
          key={feed.POST_INFO.id}
          onClick={() => onFeedClick?.(feed)}
          className={cn('flex flex-col gap-4', onFeedClick && 'cursor-pointer')}
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
              {renderAction?.(feed)}
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
      ))}
    </div>
  );
}
