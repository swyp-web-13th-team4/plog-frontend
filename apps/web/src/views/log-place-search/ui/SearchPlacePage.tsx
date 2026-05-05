'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Script from 'next/script';

import { Button, EmptyState } from '@plog/ui';

import { PlaceSearchContent } from '@/widgets/place-search';

import {
  addRecentPlace,
  clearRecentPlaces,
  getRecentPlaces,
  PlaceSearchInput,
  type RecentPlace,
  removeRecentPlace,
} from '@/features/place-search';

import LoadingEmptyIcon from '@/shared/assets/empty-graphics/loading-empty.svg';
import PlaceEmptyIcon from '@/shared/assets/empty-graphics/place-empty.svg';
import SearchEmptyIcon from '@/shared/assets/empty-graphics/search-empty.svg';

import { useKakaoPlaceSearch } from '../lib/use-kakao-place-search';
import SearchResultList from './SearchResultList';

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
      <section className="min-h-[calc(100dvh-var(--spacing-header)-var(--spacing-bottom-tab))] bg-semantic-bg-standard">
        <div className="sticky top-[var(--spacing-header)] z-10 border-b border-semantic-stroke-subtler bg-semantic-bg-standard px-6 py-6">
          <PlaceSearchInput
            value={query}
            onChange={handleQueryChange}
            onClear={handleClearQuery}
          />
        </div>
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
            <div className="flex min-h-210 items-center justify-center bg-semantic-bg-deep px-6 text-center">
              <EmptyState
                title="어디에서 작업하셨나요?"
                description="오늘 몰입했던 그 장소를 검색해 보세요"
                graphic={<PlaceEmptyIcon />}
              />
            </div>
          }
          emptyView={
            <div className="flex min-h-210 items-center justify-center bg-semantic-bg-deep px-6 text-center">
              <EmptyState
                title="검색 결과가 없어요"
                description="장소 이름이나 주소가 정확한지 확인해 주세요"
                graphic={<SearchEmptyIcon />}
              />
            </div>
          }
          errorView={
            <div className="flex min-h-210 items-center justify-center bg-semantic-bg-deep px-6 text-center">
              <EmptyState
                title="정보를 불러오지 못했어요"
                description="인터넷 연결 상태를 확인하고 다시 시도해 주세요"
                graphic={<LoadingEmptyIcon />}
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
            </div>
          }
        />
      </section>
    </>
  );
}
