'use client';

import { type MouseEvent, useEffect, useState } from 'react';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { useToggleLike } from '../model/use-toggle-like';

type LikeButtonProps = {
  postId: number;
  isLiked: boolean;
  className?: string;
};

export default function LikeButton({
  postId,
  isLiked,
  className,
}: LikeButtonProps) {
  const [optimisticLiked, setOptimisticLiked] = useState(isLiked);

  useEffect(() => {
    setOptimisticLiked(isLiked);
  }, [isLiked]);

  const { toggleLike, isPending } = useToggleLike();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOptimisticLiked((prev) => !prev);
    toggleLike(postId);
  };

  return (
    <button
      type="button"
      aria-label={optimisticLiked ? '좋아요 취소' : '좋아요'}
      aria-pressed={optimisticLiked}
      className={cn(
        'flex cursor-pointer items-center text-semantic-object-normal disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      disabled={isPending}
      onClick={handleClick}
    >
      {optimisticLiked ? (
        <Icon name="heart-filled" className="text-semantic-theme-red-neutral" />
      ) : (
        <Icon name="heart" className="text-current" />
      )}
    </button>
  );
}
