import {
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from '@/entities/review';

export type PlaceReviewVariant = 'record' | 'bookmark';

export type PlaceReviewMetricType = ReviewEnvironmentName;

export type PlaceReviewMetric = {
  type: PlaceReviewMetricType;
  label: string;
  score: ReviewEnvironmentScore;
  count: number;
};

export type PlaceReviewScoreCounts = Record<ReviewEnvironmentScore, number>;
export type UserReviewEnvironmentSummary = Omit<PlaceReviewMetric, 'count'>;

export type PlaceReviewSummary = {
  totalCount: number;
  averageRating: number;
  ratingParticipantCount: number;
  items: PlaceReviewMetric[];
};

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

export type PlaceReviewLists = PlaceReviewSummary & {
  reviewLists: UserReviewInfo[];
};
