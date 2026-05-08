'use client';

import { type ReactNode, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Script from 'next/script';

import { PlaceSearchContent } from '@/widgets/place-search';

import {
  addRecentPlace,
  clearRecentPlaces,
  getRecentPlaces,
  PlaceSearchInput,
  type RecentPlace,
  removeRecentPlace,
} from '@/features/place-search';

import {
  FetchErrorEmptyState,
  PlaceSearchIdleState,
  SearchEmptyState,
} from '@/shared/ui';

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
  const [recentPlaces, setRecentPlaces] = useState<RecentPlace[]>([]);

  const { query, places, searchState, handleQueryChange, handleClearQuery } =
    useKakaoPlaceSearch(sdkLoaded);

  const displayState = sdkLoadError ? 'error' : searchState;

  const handleKakaoReady = useCallback(() => {
    window.kakao?.maps.load(() => setSdkLoaded(true));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecentPlaces(getRecentPlaces());
  }, []);

  const handleSelectPlace = (
    place: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    setRecentPlaces(
      addRecentPlace({ id: place.id, placeName: place.place_name }),
    );
    const params = new URLSearchParams({ placeName: place.place_name });
    router.push(`/log?${params.toString()}`);
  };

  const handleSelectRecentPlace = (place: RecentPlace) => {
    const params = new URLSearchParams({ placeName: place.placeName });
    router.push(`/log?${params.toString()}`);
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
            onRecentRemove={(id) => setRecentPlaces(removeRecentPlace(id))}
            onRecentClear={() => setRecentPlaces(clearRecentPlaces())}
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
