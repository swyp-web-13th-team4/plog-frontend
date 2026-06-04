import { z } from 'zod';

export const userBadgeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  isAcquired: z.boolean(),
  acquiredAt: z.string(),
});

export type UserBadge = z.infer<typeof userBadgeSchema>;

export const typeCardIdSchema = z.enum([
  'LOGI',
  'CHICHI',
  'TORI',
  'HARU',
  'POPO',
  'NAO',
]);

export type TypeCardId = z.infer<typeof typeCardIdSchema>;

const analyticsFocusEnvironmentSchema = z.object({
  bestTimePeriod: z.string(),
  bestTimePeriodAvgFocus: z.number(),
  bestPlaceTag: z.string(),
  bestPlaceTagAvgFocus: z.number(),
  worstPlaceTag: z.string(),
  worstPlaceTagAvgFocus: z.number(),
});

export type AnalyticsFocusEnvironment = z.infer<
  typeof analyticsFocusEnvironmentSchema
>;

const analyticsSpaceRankingSchema = z.object({
  placeCategoryName: z.string(),
  postCount: z.number(),
  averageFocus: z.number(),
});

export type AnalyticsSpaceRanking = z.infer<typeof analyticsSpaceRankingSchema>;

export const mypageDataSchema = z.object({
  nickname: z.string(),
  profileImageUrl: z.string(),
  introduction: z.string().nullable(),
  mainBadge: userBadgeSchema.nullable(),
});

export type MypageData = z.infer<typeof mypageDataSchema>;

export const analyticsDataSchema = z.object({
  totalPostCount: z.number(),
  totalStudyTime: z.number(),
  workType: typeCardIdSchema.nullable(),
  focusEnvironment: analyticsFocusEnvironmentSchema.nullable(),
  spaceRankings: z.array(analyticsSpaceRankingSchema).nullable(),
});

export type AnalyticsData = z.infer<typeof analyticsDataSchema>;
