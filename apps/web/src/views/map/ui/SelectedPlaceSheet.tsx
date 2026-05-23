'use client';

import { Fragment } from 'react';

import { useRouter } from 'next/navigation';

import { Badge, BottomSheet, Button, Divider, Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { formatStudyDurationShort } from '@/entities/feed';
import { getCategoryLabel, type PlaceLayer } from '@/entities/place';

import { ImageWithFallback } from '@/shared/ui';

import { type MapPinDetail } from '../model/types';

const mockPlaceReviewStats = {
  averageRating: 4.27,
  totalCount: 1200,
};

export type SelectedPlaceSheetProps = {
  place: MapPinDetail | null;
  placeType: PlaceLayer;
  onClose: () => void;
  onBack?: () => void;
  onViewPosts: () => void;
  onCreatePost?: () => void;
};

function PlaceStatBar({
  place,
  isRecord,
}: {
  place: MapPinDetail;
  isRecord: boolean;
}) {
  const stats = [
    {
      value: place.count.toLocaleString(),
      label: isRecord ? '내 기록' : '북마크 수',
    },
    {
      value: formatStudyDurationShort(place.totalStudyTime),
      label: '총 작업시간',
    },
    { value: String(place.avgFocus), label: '평균 집중도' },
  ];

  const dividerClassName = isRecord
    ? 'border-semantic-accent-subtle'
    : 'border-semantic-theme-sky-assistive';

  return (
    <div
      className={cn(
        'rounded-xl border py-4',
        isRecord
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
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span
                className={cn(
                  'title-sm',
                  isRecord
                    ? 'text-semantic-theme-green-normal'
                    : 'text-semantic-theme-sky-normal',
                )}
              >
                {stat.value}
              </span>
              <p className="caption-md text-semantic-object-bold">
                {stat.label}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
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
  const router = useRouter();
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
                  src={place.thumbnailUrl}
                  alt={place.placeName}
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
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-col gap-1.5">
                  <Badge variant="soft" color="orange" className="w-fit">
                    {getCategoryLabel(place.placeCategory)}
                  </Badge>
                  <p className="title-sm text-semantic-object-boldest">
                    {place.placeName}
                  </p>
                </div>
                <p className="body-sm text-semantic-object-normal">
                  {place.address}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Icon
                  name="star-filled"
                  size={20}
                  className="text-semantic-theme-amber-neutral"
                />
                <div className="flex items-center gap-1.5">
                  <span className="label-sm text-semantic-object-bold">
                    {mockPlaceReviewStats.averageRating}
                  </span>
                  <Divider
                    thickness="small"
                    orientation="vertical"
                    className="h-3"
                  />
                  <button
                    onClick={() => {
                      router.push(
                        `/reviews?placeId=${place.placeId}&type=${placeType}`,
                      );
                    }}
                    className="caption-md cursor-pointer text-semantic-object-normal underline"
                  >
                    리뷰 {mockPlaceReviewStats.totalCount}개
                  </button>
                </div>
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
