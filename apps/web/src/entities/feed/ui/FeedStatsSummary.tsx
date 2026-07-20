import { Fragment } from 'react/jsx-runtime';

import { Divider } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatDuration } from '@/shared/lib/datetime';

import { formatLikeCount } from '../lib/format';

type FeedStatsSummaryProps = {
  isUserOwnFeed: boolean;
  primaryLabel: '좋아요' | '북마크';
  primaryValue: number;
  totalWorkTime: number;
  focusLevel: number;
};

function ShowOutlineAboutFeed({
  value,
  label,
  isUserOwnFeed,
}: {
  value: number | string;
  label: string;
  isUserOwnFeed: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <span
        className={cn(
          'title-sm',
          isUserOwnFeed
            ? 'text-semantic-theme-green-normal'
            : 'text-semantic-theme-sky-normal',
        )}
      >
        {value}
      </span>
      <p className="caption-md text-semantic-object-bold">{label}</p>
    </div>
  );
}

export default function FeedStatsSummary({
  isUserOwnFeed,
  primaryLabel,
  primaryValue,
  totalWorkTime,
  focusLevel,
}: FeedStatsSummaryProps) {
  const stats = [
    { label: primaryLabel, value: formatLikeCount(primaryValue) },
    { label: '총 작업시간', value: formatDuration(totalWorkTime, 'en') },
    { label: '작업 집중도', value: focusLevel },
  ];

  const dividerClassName = isUserOwnFeed
    ? 'border-semantic-accent-subtle'
    : 'border-semantic-theme-sky-assistive';

  return (
    <div
      className={cn(
        'rounded-xl border py-4',
        isUserOwnFeed
          ? 'border-semantic-accent-subtle bg-semantic-theme-green-subtler'
          : 'border-semantic-theme-sky-assistive bg-semantic-theme-sky-subtler',
      )}
    >
      <div className="flex justify-between">
        {stats.map((stat, index) => (
          <Fragment key={stat.label}>
            {index > 0 && (
              <Divider
                orientation="vertical"
                className={cn('h-13', dividerClassName)}
              />
            )}
            <ShowOutlineAboutFeed
              value={stat.value}
              label={stat.label}
              isUserOwnFeed={isUserOwnFeed}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
