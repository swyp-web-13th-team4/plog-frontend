import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type SearchState } from '@/widgets/place-search';

import { type UserCoords } from '@/features/place-search';

const MIN_SEARCH_LENGTH = 1;

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
  const canSearch = sdkLoaded && trimmedQuery.length >= MIN_SEARCH_LENGTH;

  const resetPagination = useCallback(() => {
    setHasNextPage(false);
    setIsFetchingNextPage(false);
    isFetchingNextPageRef.current = false;
    paginationRef.current = null;
  }, []);

  useEffect(() => {
    if (!canSearch) return;

    let canceled = false;

    const timerId = window.setTimeout(() => {
      if (!window.kakao?.maps?.services) {
        setPlaces([]);
        setSearchState('error');
        resetPagination();
        return;
      }

      const placesService = new window.kakao.maps.services.Places();
      const searchOptions: kakao.maps.services.PlacesSearchOptions | undefined =
        latitude !== undefined && longitude !== undefined
          ? {
              location: new window.kakao.maps.LatLng(latitude, longitude),
              sort: window.kakao.maps.services.SortBy.DISTANCE,
            }
          : undefined;

      placesService.keywordSearch(
        trimmedQuery,
        (data, status, pagination) => {
          if (canceled) return;

          if (status === window.kakao?.maps.services.Status.OK) {
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
            status === window.kakao?.maps.services.Status.ZERO_RESULT
              ? 'empty'
              : 'error',
          );
        },
        searchOptions,
      );
    }, 300);

    return () => {
      canceled = true;
      window.clearTimeout(timerId);
    };
  }, [canSearch, latitude, longitude, resetPagination, trimmedQuery]);

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
