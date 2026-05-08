import { EmptyState } from '@plog/ui';

import SearchEmptyGraphic from '@/shared/assets/empty-graphics/search-empty.svg';

type SearchEmptyStateProps = {
  description?: string;
  className?: string;
};

export default function SearchEmptyState({
  description = '검색어를 다시 확인해 주세요',
  className,
}: SearchEmptyStateProps) {
  return (
    <EmptyState
      title="검색 결과가 없어요"
      description={description}
      graphic={<SearchEmptyGraphic />}
      className={className}
    />
  );
}
