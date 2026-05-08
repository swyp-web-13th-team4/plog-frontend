'use client';

import { type MouseEvent, useEffect, useState } from 'react';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { useToggleBookmark } from '../model/use-toggle-bookmark';

type BookmarkButtonProps = {
  postId: number;
  isBookmarked: boolean;
  className?: string;
};

export default function BookmarkButton({
  postId,
  isBookmarked,
  className,
}: BookmarkButtonProps) {
  const [optimisticBookmarked, setOptimisticBookmarked] =
    useState(isBookmarked);

  useEffect(() => {
    setOptimisticBookmarked(isBookmarked);
  }, [isBookmarked]);

  const { toggleBookmark } = useToggleBookmark();

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const proceeded = await toggleBookmark(postId, optimisticBookmarked);
    if (proceeded) setOptimisticBookmarked((prev) => !prev);
  };

  return (
    <button
      type="button"
      aria-label={optimisticBookmarked ? '북마크 취소' : '북마크'}
      aria-pressed={optimisticBookmarked}
      className={cn('cursor-pointer', className)}
      onClick={handleClick}
    >
      {optimisticBookmarked ? (
        <Icon name="bookmark-filled" className="text-semantic-accent-normal" />
      ) : (
        <Icon name="bookmark" className="text-semantic-object-normal" />
      )}
    </button>
  );
}
