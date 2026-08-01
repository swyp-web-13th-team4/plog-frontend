'use client';

import { Fragment } from 'react';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  type PlaceReviewSummary,
  REVIEW_ENVIRONMENT_GROUPS,
  REVIEW_ENVIRONMENT_LABELS,
} from '@/entities/review';

const BAR_COLORS = [
  'bg-semantic-accent-neutral',
  'bg-semantic-accent-alternative',
  'bg-semantic-accent-subtle',
  'bg-semantic-accent-subtler',
] as const;

export default function ReviewOverview({
  summary,
}: {
  summary: PlaceReviewSummary | null;
}) {
  const isEmptyEnvironment = !summary || summary.environments.length === 0;
  const environments = REVIEW_ENVIRONMENT_GROUPS.map(
    ({ name, title, iconName }) => {
      const environment = summary?.environments.find(
        ({ environmentName }) => environmentName === name,
      );

      return {
        name,
        title,
        iconName,
        label: environment
          ? REVIEW_ENVIRONMENT_LABELS[name][environment.score]
          : '-',
        count: environment?.count ?? 0,
      };
    },
  );
  const maxCount = Math.max(
    ...environments.map((environment) => environment.count),
    1,
  );
  const countRanks = [
    ...new Set(
      environments
        .map((environment) => environment.count)
        .sort((a, b) => b - a),
    ),
  ];

  return (
    <section className="flex flex-col gap-5 px-6 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="title-xs text-semantic-object-boldest">
            방문자 리뷰
          </span>
          <p className="title-xs text-semantic-accent-normal">
            {(summary?.reviewCount ?? 0).toLocaleString()}
            <span className="text-semantic-object-boldest">개</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Icon
            name="star-filled"
            boxed={false}
            className="size-5 text-semantic-theme-amber-neutral"
          />
          <span className="label-xl text-semantic-object-bold">
            {(summary?.averageRating ?? 0).toFixed(1)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-2 gap-y-2.5">
        {environments.map((environment) => {
          const percentage = (environment.count / maxCount) * 100;
          const rank = countRanks.indexOf(environment.count);
          const colorIndex = Math.min(rank, BAR_COLORS.length - 1);

          return (
            <Fragment key={environment.name}>
              <div className="flex items-center gap-2 rounded-xl border border-semantic-stroke-subtle p-3">
                <Icon
                  name={environment.iconName}
                  size={16}
                  className="text-semantic-object-subtle"
                />
                <span className="label-sm text-semantic-object-boldest">
                  {environment.title}
                </span>
              </div>

              <div
                className={cn(
                  'relative overflow-hidden rounded-xl',
                  isEmptyEnvironment
                    ? 'bg-semantic-object-subtler'
                    : 'bg-primitive-gray-20',
                )}
              >
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-xl',
                    BAR_COLORS[colorIndex],
                  )}
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative flex h-full items-center justify-between gap-2 px-4 py-3">
                  <span className="label-sm text-semantic-object-boldest">
                    {environment.label}
                  </span>
                  <span className="label-sm shrink-0 text-semantic-object-boldest">
                    {environment.count.toLocaleString()}명
                  </span>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
