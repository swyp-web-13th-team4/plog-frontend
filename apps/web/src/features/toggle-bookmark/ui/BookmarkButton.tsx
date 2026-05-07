'use client';

import { type MouseEvent } from 'react';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { useToggleBookmark } from '../model/use-toggle-bookmark';

type BookmarkButtonProps = {
  postId: string;
  isBookmarked: boolean;
  className?: string;
  onToggle?: (postId: string) => void;
};

export default function BookmarkButton({
  postId,
  isBookmarked,
  className,
  onToggle,
}: BookmarkButtonProps) {
  const { toggleBookmark } = useToggleBookmark();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleBookmark(postId);
    onToggle?.(postId);
  };

  return (
    <button
      type="button"
      aria-label={isBookmarked ? '북마크 취소' : '북마크'}
      aria-pressed={isBookmarked}
      className={cn('cursor-pointer', className)}
      onClick={handleClick}
    >
      {isBookmarked ? (
        <Icon name="bookmark-filled" className="text-semantic-accent-normal" />
      ) : (
        <Icon name="bookmark" className="text-semantic-object-normal" />
      )}
    </button>
  );
}
