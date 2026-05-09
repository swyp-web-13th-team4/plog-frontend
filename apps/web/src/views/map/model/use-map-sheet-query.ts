'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { type MapSortType, type PlaceLayer } from '@/entities/place';

import { clientApi } from '@/shared/api/client-api';
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

function buildCursor(sortType: MapSortType, last: MapSheetPlace): string {
  switch (sortType) {
    case 'LATEST':
      return `${last.lastStudyDate}:${last.placeId}`;
    case 'RECORD_COUNT':
      return `${last.count}:${last.placeId}`;
    default:
      return String(last.placeId);
  }
}

export function useMapSheetQuery(layer: PlaceLayer, sortType: MapSortType) {
  return useInfiniteQuery({
    queryKey: ['map', 'sheet', layer, sortType],
    queryFn: ({ pageParam }) =>
      fetchMapSheetPlaces(layer, { sortType, cursor: pageParam, limit: LIMIT }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;
      const last = lastPage.content[lastPage.content.length - 1];
      return last ? buildCursor(sortType, last) : undefined;
    },
  });
}
