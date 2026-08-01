import { EmptyState } from '@plog/ui';

import ReviewDataEmptyGraphic from '@/shared/assets/empty-graphics/review-data-empty.svg';

type ReviewDataEmptyStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function ReviewDataEmptyState({
  title = '아직 등록된 방문자 리뷰가 없어요',
  description = '이 장소의 첫 번째 기록가가 되어 환경 정보를 공유해 주세요.',
  className,
}: ReviewDataEmptyStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      graphic={<ReviewDataEmptyGraphic />}
      className={className}
    />
  );
}
