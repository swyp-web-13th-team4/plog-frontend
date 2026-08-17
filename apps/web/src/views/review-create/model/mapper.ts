import {
  type ExistingPhotoPreview,
  isNewPhotoPreview,
} from '@/features/photo-upload';

import {
  type CreateReviewRequest,
  type EditReviewResponse,
  type ReviewEnvironmentName,
  type ReviewEnvironmentScore,
  type UpdateReviewRequest,
} from '@/entities/review';

import { type CreateReviewFormValues } from './types';

function requireEnvironmentScore(
  name: ReviewEnvironmentName,
  values: CreateReviewFormValues['environmentValues'],
): ReviewEnvironmentScore {
  const score = values[name];
  if (score === null) throw new Error('리뷰 환경 점수가 비어 있습니다.');

  return score;
}

function reviewEnvironments(
  values: CreateReviewFormValues['environmentValues'],
): CreateReviewRequest['environments'] {
  return {
    spaceSize: requireEnvironmentScore('spaceSize', values),
    noiseLevel: requireEnvironmentScore('noiseLevel', values),
    congestionLevel: requireEnvironmentScore('congestionLevel', values),
    focusLevel: requireEnvironmentScore('focusLevel', values),
  };
}

export function createReviewForm(
  values: CreateReviewFormValues,
): CreateReviewRequest {
  if (values.rating === null) throw new Error('리뷰 별점이 비어 있습니다.');

  const content = values.contents.trim();

  return {
    rating: values.rating,
    environments: reviewEnvironments(values.environmentValues),
    ...(content ? { content } : {}),
  };
}

export function getReviewPhotoFiles(values: CreateReviewFormValues) {
  return values.photos.filter(isNewPhotoPreview).map(({ file }) => file);
}

export function updateReviewForm(
  values: CreateReviewFormValues,
): UpdateReviewRequest {
  return {
    ...createReviewForm(values),
    keepImageIds: values.photos
      .filter(
        (photo): photo is ExistingPhotoPreview => photo.type === 'existing',
      )
      .map(({ imageId }) => imageId),
  };
}

function existingReviewPhoto({
  id,
  url,
}: {
  id: number;
  url: string;
}): ExistingPhotoPreview {
  return {
    type: 'existing',
    id: `existing-${id}`,
    imageId: id,
    url,
  };
}

export function editReviewFormValues({
  review,
  images,
}: EditReviewResponse): CreateReviewFormValues {
  const existingImages = images?.images ?? [];

  return {
    rating: review.rating,
    environmentValues: review.environments,
    contents: review.content ?? '',
    photos: existingImages.map(existingReviewPhoto),
  };
}
