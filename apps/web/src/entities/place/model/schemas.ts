import { z } from 'zod';

export const recentPlaceSchema = z.object({
  id: z.number(),
  placeName: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  searchedAt: z.string(),
});

export type RecentPlace = z.infer<typeof recentPlaceSchema>;

export const recentPlacesResponseSchema = z.object({
  places: z.array(recentPlaceSchema),
  totalCount: z.number(),
});

export type RecentPlacesResponse = z.infer<typeof recentPlacesResponseSchema>;

export const recentPlaceSaveResponseSchema = z.object({
  totalCount: z.number(),
});

export type RecentPlaceSaveResponse = z.infer<
  typeof recentPlaceSaveResponseSchema
>;

export const recentPlaceDeleteResponseSchema = z.object({
  deletedCount: z.number(),
});

export type RecentPlaceDeleteResponse = z.infer<
  typeof recentPlaceDeleteResponseSchema
>;
