import { type ReviewEnvironmentScore } from '@/entities/review';

export type PlaceReviewVariant = 'record' | 'bookmark';

export type PlaceReviewMetricType =
  | 'spaceSize'
  | 'noiseLevel'
  | 'congestionLevel'
  | 'focusLevel';

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
