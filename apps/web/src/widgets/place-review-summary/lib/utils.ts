import {
  REVIEW_ENVIRONMENT_LABELS,
  REVIEW_ENVIRONMENT_SCORES,
  type ReviewEnvironmentScore,
} from '@/entities/review';

import {
  type PlaceReviewMetric,
  type PlaceReviewMetricType,
  type PlaceReviewScoreCounts,
} from '../model/types';

export const PLACE_REVIEW_METRIC_ORDER: PlaceReviewMetricType[] = [
  'spaceSize',
  'noiseLevel',
  'congestionLevel',
  'focusLevel',
];

export function formatCompactReviewCount(count: number) {
  return count >= 1000 ? '+999' : `+${count}`;
}

export function formatReviewCount(count: number) {
  return count >= 1000 ? '+999' : String(count);
}

export function formatReviewPersonCount(count: number) {
  return count >= 1000 ? '+999' : `${count}명`;
}

export function getTopReviewMetric(
  type: PlaceReviewMetricType,
  counts: PlaceReviewScoreCounts,
  previousTopScore?: ReviewEnvironmentScore,
): PlaceReviewMetric {
  const maxCount = Math.max(
    ...REVIEW_ENVIRONMENT_SCORES.map((score) => counts[score]),
  );
  const shouldKeepPreviousTop =
    previousTopScore !== undefined && counts[previousTopScore] === maxCount;

  const score = shouldKeepPreviousTop
    ? previousTopScore
    : REVIEW_ENVIRONMENT_SCORES.reduce<ReviewEnvironmentScore>(
        (currentTopScore, candidateScore) =>
          counts[candidateScore] > counts[currentTopScore]
            ? candidateScore
            : currentTopScore,
        REVIEW_ENVIRONMENT_SCORES[0],
      );

  return {
    type,
    label: REVIEW_ENVIRONMENT_LABELS[type][score],
    score,
    count: counts[score],
  };
}
