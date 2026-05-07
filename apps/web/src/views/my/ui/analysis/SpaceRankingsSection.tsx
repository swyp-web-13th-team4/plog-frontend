import { Icon, type IconName } from '@plog/ui';
import { cn } from '@plog/utils';

import { PLACE_CATEGORIES } from '@/entities/place/model/place-category';
import { type AnalyticsSpaceRanking } from '@/entities/user';

const CATEGORY_ICONS: Record<string, IconName> = {
  cafe: 'coffee-filled',
  'study-cafe': 'graduation-filled',
  library: 'book-filled',
  office: 'bag-filled',
  'shared-office': 'company-filled',
  etc: 'inbox-filled',
};

function getCategoryLabel(value: string) {
  return PLACE_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

const EMPTY_SLOTS: null[] = [null, null, null];

const EMPTY_SLOT_CATEGORIES: Record<number, string> = {
  1: 'cafe',
  2: 'library',
  3: 'shared-office',
};

type SpaceRankingItemProps = {
  ranking: AnalyticsSpaceRanking | null;
  rank: number;
  isLocked: boolean;
};

function SpaceRankingItem({ ranking, rank, isLocked }: SpaceRankingItemProps) {
  const isFirst = rank === 1;
  const isEmpty = ranking === null;
  const showQuestion = isLocked || isEmpty;

  let categoryLabel: string;

  if (!isEmpty) {
    categoryLabel = getCategoryLabel(ranking.placeCategoryName);
  } else if (isLocked) {
    categoryLabel = getCategoryLabel(EMPTY_SLOT_CATEGORIES[rank] ?? 'etc');
  } else {
    categoryLabel = '---';
  }

  const circleClassName = cn(
    'flex items-center justify-center rounded-full',
    isFirst ? 'size-24' : 'size-18',
    isFirst && showQuestion && 'bg-semantic-bg-deeper',
    isFirst && !showQuestion && 'bg-semantic-accent-subtle',
    !isFirst && 'bg-semantic-bg-deep',
  );

  const iconClassName = cn(
    isFirst && showQuestion && 'text-semantic-object-normal',
    isFirst && !showQuestion && 'text-semantic-accent-normal',
    !isFirst && 'text-semantic-object-subtle',
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <span className="label-md text-semantic-object-bold">{rank}위</span>
        <div className={circleClassName}>
          <Icon
            name={
              showQuestion
                ? 'question'
                : (CATEGORY_ICONS[ranking!.placeCategoryName] ?? 'grid')
            }
            size={isFirst ? 48 : 36}
            className={iconClassName}
          />
        </div>
      </div>
      <p
        className={cn(
          'label-lg mt-4 mb-1',
          isLocked
            ? 'text-semantic-object-bold'
            : 'text-semantic-object-boldest',
        )}
      >
        {categoryLabel}
      </p>
      <p className="label-sm text-semantic-object-normal">
        집중도 {isEmpty ? '-' : ranking!.averageFocus}
      </p>
      <p className="caption-md text-semantic-object-subtle">
        ({isEmpty ? '-' : ranking!.postCount}회)
      </p>
    </div>
  );
}

type SpaceRankingsSectionProps = {
  data: AnalyticsSpaceRanking[] | null;
  isLocked: boolean;
};

export default function SpaceRankingsSection({
  data,
  isLocked,
}: SpaceRankingsSectionProps) {
  const hasData = data && data.length > 0;
  if (!hasData && !isLocked) return null;

  const slots: (AnalyticsSpaceRanking | null)[] =
    !isLocked && hasData
      ? [data[0] ?? null, data[1] ?? null, data[2] ?? null]
      : EMPTY_SLOTS;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="title-sm text-semantic-object-boldest">공간별 순위</h2>
      <div className="flex flex-col gap-3 rounded-xl border border-semantic-stroke-subtle bg-semantic-object-inverse px-5 py-6">
        <div className="flex items-end justify-around">
          {slots.map((ranking, idx) => (
            <SpaceRankingItem
              key={idx + 1}
              ranking={ranking}
              rank={idx + 1}
              isLocked={isLocked}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
