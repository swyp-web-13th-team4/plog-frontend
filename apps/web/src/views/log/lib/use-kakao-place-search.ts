import { type ChangeEvent, useEffect, useState } from 'react';

import { type SearchState } from '@/widgets/place-search';

const MIN_SEARCH_LENGTH = 1;

export function useKakaoPlaceSearch(sdkLoaded: boolean) {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]);
  const [searchState, setSearchState] = useState<SearchState>('idle');

  const trimmedQuery = query.trim();
  const canSearch = sdkLoaded && trimmedQuery.length >= MIN_SEARCH_LENGTH;

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

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    if (nextQuery.trim().length < MIN_SEARCH_LENGTH) {
      setPlaces([]);
      setSearchState('idle');
    } else {
      setSearchState('loading');
    }
  };

  const handleClearQuery = () => {
    setQuery('');
    setPlaces([]);
    setSearchState('idle');
  };

  return { query, places, searchState, handleQueryChange, handleClearQuery };
}
