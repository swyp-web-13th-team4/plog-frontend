'use client';

import { Icon } from '@plog/ui';

import { useToggleLike } from '../model/use-toggle-like';

type BookmarkButtonProps = {
  postId: string;
  isLiked: boolean;
};

export default function LikeButton({ postId, isLiked }: BookmarkButtonProps) {
  const { toggleLike } = useToggleLike();

  return (
    <button
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      aria-pressed={isLiked}
      type="button"
      className="flex cursor-pointer items-center"
      onClick={() => toggleLike(postId)}
    >
      {isLiked ? (
        <Icon
          name="heart-filled"
          className="text-semantic-feedback-error-neutral"
        />
      ) : (
        <Icon name="heart" className="text-semantic-object-normal" />
      )}
    </button>
  );
}
