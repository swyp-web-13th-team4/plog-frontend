'use client';

import { useQuery } from '@tanstack/react-query';

import { mapQueryKeys } from '@/entities/place';

import { clientApi } from '@/shared/api/client-api';

type MapCountData = {
  recordCount: number;
  bookmarkCount: number;
};

function fetchMapCount() {
  return clientApi.get<MapCountData>('/map/count');
}

export function useMapCountQuery() {
  return useQuery({
    queryKey: mapQueryKeys.count(),
    queryFn: fetchMapCount,
  });
}
