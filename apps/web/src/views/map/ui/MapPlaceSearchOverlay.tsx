'use client';

import { useState } from 'react';

import { AppBar } from '@plog/ui';

import { HighlightText, PlaceSearchInput } from '@/features/place-search';

import { useDebounce } from '@/shared/lib/debounce';
import {
  FetchErrorEmptyState,
  PlaceSearchIdleState,
  SearchEmptyState,
} from '@/shared/ui';

import {
  type MapSearchPlace,
  useMapSearchQuery,
} from '../model/use-map-search-query';

function SearchResultList({
  places,
  query,
  onSelect,
}: {
  places: MapSearchPlace[];
  query: string;
  onSelect: (place: MapSearchPlace) => void;
}) {
  return (
    <ul className="bg-semantic-bg-standard">
      {places.map((place) => (
        <li key={place.placeId}>
          <button
            type="button"
            className="w-full cursor-pointer border-b border-semantic-stroke-subtler px-6 py-5 text-left hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-semantic-accent-normal"
            onClick={() => onSelect(place)}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="body-lg text-semantic-object-boldest">
                <HighlightText text={place.placeName} query={query} />
              </p>
              <span className="body-sm shrink-0 text-semantic-object-subtle">
                {place.lastStudyDate.replaceAll('-', '.')}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

type MapPlaceSearchOverlayProps = {
  onSelectPlace: (place: MapSearchPlace) => void;
  onClose: () => void;
};

export default function MapPlaceSearchOverlay({
  onSelectPlace,
  onClose,
}: MapPlaceSearchOverlayProps) {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword);

  const {
    data: places,
    isPending,
    isError,
    refetch,
  } = useMapSearchQuery(debouncedKeyword);

  const hasQuery = debouncedKeyword.trim().length > 0;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar variant="navigation" title="장소 검색" onBack={onClose} />
      </header>
      <section className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-col bg-semantic-bg-standard pt-[var(--spacing-header)]">
        <div className="sticky top-[var(--spacing-header)] z-10 border-b border-semantic-stroke-subtler bg-semantic-bg-standard px-6 py-6">
          <PlaceSearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onClear={() => setKeyword('')}
          />
        </div>
        <div className="flex flex-1 flex-col">
          {!hasQuery ? (
            <div className="flex flex-1 items-center justify-center bg-semantic-bg-deep p-6">
              <PlaceSearchIdleState description="기록한 장소의 이름이나 주소로 검색해 보세요" />
            </div>
          ) : isPending ? null : isError ? (
            <div className="flex flex-1 items-center justify-center bg-semantic-bg-deep p-6">
              <FetchErrorEmptyState onRetry={refetch} />
            </div>
          ) : !places?.length ? (
            <div className="flex flex-1 items-center justify-center bg-semantic-bg-deep p-6">
              <SearchEmptyState
                title="아직 기록되지 않은 장소예요"
                description="장소 이름이 정확한지 확인해 주세요"
              />
            </div>
          ) : (
            <SearchResultList
              places={places}
              query={debouncedKeyword}
              onSelect={onSelectPlace}
            />
          )}
        </div>
      </section>
    </>
  );
}
