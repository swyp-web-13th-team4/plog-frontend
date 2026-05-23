import { type ReviewEnvironmentScore } from '@/entities/review';

import {
  getTopReviewMetric,
  PLACE_REVIEW_METRIC_ORDER,
} from '../lib/summary-utils';
import {
  type PlaceReviewMetricType,
  type PlaceReviewSummary,
} from './summary-types';

type MockReviewDistribution = {
  counts: Record<ReviewEnvironmentScore, number>;
  previousTopScore?: ReviewEnvironmentScore;
};

const mockReviewDistributions: Record<
  PlaceReviewMetricType,
  MockReviewDistribution
> = {
  spaceSize: {
    counts: {
      5: 23123,
      4: 1024,
      3: 61,
      2: 21,
      1: 8,
    },
  },
  noiseLevel: {
    counts: {
      5: 36,
      4: 51,
      3: 118,
      2: 520,
      1: 6,
    },
    previousTopScore: 4,
  },
  congestionLevel: {
    counts: {
      5: 860,
      4: 243,
      3: 77,
      2: 16,
      1: 4,
    },
  },
  focusLevel: {
    counts: {
      5: 232,
      4: 221,
      3: 701,
      2: 38,
      1: 8,
    },
  },
};

export const mockPlaceReviewSummary: PlaceReviewSummary = {
  totalCount: 1200,
  averageRating: 4.27,
  ratingParticipantCount: 1200,
  items: PLACE_REVIEW_METRIC_ORDER.map((type) => {
    const distribution = mockReviewDistributions[type];

    return getTopReviewMetric(
      type,
      distribution.counts,
      distribution.previousTopScore,
    );
  }),
};
