import { Button, EmptyState } from '@plog/ui';

import LoadingEmptyGraphic from '@/shared/assets/empty-graphics/loading-empty.svg';

type FetchErrorEmptyStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
};

export default function FetchErrorEmptyState({
  title = '정보를 불러오지 못했어요',
  description = '인터넷 연결 상태를 확인하고 다시 시도해 주세요.',
  onRetry,
  className,
}: FetchErrorEmptyStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      graphic={<LoadingEmptyGraphic />}
      actions={
        onRetry && (
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={onRetry}
          >
            다시 시도
          </Button>
        )
      }
      className={className}
    />
  );
}
