import { z } from 'zod';

import {
  REVIEW_ENVIRONMENT_ICON_NAMES,
  REVIEW_ENVIRONMENT_NAMES,
  REVIEW_ENVIRONMENT_SCORES,
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

const reviewEditTimeSchema = z.object({
  hour: z.number(),
  minute: z.number(),
});

const reviewEditImageSchema = z.object({
  id: z.number(),
  url: z.string(),
});

const reviewScoreSchema = z.literal(REVIEW_ENVIRONMENT_SCORES);

export const editReviewResponseSchema = z.object({
  review: z.object({
    placeProfileUrl: z.string(),
    placeName: z.string(),
    rating: reviewScoreSchema,
    studyDate: z.string(),
    startedAt: reviewEditTimeSchema,
    endedAt: reviewEditTimeSchema,
    environments: z.record(z.enum(REVIEW_ENVIRONMENT_NAMES), reviewScoreSchema),
    content: z.string().nullable(),
  }),
  images: z
    .object({
      images: z.array(reviewEditImageSchema),
      total: z.number(),
    })
    .optional(),
});

export type EditReviewResponse = z.infer<typeof editReviewResponseSchema>;

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
