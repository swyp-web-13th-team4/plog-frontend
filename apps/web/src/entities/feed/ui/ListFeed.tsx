'use client';

import { type ReactNode } from 'react';

import Image from 'next/image';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatStudyDuration } from '../lib/format';
import { type FeedPost } from '../model/types';
import TagBadgeGroup from './TagBadgeGroup';

type ListFeedProps = {
  feeds: FeedPost[];
  className?: string;
  onFeedClick?: (feed: FeedPost) => void;
  renderAction?: (feed: FeedPost) => ReactNode;
};

export default function ListFeed({
  feeds,
  className,
  onFeedClick,
  renderAction,
}: ListFeedProps) {
  return (
    <div className={className}>
      {feeds.map((feed) => (
        <div
          key={feed.POST_INFO.id}
          onClick={() => onFeedClick?.(feed)}
          className={cn(
            'flex gap-4 border-b border-b-semantic-object-subtler bg-semantic-system-white px-6 py-5',
            onFeedClick && 'cursor-pointer',
          )}
        >
          <Image
            src={feed.POST_INFO.image[0]}
            alt={`${feed.POST_INFO.id}의 대표 이미지`}
            width={116}
            height={116}
            className="rounded-xl"
          />

          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div className="flex justify-between gap-3">
              <div onClick={(event) => event.stopPropagation()}>
                <TagBadgeGroup tags={feed.POST_INFO.tags} maxVisible={2} />
              </div>
              {renderAction?.(feed)}
            </div>

            <div className="flex flex-col gap-1">
              <span className="label-lg text-semantic-object-boldest">
                {feed.POST_INFO.title}
              </span>
              <span className="caption-md truncate text-semantic-object-normal">
                {feed.POST_INFO.content}
              </span>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <Icon
                  name="pin"
                  size={16}
                  className="text-semantic-object-subtle"
                />
                <span className="caption-md text-semantic-object-bold">
                  {feed.POST_INFO.PLACE_INFO.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon
                  name="clock"
                  size={16}
                  className="text-semantic-object-subtle"
                />
                <span className="caption-md text-semantic-object-bold">
                  {formatStudyDuration(feed.POST_INFO.PLACE_INFO.studyTime)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon
                  name="fire"
                  size={16}
                  className="text-semantic-object-subtle"
                />
                <span className="caption-md text-semantic-object-bold">
                  {`집중도 ${feed.POST_INFO.PLACE_INFO.concentrateCount}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
