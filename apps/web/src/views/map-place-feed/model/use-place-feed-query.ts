'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { type PlaceTagValue } from '@/entities/feed';
import {
  mapQueryKeys,
  type MapSortType,
  type PlaceLayer,
} from '@/entities/place';

import { clientApi } from '@/shared/api/client-api';
import { getNextCursorPageParam } from '@/shared/api/response.utils';
import { type CursorPage } from '@/shared/api/types';

type PlacePost = {
  postId: number;
  title: string;
  studyDate: string;
  studyTime: number;
  focus: number;
  contents: string;
  thumbnailUrl: string;
  categoryCode: string;
  tags: PlaceTagValue[];
};

const LIMIT = 20;

function fetchPlacePosts(
  placeId: number,
  layer: PlaceLayer,
  options: {
    sortType: MapSortType;
    tags: PlaceTagValue[];
    cursor: string;
    limit: number;
  },
) {
  const params = new URLSearchParams({
    sortType: options.sortType,
    limit: String(options.limit),
  });
  if (options.cursor) params.set('cursor', options.cursor);
  options.tags.forEach((tag) => params.append('tags', tag));
  const path = layer === 'record' ? 'records' : 'bookmarks';
  return clientApi.get<CursorPage<PlacePost>>(
    `/map/${placeId}/${path}?${params}`,
  );
}

export function usePlaceFeedQuery(
  placeId: number,
  layer: PlaceLayer,
  sortType: MapSortType,
  tags: PlaceTagValue[] = [],
) {
  return useInfiniteQuery({
    queryKey: mapQueryKeys.place(placeId, layer, sortType, tags),
    queryFn: ({ pageParam }) =>
      fetchPlacePosts(placeId, layer, {
        sortType,
        tags,
        cursor: pageParam,
        limit: LIMIT,
      }),
    initialPageParam: '',
    getNextPageParam: getNextCursorPageParam,
  });
}
