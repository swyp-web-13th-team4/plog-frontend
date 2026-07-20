import { z } from 'zod';

import {
  REVIEW_ENVIRONMENT_ICON_NAMES,
  REVIEW_ENVIRONMENT_NAMES,
} from './environment';

export const reviewEnvironmentNameSchema = z.enum(REVIEW_ENVIRONMENT_NAMES);
export const reviewEnvironmentIconNameSchema = z.enum(
  REVIEW_ENVIRONMENT_ICON_NAMES,
);

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

export const placeReviewEnvironmentItemSchema = z.object({
  environmentName: reviewEnvironmentNameSchema,
  title: z.string(),
  iconName: reviewEnvironmentIconNameSchema,
  score: z.number(),
  label: z.string(),
});

export type PlaceReviewEnvironmentItem = z.infer<
  typeof placeReviewEnvironmentItemSchema
>;

export const placeReviewEnvironmentSummarySchema =
  placeReviewEnvironmentItemSchema.extend({
    count: z.number(),
  });

export type PlaceReviewEnvironmentSummary = z.infer<
  typeof placeReviewEnvironmentSummarySchema
>;

export const placeReviewListItemSchema = z.object({
  reviewId: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string(),
  isAuthor: z.boolean(),
  rating: z.number(),
  createdAt: z.string(),
  environments: z.array(placeReviewEnvironmentItemSchema),
  content: z.string().nullable(),
  imageUrls: z.array(z.string()),
});

export type PlaceReviewListItem = z.infer<typeof placeReviewListItemSchema>;

export const placeReviewPageItemsSchema = z.object({
  content: z.array(placeReviewListItemSchema),
  hasNext: z.boolean(),
  nextCursor: z.string().nullable(),
});

export type PlaceReviewPageItems = z.infer<typeof placeReviewPageItemsSchema>;

export const placeReviewSummarySchema = z.object({
  reviewCount: z.number(),
  averageRating: z.number(),
  environments: z.array(placeReviewEnvironmentSummarySchema),
});

export type PlaceReviewSummary = z.infer<typeof placeReviewSummarySchema>;

export const placeReviewPageResponseSchema = z.object({
  summary: placeReviewSummarySchema.nullable(),
  reviews: placeReviewPageItemsSchema,
});

export type PlaceReviewPageResponse = z.infer<
  typeof placeReviewPageResponseSchema
>;
