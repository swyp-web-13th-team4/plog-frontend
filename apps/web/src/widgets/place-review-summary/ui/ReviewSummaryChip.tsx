import { Icon, type IconName } from '@plog/ui';

import { formatCompactReviewCount } from '../lib/utils';
import { type PlaceReviewMetric } from '../model/types';

const ICON_BY_TYPE: Record<PlaceReviewMetric['type'], IconName> = {
  spaceSize: 'company-filled',
  noiseLevel: 'megaphone-filled',
  congestionLevel: 'smile-filled',
  focusLevel: 'fire-filled',
};

type ReviewSummaryChipProps = {
  metric: PlaceReviewMetric;
};

export default function ReviewSummaryChip({ metric }: ReviewSummaryChipProps) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-3 rounded-full bg-semantic-bg-deep px-3 py-2.5">
      <div className="flex items-center gap-1">
        <Icon
          name={ICON_BY_TYPE[metric.type]}
          size={20}
          className="text-semantic-object-subtle"
        />
        <span className="label-sm text-semantic-object-boldest">
          {metric.label}
        </span>
      </div>
      <span className="label-sm text-semantic-object-boldest">
        {formatCompactReviewCount(metric.count)}
      </span>
    </div>
  );
}
