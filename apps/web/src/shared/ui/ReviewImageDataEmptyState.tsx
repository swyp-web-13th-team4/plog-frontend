import { EmptyState } from '@plog/ui';

import ReviewImageDataEmptyGraphic from '@/shared/assets/empty-graphics/review-image-data-empty.svg';

type ReviewImageDataEmptyStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function ReviewImageDataEmptyState({
  title = '아직 등록된 사진이 없어요',
  description = '이 장소의 첫 번째 사진 기록을 남겨주세요.',
  className,
}: ReviewImageDataEmptyStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      graphic={<ReviewImageDataEmptyGraphic />}
      className={className}
    />
  );
}
