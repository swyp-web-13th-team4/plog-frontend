'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteRecentPlace,
  deleteRecentPlaces,
  getRecentPlaces,
  placeQueryKeys,
  saveRecentPlace,
  type SaveRecentPlaceRequest,
} from '@/entities/place';

export function useRecentPlacesQuery() {
  return useQuery({
    queryKey: placeQueryKeys.recent,
    queryFn: getRecentPlaces,
    select: (data) => data.places,
  });
}

export function useSaveRecentPlaceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (place: SaveRecentPlaceRequest) => saveRecentPlace(place),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placeQueryKeys.recent });
    },
  });
}

export function useDeleteRecentPlaceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteRecentPlace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placeQueryKeys.recent });
    },
  });
}

export function useDeleteRecentPlacesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecentPlaces,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placeQueryKeys.recent });
    },
  });
}
