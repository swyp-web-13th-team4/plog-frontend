'use client';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  type PlaceReviewSummary,
  type PlaceReviewVariant,
} from '../model/types';
import ReviewScoreBar from './ReviewScoreBar';

type ReviewSummaryProps = {
  summary: PlaceReviewSummary;
  variant: PlaceReviewVariant;
};

function getMetricRank(summary: PlaceReviewSummary, targetCount: number) {
  const rankedCounts = [
    ...new Set(summary.items.map(({ count }) => count)),
  ].sort((a, b) => b - a);

  return rankedCounts.indexOf(targetCount) + 1;
}

export default function ReviewSummary({
  summary,
  variant,
}: ReviewSummaryProps) {
  return (
    <section className="flex flex-col gap-5 px-6 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="title-xs text-semantic-object-boldest mobile:text-semantic-label-lg mobile:leading-semantic-label-lg mobile:font-semantic-label-lg">
            방문자 리뷰
          </h2>
          <span className="title-xs flex items-center text-semantic-object-boldest mobile:text-semantic-label-lg mobile:leading-semantic-label-lg mobile:font-semantic-label-lg">
            <span
              className={`${variant === 'record' ? 'text-semantic-accent-normal' : 'text-semantic-theme-sky-normal'}`}
            >
              {summary.totalCount}
            </span>
            개
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-semantic-object-bold">
          <Icon name="star-filled" size={18} />
          <span className="label-xl mobile:text-semantic-label-lg mobile:leading-semantic-label-lg mobile:font-semantic-label-lg">
            {summary.averageRating.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {summary.items.map((item) => (
          <ReviewScoreBar
            key={item.type}
            metric={item}
            totalCount={summary.totalCount}
            variant={variant}
            rank={getMetricRank(summary, item.count)}
          />
        ))}
      </div>
    </section>
  );
}
