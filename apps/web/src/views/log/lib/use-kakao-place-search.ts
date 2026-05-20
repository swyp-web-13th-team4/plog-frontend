import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type SearchState } from '@/widgets/place-search';

import { type UserCoords } from '@/features/place-search';

import { useDebounce } from '@/shared/lib/debounce';

const MIN_SEARCH_LENGTH = 1;
const SEARCH_DEBOUNCE_DELAY = 300;

export function useKakaoPlaceSearch(
  sdkLoaded: boolean,
  userCoords: UserCoords | null,
) {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]);
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const paginationRef = useRef<kakao.maps.services.Pagination | null>(null);
  const isFetchingNextPageRef = useRef(false);

  const latitude = userCoords?.latitude;
  const longitude = userCoords?.longitude;
  const trimmedQuery = query.trim();
  const debouncedQuery = useDebounce(trimmedQuery, SEARCH_DEBOUNCE_DELAY);
  const canSearch = sdkLoaded && debouncedQuery.length >= MIN_SEARCH_LENGTH;

  const resetPagination = useCallback(() => {
    setHasNextPage(false);
    setIsFetchingNextPage(false);
    isFetchingNextPageRef.current = false;
    paginationRef.current = null;
  }, []);

  useEffect(() => {
    if (!canSearch) return;

    let canceled = false;
    const kakaoMaps = window.kakao?.maps;

    if (!kakaoMaps?.services) return;

    const placesService = new kakaoMaps.services.Places();
    const searchOptions: kakao.maps.services.PlacesSearchOptions | undefined =
      latitude !== undefined && longitude !== undefined
        ? {
            location: new kakaoMaps.LatLng(latitude, longitude),
            sort: kakaoMaps.services.SortBy.DISTANCE,
          }
        : undefined;

    placesService.keywordSearch(
      debouncedQuery,
      (data, status, pagination) => {
        if (canceled) return;

        if (status === kakaoMaps.services.Status.OK) {
          setPlaces((prevPlaces) =>
            pagination.current === 1 ? data : [...prevPlaces, ...data],
          );
          setSearchState(data.length > 0 ? 'success' : 'empty');
          setHasNextPage(pagination.hasNextPage);
          setIsFetchingNextPage(false);
          isFetchingNextPageRef.current = false;
          paginationRef.current = pagination;
          return;
        }

        setPlaces([]);
        resetPagination();
        setSearchState(
          status === kakaoMaps.services.Status.ZERO_RESULT ? 'empty' : 'error',
        );
      },
      searchOptions,
    );

    return () => {
      canceled = true;
    };
  }, [canSearch, debouncedQuery, latitude, longitude, resetPagination]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    if (nextQuery.trim().length < MIN_SEARCH_LENGTH) {
      setPlaces([]);
      setSearchState('idle');
      resetPagination();
    } else {
      setSearchState('loading');
    }
  };

  const handleClearQuery = () => {
    setQuery('');
    setPlaces([]);
    setSearchState('idle');
    resetPagination();
  };

  const loadNextPage = useCallback(() => {
    if (!paginationRef.current?.hasNextPage || isFetchingNextPageRef.current) {
      return;
    }

    isFetchingNextPageRef.current = true;
    setIsFetchingNextPage(true);
    paginationRef.current.nextPage();
  }, []);

  return {
    query,
    places,
    searchState,
    hasNextPage,
    isFetchingNextPage,
    loadNextPage,
    handleQueryChange,
    handleClearQuery,
  };
}
