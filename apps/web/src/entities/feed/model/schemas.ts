import { z } from 'zod';

import {
  AtmosphereAndFocus,
  EnvironmentAndComfort,
  OtherTags,
  SeatingAndSpace,
  WorkConvenience,
} from './place-tag';

export const postScopeSchema = z.enum(['PUBLIC', 'PRIVATE']);

export type PostScope = z.infer<typeof postScopeSchema>;

export const placeTagValueSchema = z.union([
  z.enum(AtmosphereAndFocus),
  z.enum(WorkConvenience),
  z.enum(SeatingAndSpace),
  z.enum(EnvironmentAndComfort),
  z.enum(OtherTags),
]);

const feedPostBaseSchema = z.object({
  postId: z.number(),
  name: z.string(),
  profileImage: z.string(),
  createAt: z.string(),
  postImages: z.array(z.string()),
  likes: z.number(),
  title: z.string(),
  contents: z.string(),
  placeName: z.string(),
  studyTime: z.number(),
  focus: z.number(),
  tags: z.array(placeTagValueSchema),
  like: z.boolean(),
  bookMark: z.boolean(),
});

export const feedListResponseSchema = feedPostBaseSchema.extend({
  memberKey: z.string(),
  isAuthor: z.boolean(),
});

export type FeedListResponse = z.infer<typeof feedListResponseSchema>;

export const feedResponseSchema = z.object({
  feedFindResponses: z.array(feedListResponseSchema),
  lastPostId: z.number().nullable(),
  createdAt: z.string().nullable(),
});

export type FeedResponse = z.infer<typeof feedResponseSchema>;

export const profileFeedItemSchema = feedPostBaseSchema.extend({
  placeCategory: z.string(),
  isPublic: z.boolean(),
});

export type ProfileFeedItem = z.infer<typeof profileFeedItemSchema>;

export const profilePostsResponseSchema = z.object({
  posts: z.array(profileFeedItemSchema),
});

export type ProfilePostsResponse = z.infer<typeof profilePostsResponseSchema>;

export const bookmarkedFeedsResponseSchema = z.object({
  myBookmarks: z.array(profileFeedItemSchema),
});

export type BookmarkedFeedsResponse = z.infer<
  typeof bookmarkedFeedsResponseSchema
>;

const timePickerResponseSchema = z.object({
  hour: z.number(),
  minute: z.number(),
});

export const feedDetailResponseSchema = feedPostBaseSchema.extend({
  memberKey: z.string(),
  startedAt: timePickerResponseSchema,
  endedAt: timePickerResponseSchema,
  studyDate: z.string(),
  isAuthor: z.boolean(),
  category: z.string(),
  address: z.string(),
  scope: postScopeSchema,
});

export type FeedDetailResponse = z.infer<typeof feedDetailResponseSchema>;
