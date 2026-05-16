// ReviewSummaryExpanded.tsx
import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatReviewCount, formatReviewPersonCount } from '../lib/utils';
import {
  type PlaceReviewSummary,
  type PlaceReviewVariant,
} from '../model/types';
import ReviewScoreBar from './ReviewScoreBar';

type ReviewSummaryExpandedProps = {
  summary: PlaceReviewSummary;
  variant: PlaceReviewVariant;
};

export default function ReviewSummaryExpanded({
  summary,
  variant,
}: ReviewSummaryExpandedProps) {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2 className="label-lg text-semantic-object-boldest">방문자 리뷰</h2>
          <span
            className={cn(
              'title-xs',
              variant === 'record'
                ? 'text-semantic-accent-normal'
                : 'text-semantic-theme-sky-normal',
            )}
          >
            {formatReviewCount(summary.totalCount)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {summary.items.map((item) => (
            <ReviewScoreBar
              key={item.type}
              metric={item}
              totalCount={summary.totalCount}
              variant={variant}
            />
          ))}
        </div>
        <div className="border-t border-semantic-stroke-subtle" />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Icon
              name="star-filled"
              size={16}
              className="text-semantic-theme-amber-normal"
            />
            <span className="label-lg text-semantic-object-boldest">
              {summary.averageRating.toFixed(2)}
            </span>
          </div>
          <span className="body-sm text-semantic-object-normal">·</span>
          <span className="body-sm text-semantic-object-normal">
            {formatReviewCount(summary.ratingParticipantCount)}개 평점(
            {formatReviewPersonCount(summary.ratingParticipantCount)} 참여)
          </span>
        </div>
      </div>
    </section>
  );
}
