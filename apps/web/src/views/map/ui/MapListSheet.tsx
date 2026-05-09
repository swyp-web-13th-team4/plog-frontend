'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRouter } from 'next/navigation';

import { BottomSheet, Button, Divider, Icon, Select, Switch } from '@plog/ui';

import MapPlaceItem from '@/views/map/ui/MapPlaceItem';

import { type MapSortType, type PlaceLayer } from '@/entities/place';

import { BookmarkEmptyState, RecordEmptyState } from '@/shared/ui';

import { type MapSheetPlace } from '../model/types';
import { useMapCountQuery } from '../model/use-map-count-query';
import { useMapSheetQuery } from '../model/use-map-sheet-query';

const RECORD_SORT_OPTIONS: { value: MapSortType; label: string }[] = [
  { value: 'LATEST', label: '최신순' },
  { value: 'RECORD_COUNT', label: '기록순' },
];

const BOOKMARK_SORT_OPTIONS: { value: MapSortType; label: string }[] = [
  { value: 'LATEST', label: '최신순' },
  { value: 'RECORD_COUNT', label: '기록순' },
];

export type MapListSheetProps = {
  handle: ReturnType<typeof BottomSheet.createHandle>;
  listHandle: ReturnType<typeof BottomSheet.createHandle>;
  recordVisible: boolean;
  bookmarkVisible: boolean;
  onToggleRecord: (v: boolean) => void;
  onToggleBookmark: (v: boolean) => void;
  onPlaceSelect?: (
    placeId: number,
    type: PlaceLayer,
    latitude: number,
    longitude: number,
  ) => void;
};

type LayerSwitchRowProps = {
  icon: ReactNode;
  iconBg: string;
  label: string;
  count: number;
  visible: boolean;
  onToggle: (v: boolean) => void;
  onClick: () => void;
};

function LayerSwitchRow({
  icon,
  iconBg,
  label,
  count,
  visible,
  onToggle,
  onClick,
}: LayerSwitchRowProps) {
  return (
    <div className="flex w-full items-center gap-3 py-4">
      <div
        role="button"
        tabIndex={0}
        className="flex flex-1 cursor-pointer items-center gap-3"
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-full ${iconBg} text-semantic-object-inverse`}
        >
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="title-xs flex items-center gap-2 text-semantic-object-boldest">
            {label}
            <Icon
              name="chevron-right"
              size={20}
              className="text-semantic-object-subtle"
            />
          </span>
          <span className="body-sm text-semantic-object-subtle">{count}개</span>
        </div>
      </div>
      <div data-base-ui-swipe-ignore>
        <Switch checked={visible} onCheckedChange={onToggle} />
      </div>
    </div>
  );
}

type PlaceListProps = {
  layer: PlaceLayer;
  sortOptions: { value: MapSortType; label: string }[];
  emptyView: ReactNode;
  onPlaceClick: (place: MapSheetPlace) => void;
};

function PlaceList({
  layer,
  sortOptions,
  emptyView,
  onPlaceClick,
}: PlaceListProps) {
  const [sort, setSort] = useState<MapSortType>(sortOptions[0].value);

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMapSheetQuery(layer, sort);

  const { ref, inView } = useInView({ rootMargin: '0px 0px 200px 0px' });

  const places = data?.pages.flatMap((p) => p.content) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return null;

  if (places.length === 0) {
    return emptyView;
  }

  return (
    <>
      <div className="flex w-full shrink-0 items-center">
        <Select
          items={sortOptions}
          value={sort}
          onValueChange={(v) => setSort(v as MapSortType)}
          aria-label="정렬"
        />
      </div>
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 overflow-y-auto overscroll-contain">
          <div className="divide-y divide-semantic-object-subtler">
            {places.map((place) => (
              <MapPlaceItem
                key={place.placeId}
                layer={layer}
                place={place}
                onClick={() => onPlaceClick(place)}
              />
            ))}
          </div>
          <div ref={ref} aria-hidden="true" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4">
          <BottomSheet.Close
            render={
              <button
                type="button"
                className="label-md pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-full bg-semantic-accent-normal px-6 py-3 text-semantic-system-white"
              >
                지도 보기
                <Icon
                  name="chevron-down"
                  size={20}
                  className="text-semantic-object-inverse"
                />
              </button>
            }
          />
        </div>
      </div>
    </>
  );
}

export default function MapListSheet({
  handle,
  listHandle,
  recordVisible,
  bookmarkVisible,
  onToggleRecord,
  onToggleBookmark,
  onPlaceSelect,
}: MapListSheetProps) {
  const [listView, setListView] = useState<'record' | 'bookmark'>('record');
  const [listSnap, setListSnap] = useState<number>(0.4);

  const { data: countData } = useMapCountQuery();

  const router = useRouter();

  const recordCount = countData?.recordCount ?? 0;
  const bookmarkCount = countData?.bookmarkCount ?? 0;

  const handleNavigate = (target: 'record' | 'bookmark') => {
    setListView(target);
    setListSnap(0.4);
    handle.close();
    listHandle.open(null);
  };

  const handleBack = () => {
    listHandle.close();
    handle.open(null);
  };

  const handlePlaceClick = (place: MapSheetPlace, type: PlaceLayer) => {
    listHandle.close();
    handle.close();
    onPlaceSelect?.(place.placeId, type, place.latitude, place.longitude);
  };

  return (
    <>
      <BottomSheet handle={handle} modal={false} disablePointerDismissal>
        <BottomSheet.Content
          backdrop={false}
          className="mb-bottom-tab max-w-layout"
        >
          <BottomSheet.Handle />
          <BottomSheet.Body className="flex flex-col">
            <LayerSwitchRow
              icon={<Icon name="pencil-filled" size={20} />}
              iconBg="bg-semantic-accent-normal"
              label="내 기록"
              count={recordCount}
              visible={recordVisible}
              onToggle={onToggleRecord}
              onClick={() => handleNavigate('record')}
            />
            <Divider thickness="small" />
            <LayerSwitchRow
              icon={<Icon name="bookmark-filled" size={20} />}
              iconBg="bg-semantic-theme-sky-normal"
              label="북마크"
              count={bookmarkCount}
              visible={bookmarkVisible}
              onToggle={onToggleBookmark}
              onClick={() => handleNavigate('bookmark')}
            />
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
      <BottomSheet
        handle={listHandle}
        modal={false}
        disablePointerDismissal
        snapPoints={[0.4, 1]}
        snapPoint={listSnap}
        onSnapPointChange={(s) => setListSnap((s ?? 0.4) as number)}
      >
        <BottomSheet.Content
          backdrop={false}
          className="mb-bottom-tab h-[calc(90%-96px)] max-w-layout"
        >
          <BottomSheet.Handle />
          <BottomSheet.Header className="justify-start gap-2.5">
            <button
              type="button"
              aria-label="뒤로 가기"
              onClick={handleBack}
              className="flex cursor-pointer items-center justify-center text-semantic-object-boldest"
            >
              <Icon name="chevron-left" size={24} />
            </button>
            <BottomSheet.Title>
              {listView === 'record' ? '내 기록' : '북마크'}
            </BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {listView === 'record' ? (
              <PlaceList
                layer="record"
                sortOptions={RECORD_SORT_OPTIONS}
                emptyView={
                  <RecordEmptyState
                    description={
                      '오늘의 작업 일지나 기억하고 싶은 장소를\n첫 기록으로 남겨보세요.'
                    }
                    actions={
                      <Button
                        variant="outline"
                        size="medium"
                        onClick={() => router.push('/log')}
                      >
                        기록 작성하기
                      </Button>
                    }
                    className="flex-1 justify-center py-12"
                  />
                }
                onPlaceClick={(place) => handlePlaceClick(place, 'record')}
              />
            ) : (
              <PlaceList
                layer="bookmark"
                sortOptions={BOOKMARK_SORT_OPTIONS}
                emptyView={
                  <BookmarkEmptyState className="flex-1 justify-center py-12" />
                }
                onPlaceClick={(place) => handlePlaceClick(place, 'bookmark')}
              />
            )}
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
}
