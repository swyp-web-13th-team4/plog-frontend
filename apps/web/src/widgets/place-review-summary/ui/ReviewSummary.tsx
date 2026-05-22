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

export default function ReviewSummary({
  summary,
  variant,
}: ReviewSummaryProps) {
  return (
    <section className="flex flex-col gap-5 px-6 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="label-lg text-semantic-object-boldest">방문자 리뷰</h2>
          <span className="label-lg flex items-center text-semantic-object-boldest">
            <p
              className={cn(
                'title-xs',
                variant === 'record'
                  ? 'text-semantic-accent-normal'
                  : 'text-semantic-theme-sky-normal',
              )}
            >
              {summary.totalCount}
            </p>
            개
          </span>
        </div>
        <div className="text-semantic-objet-bold flex items-center gap-1.5">
          <Icon name="star-filled" size={18} />
          <span className="label-lg">{summary.averageRating.toFixed(2)}</span>
        </div>
      </div>

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
    </section>
  );
}
