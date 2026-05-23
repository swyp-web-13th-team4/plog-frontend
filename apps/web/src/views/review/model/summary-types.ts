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

export type PlaceReviewSummary = {
  totalCount: number;
  averageRating: number;
  ratingParticipantCount: number;
  items: PlaceReviewMetric[];
};
