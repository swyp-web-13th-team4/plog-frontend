import { type PlaceReviewMetric } from '@/widgets/place-review-summary';

import {
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from '@/entities/review';

export type ReviewSortType = 'latest' | 'registered' | 'highest' | 'lowest';

export type UserReviewEnvironmentSummary = Omit<PlaceReviewMetric, 'count'>;

export type UserReviewInfo = {
  memberKey: string;
  nickname: string;
  profileImageUrl: string;
  rating: number;
  createdAt: string;
  environmentSummaries: UserReviewEnvironmentSummary[];
  content?: string;
  images?: string[];
};

export type UserReviewEnvironmentValues = Record<
  ReviewEnvironmentName,
  ReviewEnvironmentScore
>;
