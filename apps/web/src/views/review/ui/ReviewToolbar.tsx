import { Button, Icon, Select, type SelectOption } from '@plog/ui';
import { cn } from '@plog/utils';

import { type ReviewSortType } from '@/entities/review';

const REVIEW_SORT_OPTIONS = [
  { label: '최신순', value: 'LATEST' },
  { label: '오래된순', value: 'OLDEST' },
  { label: '별점 높은순', value: 'RATING_HIGH' },
  { label: '별점 낮은순', value: 'RATING_LOW' },
] satisfies SelectOption[];

type ReviewToolbarProps = {
  sortType: ReviewSortType;
  imageOnly: boolean;
  onSortTypeChange: (sortType: ReviewSortType) => void;
  onShowImageChange: (imageOnly: boolean) => void;
};

function isReviewSortType(value: unknown): value is ReviewSortType {
  return REVIEW_SORT_OPTIONS.some((option) => option.value === value);
}

export default function ReviewToolbar({
  sortType,
  imageOnly,
  onSortTypeChange,
  onShowImageChange,
}: ReviewToolbarProps) {
  const handleShowImageOnly = () => {
    onShowImageChange(!imageOnly);
  };

  return (
    <div className="flex items-center gap-3 p-6">
      <Select
        aria-label="리뷰 정렬"
        items={REVIEW_SORT_OPTIONS}
        value={sortType}
        onValueChange={(value) => {
          if (isReviewSortType(value)) onSortTypeChange(value);
        }}
      />
      <Button
        type="button"
        size="small"
        variant="outline"
        aria-pressed={imageOnly}
        onClick={handleShowImageOnly}
        className={cn(
          'label-sm rounded-xl border border-semantic-stroke-subtle text-semantic-object-bold',
          imageOnly &&
            'bg-semantic-object-boldest text-semantic-object-inverse hover:bg-semantic-object-boldest',
        )}
        iconLeft={
          <Icon
            name="camera-filled"
            size={16}
            className={cn(
              'text-semantic-object-normal',
              imageOnly && 'text-semantic-object-inverse',
            )}
          />
        }
      >
        사진 리뷰만 보기
      </Button>
    </div>
  );
}
