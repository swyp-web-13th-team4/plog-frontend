'use client';

import { type ReactNode, useMemo, useState } from 'react';

import { BottomSheet, Button, Divider, Icon, Select, Switch } from '@plog/ui';

import MapPlaceItem from '@/views/map/ui/MapPlaceItem';

import { type Place, type PlaceLayer } from '@/entities/place';

import { BookmarkEmptyState, RecordEmptyState } from '@/shared/ui';

type RecordSort = 'latest' | 'records' | 'worktime' | 'focus';
type BookmarkSort = 'latest' | 'focus';

const RECORD_SORT_OPTIONS: { value: RecordSort; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'records', label: '기록순' },
  { value: 'worktime', label: '작업시간순' },
  { value: 'focus', label: '집중도순' },
];

const BOOKMARK_SORT_OPTIONS: { value: BookmarkSort; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'focus', label: '집중도순' },
];

export type MapListSheetProps = {
  handle: ReturnType<typeof BottomSheet.createHandle>;
  listHandle: ReturnType<typeof BottomSheet.createHandle>;
  recordPlaces: Place[];
  bookmarkPlaces: Place[];
  recordVisible: boolean;
  bookmarkVisible: boolean;
  onToggleRecord: (v: boolean) => void;
  onToggleBookmark: (v: boolean) => void;
  onPlaceSelect?: (place: Place, type: PlaceLayer) => void;
};

function sortPlaces(places: Place[], sort: string): Place[] {
  return [...places].sort((a, b) => {
    if (sort === 'records') return (b.recordCount ?? 0) - (a.recordCount ?? 0);
    if (sort === 'worktime') return b.totalWorkHours - a.totalWorkHours;
    if (sort === 'focus') return b.averageFocus - a.averageFocus;
    return 0;
  });
}

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
  places: Place[];
  placeType: PlaceLayer;
  sortOptions: { value: string; label: string }[];
  emptyView: ReactNode;
  onPlaceClick: (place: Place) => void;
};

function PlaceList({
  places,
  placeType,
  sortOptions,
  emptyView,
  onPlaceClick,
}: PlaceListProps) {
  const [sort, setSort] = useState(sortOptions[0].value);
  const sorted = useMemo(() => sortPlaces(places, sort), [places, sort]);

  return (
    <>
      <div className="flex w-full shrink-0 items-center pb-3">
        <Select
          items={sortOptions}
          value={sort}
          onValueChange={(v) => setSort(v as string)}
          aria-label="정렬"
        />
      </div>
      {sorted.length === 0 ? (
        emptyView
      ) : (
        <div className="relative min-h-0 flex-1">
          <div
            className={`absolute inset-0 divide-y overflow-y-auto overscroll-contain ${
              placeType === 'record'
                ? 'divide-semantic-object-subtler'
                : 'divide-semantic-stroke-assistive'
            }`}
          >
            {sorted.map((place) => (
              <MapPlaceItem
                key={place.id}
                place={place}
                onClick={() => onPlaceClick(place)}
              />
            ))}
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
      )}
    </>
  );
}

export default function MapListSheet({
  handle,
  listHandle,
  recordPlaces,
  bookmarkPlaces,
  recordVisible,
  bookmarkVisible,
  onToggleRecord,
  onToggleBookmark,
  onPlaceSelect,
}: MapListSheetProps) {
  const [listView, setListView] = useState<'record' | 'bookmark'>('record');
  const [listSnap, setListSnap] = useState<number>(0.4);

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

  const handlePlaceClick = (place: Place, type: PlaceLayer) => {
    listHandle.close();
    handle.close();
    onPlaceSelect?.(place, type);
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
              count={recordPlaces.length}
              visible={recordVisible}
              onToggle={onToggleRecord}
              onClick={() => handleNavigate('record')}
            />
            <Divider thickness="small" />
            <LayerSwitchRow
              icon={<Icon name="bookmark-filled" size={20} />}
              iconBg="bg-semantic-theme-sky-normal"
              label="북마크"
              count={bookmarkPlaces.length}
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
                places={recordPlaces}
                placeType="record"
                sortOptions={RECORD_SORT_OPTIONS}
                emptyView={
                  <RecordEmptyState
                    description="오늘의 작업 일지나 기억하고 싶은 장소를\n첫 기록으로 남겨보세요."
                    actions={
                      <Button variant="outline" size="medium">
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
                places={bookmarkPlaces}
                placeType="bookmark"
                sortOptions={BOOKMARK_SORT_OPTIONS}
                emptyView={
                  <BookmarkEmptyState
                    description="마음에 드는 장소를 발견하면\n북마크를 눌러 저장해 보세요."
                    className="flex-1 justify-center py-12"
                  />
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
