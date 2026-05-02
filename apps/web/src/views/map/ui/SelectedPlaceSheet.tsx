'use client';

import { Badge, BottomSheet, Button, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { type Place, type PlaceLayer } from '@/entities/place';

import { ImageWithFallback } from '@/shared/ui';

export type SelectedPlaceSheetProps = {
  place: Place | null;
  placeType: PlaceLayer;
  onClose: () => void;
  onBack?: () => void;
  onViewPosts: () => void;
  onCreatePost?: () => void;
};

type StatItemProps = {
  value: string;
  label: string;
  isRecord: boolean;
};

function StatItem({ value, label, isRecord }: StatItemProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <p
        className={cn(
          'title-md',
          isRecord
            ? 'text-semantic-accent-normal'
            : 'text-semantic-theme-sky-normal',
        )}
      >
        {value}
      </p>
      <p className="caption-md text-semantic-object-bold">{label}</p>
    </div>
  );
}

function PlaceStatBar({
  place,
  isRecord,
}: {
  place: Place;
  isRecord: boolean;
}) {
  const stats = isRecord
    ? [
        { value: String(place.recordCount ?? 0), label: '내 기록' },
        { value: `${place.totalWorkHours}h`, label: '총 작업시간' },
        { value: String(place.averageFocus), label: '평균 집중도' },
      ]
    : [
        { value: String(place.bookmarkCount ?? 0), label: '북마크 수' },
        { value: `${place.totalWorkHours}h`, label: '평균 작업시간' },
        { value: String(place.averageFocus), label: '평균 집중도' },
      ];

  return (
    <div
      className={cn(
        'flex items-center justify-around rounded-2xl border p-4',
        isRecord
          ? 'border-semantic-accent-subtle bg-semantic-accent-subtlest'
          : 'border-semantic-theme-sky-assistive bg-semantic-theme-sky-subtler',
      )}
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} isRecord={isRecord} />
      ))}
    </div>
  );
}

export default function SelectedPlaceSheet({
  place,
  placeType,
  onClose,
  onBack,
  onViewPosts,
  onCreatePost,
}: SelectedPlaceSheetProps) {
  const isRecord = placeType === 'record';

  return (
    <BottomSheet
      open={place !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal={false}
    >
      <BottomSheet.Content
        backdrop={false}
        className="mb-bottom-tab max-w-layout"
      >
        <BottomSheet.Handle />
        <BottomSheet.Body className="flex flex-col gap-4">
          {place && (
            <>
              <div className="relative aspect-[432/192] w-full overflow-hidden rounded-2xl bg-semantic-object-subtler">
                <ImageWithFallback
                  src={place.imageUrl}
                  alt={place.name}
                  fill
                  className="object-cover"
                />
                {onBack && (
                  <button
                    type="button"
                    aria-label="뒤로 가기"
                    onClick={onBack}
                    className="absolute top-3 left-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-semantic-system-black/40"
                  >
                    <Icon
                      name="chevron-left"
                      size={20}
                      className="text-semantic-object-inverse"
                    />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="title-sm text-semantic-object-boldest">
                    {place.name}
                  </p>
                  <Badge variant="soft" color="skyblue">
                    {place.category}
                  </Badge>
                </div>
                <p className="body-sm text-semantic-object-normal">
                  {place.address}
                </p>
              </div>

              <PlaceStatBar place={place} isRecord={isRecord} />

              {isRecord ? (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Button
                      variant="primary"
                      size="medium"
                      fullWidth
                      onClick={onViewPosts}
                    >
                      내 기록 보기
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="medium"
                      onClick={onCreatePost}
                    >
                      새 기록 추가
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="medium"
                  fullWidth
                  onClick={onViewPosts}
                >
                  게시글 보기
                </Button>
              )}
            </>
          )}
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
  );
}
