import { type ReactNode } from 'react';

import { EmptyState } from '@plog/ui';

import RecordEmptyGraphic from '@/shared/assets/empty-graphics/record-empty.svg';

type RecordEmptyStateProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export default function RecordEmptyState({
  title = '아직 기록이 없어요',
  description = '첫 번째 기록을 남겨볼까요?',
  actions,
  className,
}: RecordEmptyStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      graphic={<RecordEmptyGraphic />}
      actions={actions}
      className={className}
    />
  );
}
