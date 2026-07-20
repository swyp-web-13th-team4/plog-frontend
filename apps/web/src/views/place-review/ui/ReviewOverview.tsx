'use client';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { type PlaceLayer } from '@/entities/place';
import {
  type ReviewEnvironmentIconName,
  type ReviewEnvironmentName,
} from '@/entities/review';

type ReviewEnvironmentSummaryItem = {
  environmentName: ReviewEnvironmentName;
  title: string;
  iconName: ReviewEnvironmentIconName;
  label: string;
  score: number;
};

const MOCK_REVIEW_ENVIRONMENTS: ReviewEnvironmentSummaryItem[] = [
  {
    environmentName: 'spaceSize',
    title: '공간 크기',
    iconName: 'company-filled',
    label: '넓은 편이에요',
    score: 0,
  },
  {
    environmentName: 'noiseLevel',
    title: '소음 수준',
    iconName: 'megaphone-filled',
    label: '조용한 편이에요',
    score: 0,
  },
  {
    environmentName: 'congestionLevel',
    title: '혼잡도',
    iconName: 'smile-filled',
    label: '여유 있는 편이에요',
    score: 0,
  },
  {
    environmentName: 'focusLevel',
    title: '집중도',
    iconName: 'fire-filled',
    label: '보통이에요',
    score: 0,
  },
];

const RECORD_BAR_COLORS = [
  'bg-semantic-accent-neutral',
  'bg-semantic-accent-alternative',
  'bg-semantic-accent-subtle',
  'bg-semantic-accent-subtler',
] as const;

const BOOKMARK_BAR_COLORS = [
  'bg-semantic-theme-sky-neutral',
  'bg-semantic-theme-sky-alternative',
  'bg-semantic-theme-sky-assistive',
  'bg-semantic-theme-sky-subtle',
] as const;

export default function ReviewOverview({
  placeType,
}: {
  placeType: PlaceLayer;
}) {
  const isRecord = placeType === 'record';
  const maxCount = Math.max(
    ...MOCK_REVIEW_ENVIRONMENTS.map((environment) => environment.score),
    1,
  );
  const countRanks = [
    ...new Set(
      MOCK_REVIEW_ENVIRONMENTS.map((environment) => environment.score).sort(
        (a, b) => b - a,
      ),
    ),
  ];

  const barColors = isRecord ? RECORD_BAR_COLORS : BOOKMARK_BAR_COLORS;

  return (
    <section className="flex flex-col gap-5 px-6 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="title-xs text-semantic-object-boldest mobile:text-semantic-label-lg mobile:leading-semantic-label-lg mobile:font-semantic-label-lg">
            방문자 리뷰
          </span>
          <p
            className={cn(
              'title-xs mobile:text-semantic-label-lg mobile:leading-semantic-label-lg mobile:font-semantic-label-lg',
              isRecord
                ? 'text-semantic-accent-normal'
                : 'text-semantic-theme-sky-normal',
            )}
          >
            9,999<span className="text-semantic-object-boldest">개</span>
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          <Icon
            name="star-filled"
            size={22}
            className="text-semantic-object-bold"
          />
          <span className="label-xl text-semantic-object-bold mobile:text-semantic-label-lg mobile:leading-semantic-label-lg mobile:font-semantic-label-lg">
            4.27
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2.5">
        {MOCK_REVIEW_ENVIRONMENTS.map((environment) => {
          const percentage = (environment.score / maxCount) * 100;
          const rank = countRanks.indexOf(environment.score);
          const colorIndex = Math.min(rank, barColors.length - 1);

          return (
            <div
              key={environment.environmentName}
              className="grid grid-cols-[104px_minmax(0,1fr)] gap-2"
            >
              <div className="flex items-center gap-2 rounded-xl border border-semantic-stroke-subtle px-2.5 py-3">
                <Icon
                  name={environment.iconName}
                  size={16}
                  className="text-semantic-object-subtle"
                />
                <span className="label-sm text-semantic-object-boldest mobile:text-semantic-caption-md mobile:leading-semantic-caption-md mobile:font-semantic-caption-md">
                  {environment.title}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-primitive-gray-20">
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-xl',
                    barColors[colorIndex],
                  )}
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative flex h-full items-center justify-between gap-2 px-4 py-3">
                  <span className="label-sm text-semantic-object-boldest mobile:text-semantic-caption-md mobile:leading-semantic-caption-md mobile:font-semantic-caption-md">
                    {environment.label}
                  </span>
                  <span className="labem-sm shrink-0 text-semantic-object-boldest mobile:text-semantic-caption-md mobile:leading-semantic-caption-md mobile:font-semantic-caption-md">
                    {environment.score.toLocaleString()}명
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
