import { EmptyState } from '@plog/ui';

import PlaceEmptyGraphic from '@/shared/assets/empty-graphics/place-empty.svg';

type PlaceSearchIdleStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function PlaceSearchIdleState({
  title = '어디에서 작업하셨나요?',
  description = '오늘 몰입했던 그 장소를 검색해 보세요.',
  className,
}: PlaceSearchIdleStateProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      graphic={<PlaceEmptyGraphic />}
      className={className}
    />
  );
}
