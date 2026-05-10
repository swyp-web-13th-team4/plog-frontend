'use client';

import { useQuery } from '@tanstack/react-query';

import { mapQueryKeys, type PlaceLayer } from '@/entities/place';

import { clientApi } from '@/shared/api/client-api';

import { type MapPinDetail } from './types';

function fetchMapPinDetail(placeId: number, layer: PlaceLayer) {
  const path = layer === 'record' ? 'records' : 'bookmarks';
  return clientApi.get<MapPinDetail>(`/map/pins/${path}/${placeId}`);
}

export function useMapPinDetailQuery(
  placeId: number | null,
  layer: PlaceLayer,
) {
  return useQuery({
    queryKey: mapQueryKeys.pinDetail(placeId, layer),
    queryFn: () => fetchMapPinDetail(placeId!, layer),
    enabled: placeId !== null,
  });
}
