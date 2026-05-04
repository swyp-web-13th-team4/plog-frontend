'use client';

import {
  type ChangeEvent,
  Fragment,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import Script from 'next/script';

import { Button, EmptyState, Icon, Input } from '@plog/ui';
import { cn } from '@plog/utils';

import {
  addRecentPlace,
  clearRecentPlaces,
  formatRecentPlaceDate,
  getRecentPlaces,
  type RecentPlace,
  removeRecentPlace,
} from '@/features/place-search';

import LoadingEmptyIcon from '@/shared/assets/empty-graphics/loading-empty.svg';
import PlaceEmptyIcon from '@/shared/assets/empty-graphics/place-empty.svg';
import SearchEmptyIcon from '@/shared/assets/empty-graphics/search-empty.svg';

type SearchState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

const MIN_SEARCH_LENGTH = 1;

function getDisplayAddress(place: kakao.maps.services.PlacesSearchResultItem) {
  return place.road_address_name || place.address_name;
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const normalizedQuery = query.trim();

  const parts = useMemo(() => {
    if (!normalizedQuery) return [text];

    const escapedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  }, [normalizedQuery, text]);

  return (
    <>
      {parts.map((part, index) => {
        const highlighted =
          normalizedQuery.length > 0 &&
          part.toLocaleLowerCase() === normalizedQuery.toLocaleLowerCase();

        return (
          <Fragment key={`${part}-${index}`}>
            {highlighted ? (
              <mark className="bg-transparent text-semantic-accent-normal">
                {part}
              </mark>
            ) : (
              part
            )}
          </Fragment>
        );
      })}
    </>
  );
}

function PlaceResultItem({
  place,
  query,
  onSelect,
}: {
  place: kakao.maps.services.PlacesSearchResultItem;
  query: string;
  onSelect: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}) {
  return (
    <li>
      <button
        type="button"
        className="w-full border-b border-semantic-stroke-subtler px-6 py-5 text-left transition-colors hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-semantic-accent-normal"
        onClick={() => onSelect(place)}
      >
        <p className="body-lg text-semantic-object-boldest">
          <HighlightText text={place.place_name} query={query} />
        </p>
        <p className="body-sm text-semantic-object-normal">
          {getDisplayAddress(place)}
        </p>
      </button>
    </li>
  );
}

function SearchStatusFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-210 items-center justify-center bg-semantic-bg-deep px-6 text-center">
      {children}
    </div>
  );
}

function SearchLoadingView() {
  return (
    <SearchStatusFrame>
      <EmptyState
        title="잠시만 기달려주세요"
        description="검색한 키워드를 기반으로 장소를 찾고있어요"
        graphic={<LoadingEmptyIcon />}
      />
    </SearchStatusFrame>
  );
}

function SearchEmptyView() {
  return (
    <SearchStatusFrame>
      <EmptyState
        title="검색 결과가 없어요"
        description="장소 이름이나 주소가 정확한지 확인해 주세요"
        graphic={<SearchEmptyIcon />}
      />
    </SearchStatusFrame>
  );
}

function SearchErrorView() {
  return (
    <SearchStatusFrame>
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
    </SearchStatusFrame>
  );
}

function SearchIdleView() {
  return (
    <SearchStatusFrame>
      <EmptyState
        title="어디에서 작업하셨나요?"
        description="오늘 몰입했던 그 장소를 검색해 보세요"
        graphic={<PlaceEmptyIcon />}
      />
    </SearchStatusFrame>
  );
}

function RecentPlaceItem({
  place,
  onSelect,
  onRemove,
}: {
  place: RecentPlace;
  onSelect: (place: RecentPlace) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(place)}
        className="flex w-full cursor-pointer justify-between px-6 py-5 hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-semantic-accent-normal"
      >
        {/* 시계 + placeName */}
        <div className="flex items-center gap-1">
          <Icon
            name="clock"
            size={20}
            className="text-semantic-object-subtle"
          />
          <span className="label-md text-semantic-object-boldest">
            {place.placeName}
          </span>
        </div>
        {/* 날짜 + 삭제 */}
        <div className="flex items-center gap-2">
          <span className="label-md text-semantic-object-subtle">
            {formatRecentPlaceDate(place.searchedDate)}
          </span>
          <span
            role="button"
            tabIndex={0}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(place.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onRemove(place.id);
              }
            }}
          >
            <Icon
              name="close"
              size={20}
              className="text-semantic-object-normal"
            />
          </span>
        </div>
      </button>
    </li>
  );
}

function RecentPlaceList({
  places,
  onSelect,
  onRemove,
  onClear,
}: {
  places: RecentPlace[];
  onSelect: (place: RecentPlace) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  if (places.length === 0) return <SearchIdleView />;

  return (
    <section className="bg-semantic-bg-standard">
      <div className="flex items-center justify-between px-5 pt-5 pb-6">
        <h2 className="title-xs text-semantic-object-boldest">최근 검색</h2>
        <button
          type="button"
          className="body-md text-semantic-object-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-accent-normal"
          onClick={onClear}
        >
          전체삭제
        </button>
      </div>

      <ul>
        {places.map((place) => (
          <RecentPlaceItem
            key={place.id}
            place={place}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </section>
  );
}

function SearchResultList({
  places,
  query,
  onSelect,
}: {
  places: kakao.maps.services.PlacesSearchResultItem[];
  query: string;
  onSelect: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}) {
  return (
    <ul className="bg-semantic-bg-standard">
      {places.map((place) => (
        <PlaceResultItem
          key={place.id}
          place={place}
          query={query}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

function SearchContent({
  searchState,
  places,
  recentPlaces,
  query,
  onSelect,
  onRecentSelect,
  onRecentRemove,
  onRecentClear,
}: {
  searchState: SearchState;
  places: kakao.maps.services.PlacesSearchResultItem[];
  recentPlaces: RecentPlace[];
  query: string;
  onSelect: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  onRecentSelect: (place: RecentPlace) => void;
  onRecentRemove: (id: string) => void;
  onRecentClear: () => void;
}) {
  if (searchState === 'loading') return <SearchLoadingView />;

  if (searchState === 'success') {
    return (
      <SearchResultList places={places} query={query} onSelect={onSelect} />
    );
  }

  if (searchState === 'empty') return <SearchEmptyView />;
  if (searchState === 'error') return <SearchErrorView />;

  return (
    <RecentPlaceList
      places={recentPlaces}
      onSelect={onRecentSelect}
      onRemove={onRecentRemove}
      onClear={onRecentClear}
    />
  );
}

export default function SearchPlacePage() {
  const router = useRouter();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]);
  const [recentPlaces, setRecentPlaces] = useState<RecentPlace[]>([]);
  const [searchState, setSearchState] = useState<SearchState>('idle');

  const trimmedQuery = query.trim();
  const canSearch = sdkLoaded && trimmedQuery.length >= MIN_SEARCH_LENGTH;

  const handleKakaoReady = useCallback(() => {
    window.kakao?.maps.load(() => setSdkLoaded(true));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecentPlaces(getRecentPlaces());
  }, []);

  useEffect(() => {
    if (!canSearch) return;

    let canceled = false;

    const timerId = window.setTimeout(() => {
      if (!window.kakao?.maps?.services) {
        setPlaces([]);
        setSearchState('error');
        return;
      }

      const placesService = new window.kakao.maps.services.Places();

      placesService.keywordSearch(trimmedQuery, (data, status) => {
        if (canceled) return;

        if (status === window.kakao?.maps.services.Status.OK) {
          setPlaces(data);
          setSearchState(data.length > 0 ? 'success' : 'empty');
          return;
        }

        setPlaces([]);
        setSearchState(
          status === window.kakao?.maps.services.Status.ZERO_RESULT
            ? 'empty'
            : 'error',
        );
      });
    }, 300);

    return () => {
      canceled = true;
      window.clearTimeout(timerId);
    };
  }, [canSearch, trimmedQuery]);

  const resetSearch = () => {
    setPlaces([]);
    setSearchState('idle');
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;

    setQuery(nextQuery);
    if (nextQuery.trim().length < MIN_SEARCH_LENGTH) {
      resetSearch();
      return;
    }

    setSearchState('loading');
  };

  const handleClearQuery = () => {
    setQuery('');
    resetSearch();
  };

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

  const handleRemoveRecentPlace = (id: string) => {
    setRecentPlaces(removeRecentPlace(id));
  };

  const handleClearRecentPlaces = () => {
    setRecentPlaces(clearRecentPlaces());
  };

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onReady={handleKakaoReady}
        onError={() => setSearchState('error')}
      />

      <section className="min-h-[calc(100dvh-var(--spacing-header)-var(--spacing-bottom-tab))] bg-semantic-bg-standard">
        <div className="sticky top-0 z-10 border-b border-semantic-stroke-subtler bg-semantic-bg-standard px-6 py-6">
          <Input
            value={query}
            onChange={handleQueryChange}
            onClear={handleClearQuery}
            placeholder="장소를 입력해 주세요."
            autoFocus
            trailing={
              <Icon name="search" className="text-semantic-object-subtle" />
            }
            className={cn(query.length > 0 && 'border-semantic-accent-normal')}
          />
        </div>

        <SearchContent
          searchState={searchState}
          places={places}
          recentPlaces={recentPlaces}
          query={query}
          onSelect={handleSelectPlace}
          onRecentSelect={handleSelectRecentPlace}
          onRecentRemove={handleRemoveRecentPlace}
          onRecentClear={handleClearRecentPlaces}
        />
      </section>
    </>
  );
}
