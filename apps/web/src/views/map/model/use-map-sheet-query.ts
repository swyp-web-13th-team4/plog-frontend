'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  mapQueryKeys,
  type MapSortType,
  type PlaceLayer,
} from '@/entities/place';

import { clientApi } from '@/shared/api/client-api';
import { getNextCursorPageParam } from '@/shared/api/response.utils';
import { type CursorPage } from '@/shared/api/types';

import { type MapSheetPlace } from './types';

const LIMIT = 20;

function fetchMapSheetPlaces(
  layer: PlaceLayer,
  options: { sortType: MapSortType; cursor: string; limit: number },
) {
  const params = new URLSearchParams({
    sortType: options.sortType,
    limit: String(options.limit),
  });
  if (options.cursor) params.set('cursor', options.cursor);
  const path = layer === 'record' ? 'records' : 'bookmarks';
  return clientApi.get<CursorPage<MapSheetPlace>>(
    `/map/sheet/${path}?${params}`,
  );
}

export function useMapSheetQuery(layer: PlaceLayer, sortType: MapSortType) {
  return useInfiniteQuery({
    queryKey: mapQueryKeys.sheet(layer, sortType),
    queryFn: ({ pageParam }) =>
      fetchMapSheetPlaces(layer, { sortType, cursor: pageParam, limit: LIMIT }),
    initialPageParam: '',
    getNextPageParam: getNextCursorPageParam,
  });
}
