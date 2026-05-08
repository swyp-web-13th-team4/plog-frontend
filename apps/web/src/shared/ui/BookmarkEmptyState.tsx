import { type ReactNode } from 'react';

import { EmptyState } from '@plog/ui';

import BookmarkEmptyGraphic from '@/shared/assets/empty-graphics/bookmark-empty.svg';

type BookmarkEmptyStateProps = {
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export default function BookmarkEmptyState({
  description = '마음에 드는 게시글에 북마크를 눌러 저장해 보세요.',
  actions,
  className,
}: BookmarkEmptyStateProps) {
  return (
    <EmptyState
      title="아직 북마크가 없어요"
      description={description}
      graphic={<BookmarkEmptyGraphic />}
      actions={actions}
      className={className}
    />
  );
}
