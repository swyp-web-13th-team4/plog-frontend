import { clientApi } from '@/shared/api/client-api';

import {
  recentPlaceDeleteResponseSchema,
  recentPlaceSaveResponseSchema,
  recentPlacesResponseSchema,
} from '../model/schemas';
import { type SaveRecentPlaceRequest } from '../model/types';

export const getRecentPlaces = () =>
  clientApi.get('/place/recent', recentPlacesResponseSchema);

export const saveRecentPlace = (data: SaveRecentPlaceRequest) =>
  clientApi.post('/place/recent', data, recentPlaceSaveResponseSchema);

export const deleteRecentPlaces = () =>
  clientApi.delete('/place/recent', recentPlaceDeleteResponseSchema);

export const deleteRecentPlace = (id: number) =>
  clientApi.delete(`/place/recent/${id}`, recentPlaceDeleteResponseSchema);
