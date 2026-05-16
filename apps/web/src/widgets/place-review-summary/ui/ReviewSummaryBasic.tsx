// ReviewSummaryCompact.tsx
import { Icon } from '@plog/ui';

import { formatCompactReviewCount } from '../lib/utils';
import { type PlaceReviewSummary } from '../model/types';
import ReviewSummaryChip from './ReviewSummaryChip';
type ReviewSummaryCompactProps = {
  summary: PlaceReviewSummary;
  onMoreClick: () => void;
};

export default function ReviewSummaryBasic({
  summary,
  onMoreClick,
}: ReviewSummaryCompactProps) {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2 className="label-lg text-semantic-object-boldest">방문자 리뷰</h2>
          <span className="title-xs text-semantic-accent-normal">
            {formatCompactReviewCount(summary.totalCount)}
          </span>
        </div>

        <button
          type="button"
          className="body-md flex cursor-pointer items-center gap-1 text-semantic-object-subtle"
          onClick={onMoreClick}
        >
          더보기
          <Icon name="chevron-right" size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {summary.items.map((item) => (
          <ReviewSummaryChip key={item.type} metric={item} />
        ))}
      </div>
    </section>
  );
}
