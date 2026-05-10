'use client';

import { useQuery } from '@tanstack/react-query';

import {
  mapQueryKeys,
  type MapSortType,
  type PlaceLayer,
} from '@/entities/place';

import { clientApi } from '@/shared/api/client-api';

import { type MapBounds, type MapPin } from './types';

function fetchMapPins(
  layer: PlaceLayer,
  bounds: MapBounds,
  sortType: MapSortType,
) {
  const params = new URLSearchParams({
    swLat: String(bounds.swLat),
    swLng: String(bounds.swLng),
    neLat: String(bounds.neLat),
    neLng: String(bounds.neLng),
    sortType,
  });
  const path = layer === 'record' ? 'records' : 'bookmarks';
  return clientApi.get<MapPin[]>(`/map/pins/${path}?${params}`);
}

export function useMapPinsQuery(
  layer: PlaceLayer,
  bounds: MapBounds | null,
  sortType: MapSortType,
) {
  return useQuery({
    queryKey: mapQueryKeys.pins(layer, bounds, sortType),
    queryFn: () => fetchMapPins(layer, bounds!, sortType),
    enabled: !!bounds,
  });
}
