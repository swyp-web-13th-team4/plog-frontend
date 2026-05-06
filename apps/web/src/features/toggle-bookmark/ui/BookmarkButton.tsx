'use client';

import { Icon } from '@plog/ui';

import { useToggleBookmark } from '../model/use-toggle-bookmark';

type BookmarkButtonProps = {
  postId: string;
  isBookmarked: boolean;
};

export default function BookmarkButton({
  postId,
  isBookmarked,
}: BookmarkButtonProps) {
  const { toggleBookmark } = useToggleBookmark();

  return (
    <button
      type="button"
      aria-label={isBookmarked ? '북마크 취소' : '북마크'}
      aria-pressed={isBookmarked}
      className="cursor-pointer"
      onClick={() => toggleBookmark(postId)}
    >
      {isBookmarked ? (
        <Icon name="bookmark-filled" className="text-semantic-accent-normal" />
      ) : (
        <Icon name="bookmark" className="text-semantic-object-normal" />
      )}
    </button>
  );
}
