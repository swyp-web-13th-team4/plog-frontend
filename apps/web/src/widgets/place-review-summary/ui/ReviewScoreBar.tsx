// ui/ReviewScoreBar.tsx
import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { REVIEW_ENVIRONMENT_GROUP_MAP } from '@/entities/review';

import {
  type PlaceReviewMetric,
  type PlaceReviewVariant,
} from '../model/types';

type ReviewScoreBarProps = {
  metric: PlaceReviewMetric;
  totalCount: number;
  variant: PlaceReviewVariant;
  rank: number;
};

function getBarClassName(variant: PlaceReviewVariant, rank: number) {
  if (variant === 'record') {
    if (rank === 1) return 'bg-semantic-accent-neutral';
    if (rank === 2) return 'bg-semantic-accent-alternative';
    if (rank === 3) return 'bg-semantic-accent-subtle';
    return 'bg-semantic-accent-subtler';
  }

  if (rank === 1) return 'bg-semantic-theme-sky-neutral';
  if (rank === 2) return 'bg-semantic-theme-sky-alternative';
  if (rank === 3) return 'bg-semantic-theme-sky-assistive';
  return 'bg-semantic-theme-sky-subtle';
}

export default function ReviewScoreBar({
  metric,
  totalCount,
  variant,
  rank,
}: ReviewScoreBarProps) {
  const ratio = totalCount > 0 ? metric.count / totalCount : 0;
  const normalizedRatio = Math.min(Math.max(ratio, 0), 1);
  const width =
    totalCount === 0 ? '0%' : `${Math.max(normalizedRatio * 100, 8)}%`;
  const barClassName = getBarClassName(variant, rank);
  const environmentGroup = REVIEW_ENVIRONMENT_GROUP_MAP[metric.type];

  return (
    <div className="flex gap-2">
      <div className="flex w-21.25 items-center gap-1.5 justify-self-start rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white pl-2.5">
        <Icon
          name={environmentGroup.iconName}
          size={14}
          className="text-semantic-object-subtle"
        />
        <span className="caption-md text-semantic-object-boldest">
          {environmentGroup.title}
        </span>
      </div>

      <div className="relative h-11 flex-1 overflow-hidden rounded-xl bg-semantic-bg-deep">
        <div
          className={cn('h-full rounded-xl', barClassName)}
          style={{ width }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-5">
          <span className="label-sm text-semantic-object-boldest">
            {metric.label}
          </span>
          <span className="label-sm text-semantic-object-boldest">
            {metric.count}명
          </span>
        </div>
      </div>
    </div>
  );
}
