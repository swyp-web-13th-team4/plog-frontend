'use client';

import { type MouseEvent, useEffect, useState } from 'react';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  type ProfilePostsBookmarkTarget,
  useToggleBookmark,
} from '../model/use-toggle-bookmark';

type BookmarkButtonProps = {
  postId: number;
  isBookmarked: boolean;
  profilePostsTarget?: ProfilePostsBookmarkTarget;
  className?: string;
};

export default function BookmarkButton({
  postId,
  isBookmarked,
  profilePostsTarget,
  className,
}: BookmarkButtonProps) {
  const [optimisticBookmarked, setOptimisticBookmarked] =
    useState(isBookmarked);

  useEffect(() => {
    setOptimisticBookmarked(isBookmarked);
  }, [isBookmarked]);

  const { toggleBookmark, isPending } = useToggleBookmark();

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const proceeded = await toggleBookmark(
      postId,
      optimisticBookmarked,
      profilePostsTarget,
    );
    if (proceeded) setOptimisticBookmarked((prev) => !prev);
  };

  return (
    <button
      type="button"
      aria-label={optimisticBookmarked ? '북마크 취소' : '북마크'}
      aria-pressed={optimisticBookmarked}
      className={cn(
        'flex cursor-pointer items-center text-semantic-object-normal disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      disabled={isPending}
      onClick={handleClick}
    >
      {optimisticBookmarked ? (
        <Icon name="bookmark-filled" className="text-semantic-accent-normal" />
      ) : (
        <Icon name="bookmark" className="text-current" />
      )}
    </button>
  );
}
