'use client';

import { useQuery } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client-api';

export type MapSearchPlace = {
  placeId: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  lastStudyDate: string;
};

function fetchMapSearchPlaces(keyword: string) {
  return clientApi.get<MapSearchPlace[]>(
    `/map/places?${new URLSearchParams({ keyword })}`,
  );
}

export function useMapSearchQuery(keyword: string) {
  return useQuery({
    queryKey: ['map', 'search', keyword],
    queryFn: () => fetchMapSearchPlaces(keyword),
    enabled: keyword.trim().length > 0,
  });
}
