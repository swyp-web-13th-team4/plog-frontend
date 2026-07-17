import { isNewPhotoPreview } from '@/features/photo-upload';

import {
  type CreateReviewRequest,
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
} from '@/entities/review';

import { type ReviewFormValues } from './types';

function requireEnvironmentScore(
  name: ReviewEnvironmentName,
  values: ReviewFormValues['environmentValues'],
): ReviewEnvironmentScore {
  const score = values[name];
  if (score === null) throw new Error('리뷰 환경 점수가 비어 있습니다.');

  return score;
}

function reviewEnvironments(
  values: ReviewFormValues['environmentValues'],
): CreateReviewRequest['environments'] {
  return {
    spaceSize: requireEnvironmentScore('spaceSize', values),
    noiseLevel: requireEnvironmentScore('noiseLevel', values),
    congestionLevel: requireEnvironmentScore('congestionLevel', values),
    focusLevel: requireEnvironmentScore('focusLevel', values),
  };
}

export function createReviewForm(
  values: ReviewFormValues,
): CreateReviewRequest {
  if (values.rating === null) throw new Error('리뷰 별점이 비어 있습니다.');

  const content = values.contents.trim();

  return {
    rating: values.rating,
    environments: reviewEnvironments(values.environmentValues),
    ...(content ? { content } : {}),
  };
}

export function getReviewPhotoFiles(values: ReviewFormValues) {
  return values.photos.filter(isNewPhotoPreview).map(({ file }) => file);
}
