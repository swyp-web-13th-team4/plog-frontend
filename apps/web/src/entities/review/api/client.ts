import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import {
  editReviewResponseSchema,
  placeReviewPageResponseSchema,
  reviewResponseSchema,
} from '../model/schemas';
import {
  CreateReviewRequest,
  GetPlaceReviewsRequest,
  UpdateReviewRequest,
} from '../model/types';

export function createReview(
  postId: number,
  data: CreateReviewRequest,
  images?: File[],
) {
  return clientApi.post(
    `/feed/review/${postId}`,
    createMultipartRequest(data, images?.length ? { images } : undefined),
    reviewResponseSchema,
  );
}

export function getPlaceReviews({
  placeId,
  cursor,
  limit,
  imageOnly,
  sortType,
}: GetPlaceReviewsRequest) {
  const params = new URLSearchParams({
    limit: String(limit),
    imageOnly: String(imageOnly),
    sortType,
  });

  if (cursor) {
    params.set('cursor', cursor);
  }

  return clientApi.get(
    `/reviews/record/${placeId}?${params}`,
    placeReviewPageResponseSchema,
  );
}

export function getReviewForEdit(reviewId: number) {
  return clientApi.get(
    `/feed/review/${reviewId}/edit`,
    editReviewResponseSchema,
  );
}

export function updateReview(
  reviewId: number,
  data: UpdateReviewRequest,
  images: File[] = [],
) {
  return clientApi.put(
    `/feed/review/${reviewId}`,
    createMultipartRequest(data, images.length ? { images } : undefined),
    reviewResponseSchema,
  );
}

export function deleteReview(reviewId: number) {
  return clientApi.delete<unknown>(`/feed/review/${reviewId}`);
}
