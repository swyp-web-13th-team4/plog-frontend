'use client';

import { type ReactNode, useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';
import Script from 'next/script';

import { AppBar, useToast } from '@plog/ui';

import { PlaceSearchContent } from '@/widgets/place-search';

import { useCreateLogStore } from '@/features/create-log';
import {
  createSelectedPlace,
  PlaceSearchInput,
  type RecentPlace,
  useDeleteRecentPlaceMutation,
  useDeleteRecentPlacesMutation,
  useRecentPlacesQuery,
  useSaveRecentPlaceMutation,
} from '@/features/place-search';

import { KAKAO_MAP_SDK_URL } from '@/shared/api/constants';
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

function getSafeReturnPath(path: string | null) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return '/log';

  return path;
}

function getEditPostIdFromReturnPath(path: string) {
  const [pathname, queryString] = path.split('?');
  const postId = Number(new URLSearchParams(queryString).get('postId'));

  return pathname === '/log' && Number.isInteger(postId) && postId > 0
    ? postId
    : null;
}

type SearchPlacePageProps = {
  returnTo?: string;
};

export default function SearchPlacePage({ returnTo }: SearchPlacePageProps) {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkLoadError, setSdkLoadError] = useState(false);

  const { query, places, searchState, handleQueryChange, handleClearQuery } =
    useKakaoPlaceSearch(sdkLoaded);
  const { data: recentPlaces = [] } = useRecentPlacesQuery();
  const saveRecentPlaceMutation = useSaveRecentPlaceMutation();
  const deleteRecentPlaceMutation = useDeleteRecentPlaceMutation();
  const deleteRecentPlacesMutation = useDeleteRecentPlacesMutation();
  const setCreateLogValues = useCreateLogStore((state) => state.setValues);

  const router = useRouter();

  const { toast } = useToast();

  const displayState = sdkLoadError ? 'error' : searchState;
  const returnPath = getSafeReturnPath(returnTo ?? null);
  const returnPostId = getEditPostIdFromReturnPath(returnPath);

  const handleKakaoReady = useCallback(() => {
    window.kakao?.maps.load(() => setSdkLoaded(true));
  }, []);

  const handleSelectPlace = async (
    place: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    const selectedPlace = createSelectedPlace(place);

    try {
      await saveRecentPlaceMutation.mutateAsync({
        placeName: selectedPlace.name,
        address: selectedPlace.address,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });
      setCreateLogValues({ place: selectedPlace }, returnPostId);
      router.push(returnPath);
    } catch {
      toast({
        type: 'error',
        description: '장소 저장에 실패했어요. 다시 시도해 주세요.',
      });
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

    try {
      await saveRecentPlaceMutation.mutateAsync({
        placeName: selectedPlace.name,
        address: selectedPlace.address,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });
      setCreateLogValues({ place: selectedPlace }, returnPostId);
      router.push(returnPath);
    } catch {
      toast({
        type: 'error',
        description: '장소 저장에 실패했어요. 다시 시도해 주세요.',
      });
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
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title="장소 검색"
          onBack={() => router.push(returnPath)}
        />
      </header>
      <Script
        src={KAKAO_MAP_SDK_URL}
        strategy="afterInteractive"
        onReady={handleKakaoReady}
        onError={() => setSdkLoadError(true)}
      />
      <section className="flex min-h-[calc(100dvh-var(--spacing-header)-var(--spacing-bottom-tab))] flex-col bg-semantic-bg-standard pt-[var(--spacing-header)]">
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
