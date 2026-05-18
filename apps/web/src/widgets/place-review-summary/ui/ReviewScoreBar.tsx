// ui/ReviewScoreBar.tsx
import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatReviewPersonCount } from '../lib/utils';
import {
  type PlaceReviewMetric,
  type PlaceReviewVariant,
} from '../model/types';

type ReviewScoreBarProps = {
  metric: PlaceReviewMetric;
  totalCount: number;
  variant: PlaceReviewVariant;
};

const ICON_TYPE = {
  spaceSize: 'company-filled',
  noiseLevel: 'megaphone-filled',
  congestionLevel: 'smile-filled',
  focusLevel: 'fire-filled',
} as const;

function getBarClassName(variant: PlaceReviewVariant, ratio: number) {
  if (variant === 'record') {
    if (ratio >= 0.75) return 'bg-semantic-accent-neutral';
    if (ratio >= 0.5) return 'bg-semantic-accent-alternative';
    if (ratio >= 0.25) return 'bg-semantic-accent-subtle';
    return 'bg-semantic-accent-subtler';
  }

  if (ratio >= 0.75) return 'bg-semantic-theme-sky-neutral';
  if (ratio >= 0.5) return 'bg-semantic-theme-sky-alternative';
  if (ratio >= 0.25) return 'bg-semantic-theme-sky-assistive';
  return 'bg-semantic-theme-sky-subtle';
}

export default function ReviewScoreBar({
  metric,
  totalCount,
  variant,
}: ReviewScoreBarProps) {
  const ratio = totalCount > 0 ? metric.count / totalCount : 0;
  const normalizedRatio = Math.min(Math.max(ratio, 0), 1);
  const width =
    totalCount === 0 ? '0%' : `${Math.max(normalizedRatio * 100, 8)}%`;
  const barClassName = getBarClassName(variant, normalizedRatio);

  return (
    <div className="flex gap-2">
      <div className="flex size-11 items-center justify-center rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white">
        <Icon
          name={ICON_TYPE[metric.type]}
          size={20}
          className="text-semantic-object-subtle"
        />
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
            {formatReviewPersonCount(metric.count)}
          </span>
        </div>
      </div>
    </div>
  );
}
