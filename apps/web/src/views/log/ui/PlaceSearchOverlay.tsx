'use client';

import { type ReactNode, useCallback, useState } from 'react';

import Script from 'next/script';

import { AppBar, useToast } from '@plog/ui';

import { PlaceSearchContent } from '@/widgets/place-search';

import {
  createSelectedPlace,
  PlaceSearchInput,
  type RecentPlace,
  type SelectedPlace,
  useDeleteRecentPlaceMutation,
  useDeleteRecentPlacesMutation,
  useRecentPlacesQuery,
  useSaveRecentPlaceMutation,
} from '@/features/place-search';

import { KAKAO_MAP_SDK_URL } from '@/shared/api/constants';
import { useScrollLock } from '@/shared/lib/scroll-lock';
import {
  FetchErrorEmptyState,
  PlaceSearchIdleState,
  SearchEmptyState,
} from '@/shared/ui';

import { useKakaoPlaceSearch } from '../lib/use-kakao-place-search';
import PlaceSearchResultList from './PlaceSearchResultList';

function CenteredView({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-semantic-bg-deep p-6">
      {children}
    </div>
  );
}

type PlaceSearchOverlayProps = {
  onSelectPlace: (place: SelectedPlace) => Promise<void>;
  onClose: () => void;
};

export default function PlaceSearchOverlay({
  onSelectPlace,
  onClose,
}: PlaceSearchOverlayProps) {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkLoadError, setSdkLoadError] = useState(false);

  const { query, places, searchState, handleQueryChange, handleClearQuery } =
    useKakaoPlaceSearch(sdkLoaded);
  const { data: recentPlaces = [] } = useRecentPlacesQuery();
  const saveRecentPlaceMutation = useSaveRecentPlaceMutation();
  const deleteRecentPlaceMutation = useDeleteRecentPlaceMutation();
  const deleteRecentPlacesMutation = useDeleteRecentPlacesMutation();

  const { toast } = useToast();

  useScrollLock();

  const displayState = sdkLoadError ? 'error' : searchState;

  const handleKakaoReady = useCallback(() => {
    window.kakao?.maps.load(() => setSdkLoaded(true));
  }, []);

  const saveAndSelect = async (place: SelectedPlace) => {
    try {
      await saveRecentPlaceMutation.mutateAsync({
        placeName: place.name,
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
      });
      await onSelectPlace(place);
    } catch {
      toast({
        type: 'error',
        description: '장소 저장에 실패했어요. 다시 시도해 주세요.',
      });
    }
  };

  const handleSelectPlace = (
    place: kakao.maps.services.PlacesSearchResultItem,
  ) => saveAndSelect(createSelectedPlace(place));

  const handleSelectRecentPlace = (place: RecentPlace) =>
    saveAndSelect({
      id: String(place.id),
      name: place.placeName,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
    });

  const handleRemoveRecentPlace = (id: number) => {
    deleteRecentPlaceMutation.mutate(id);
  };

  const handleClearRecentPlaces = () => {
    deleteRecentPlacesMutation.mutate();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar variant="navigation" title="장소 검색" onBack={onClose} />
      </header>
      <Script
        src={KAKAO_MAP_SDK_URL}
        strategy="afterInteractive"
        onReady={handleKakaoReady}
        onError={() => setSdkLoadError(true)}
      />
      <section className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-col bg-semantic-bg-standard pt-[var(--spacing-header)]">
        <div className="sticky top-[var(--spacing-header)] z-10 border-b border-semantic-stroke-subtler bg-semantic-bg-standard px-6 py-6">
          <PlaceSearchInput
            value={query}
            onChange={handleQueryChange}
            onClear={handleClearQuery}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <PlaceSearchContent
            state={displayState}
            resultList={
              <PlaceSearchResultList
                places={places}
                query={query}
                onSelect={handleSelectPlace}
              />
            }
            recentPlaces={recentPlaces}
            onRecentSelect={handleSelectRecentPlace}
            onRecentRemove={handleRemoveRecentPlace}
            onRecentClear={handleClearRecentPlaces}
            idleView={
              <CenteredView>
                <PlaceSearchIdleState />
              </CenteredView>
            }
            emptyView={
              <CenteredView>
                <SearchEmptyState description="장소 이름이나 주소가 정확한지 확인해 주세요" />
              </CenteredView>
            }
            errorView={
              <CenteredView>
                <FetchErrorEmptyState
                  onRetry={() => window.location.reload()}
                />
              </CenteredView>
            }
          />
        </div>
      </section>
    </>
  );
}
