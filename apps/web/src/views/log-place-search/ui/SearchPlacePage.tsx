'use client';

import { type ReactNode, useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';
import Script from 'next/script';

import { Button, EmptyState } from '@plog/ui';

import { PlaceSearchContent } from '@/widgets/place-search';

import {
  buildSelectedPlaceSearchParams,
  createSelectedPlace,
  PlaceSearchInput,
  type RecentPlace,
  useDeleteRecentPlaceMutation,
  useDeleteRecentPlacesMutation,
  useRecentPlacesQuery,
  useSaveRecentPlaceMutation,
} from '@/features/place-search';

import LoadingEmptyGraphic from '@/shared/assets/empty-graphics/loading-empty.svg';
import PlaceEmptyGraphic from '@/shared/assets/empty-graphics/place-empty.svg';
import SearchEmptyGraphic from '@/shared/assets/empty-graphics/search-empty.svg';

import { useKakaoPlaceSearch } from '../lib/use-kakao-place-search';
import SearchResultList from './SearchResultList';

function CenteredView({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-semantic-bg-deep p-6">
      {children}
    </div>
  );
}

export default function SearchPlacePage() {
  const router = useRouter();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkLoadError, setSdkLoadError] = useState(false);

  const { query, places, searchState, handleQueryChange, handleClearQuery } =
    useKakaoPlaceSearch(sdkLoaded);
  const { data: recentPlaces = [] } = useRecentPlacesQuery();
  const saveRecentPlaceMutation = useSaveRecentPlaceMutation();
  const deleteRecentPlaceMutation = useDeleteRecentPlaceMutation();
  const deleteRecentPlacesMutation = useDeleteRecentPlacesMutation();

  const displayState = sdkLoadError ? 'error' : searchState;

  const handleKakaoReady = useCallback(() => {
    window.kakao?.maps.load(() => setSdkLoaded(true));
  }, []);

  const handleSelectPlace = async (
    place: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    const selectedPlace = createSelectedPlace(place);
    const params = buildSelectedPlaceSearchParams(selectedPlace);

    try {
      await saveRecentPlaceMutation.mutateAsync({
        placeName: selectedPlace.name,
        address: selectedPlace.address,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });
    } finally {
      router.push(`/log?${params.toString()}`);
    }
  };

  const handleSelectRecentPlace = async (place: RecentPlace) => {
    const selectedPlace = {
      id: String(place.id),
      name: place.placeName,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
    };
    const params = buildSelectedPlaceSearchParams(selectedPlace);

    try {
      await saveRecentPlaceMutation.mutateAsync({
        placeName: selectedPlace.name,
        address: selectedPlace.address,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });
    } finally {
      router.push(`/log?${params.toString()}`);
    }
  };

  const handleRemoveRecentPlace = (id: number) => {
    deleteRecentPlaceMutation.mutate(id);
  };

  const handleClearRecentPlaces = () => {
    deleteRecentPlacesMutation.mutate();
  };

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onReady={handleKakaoReady}
        onError={() => setSdkLoadError(true)}
      />
      <section className="flex min-h-[calc(100dvh-var(--spacing-header)-var(--spacing-bottom-tab))] flex-col bg-semantic-bg-standard">
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
              <SearchResultList
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
                <EmptyState
                  title="어디에서 작업하셨나요?"
                  description="오늘 몰입했던 그 장소를 검색해 보세요"
                  graphic={<PlaceEmptyGraphic />}
                />
              </CenteredView>
            }
            emptyView={
              <CenteredView>
                <EmptyState
                  title="검색 결과가 없어요"
                  description="장소 이름이나 주소가 정확한지 확인해 주세요"
                  graphic={<SearchEmptyGraphic />}
                />
              </CenteredView>
            }
            errorView={
              <CenteredView>
                <EmptyState
                  title="정보를 불러오지 못했어요"
                  description="인터넷 연결 상태를 확인하고 다시 시도해 주세요"
                  graphic={<LoadingEmptyGraphic />}
                  actions={
                    <Button
                      type="button"
                      variant="outline"
                      size="small"
                      onClick={() => window.location.reload()}
                    >
                      새로 고침
                    </Button>
                  }
                />
              </CenteredView>
            }
          />
        </div>
      </section>
    </>
  );
}
