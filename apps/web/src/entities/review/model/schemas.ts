import { z } from 'zod';

export const reviewResponseSchema = z.object({
  reviewId: z.number(),
  postId: z.number(),
  placeId: z.number(),
  placeName: z.string(),
  rating: z.number(),
  visitedDate: z.string(),
  visitStartTime: z.string(),
  visitEndTime: z.string(),
  environments: z.record(z.string(), z.number()),
  content: z.string().nullable(),
  imageUrls: z.array(z.string()).nullable(),
});

export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
