import { clientApi } from '@/shared/api/client-api';

import {
  type RecentPlaceDeleteResponse,
  type RecentPlaceSaveResponse,
  type RecentPlacesResponse,
  type SaveRecentPlaceRequest,
} from '../model/types';

export const getRecentPlaces = () =>
  clientApi.get<RecentPlacesResponse>('/place/recent');

export const saveRecentPlace = (data: SaveRecentPlaceRequest) =>
  clientApi.post<RecentPlaceSaveResponse>('/place/recent', data);

export const deleteRecentPlaces = () =>
  clientApi.delete<RecentPlaceDeleteResponse>('/place/recent');

export const deleteRecentPlace = (id: number) =>
  clientApi.delete<RecentPlaceDeleteResponse>(`/place/recent/${id}`);
