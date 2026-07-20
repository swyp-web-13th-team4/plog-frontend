import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import {
  placeReviewPageResponseSchema,
  reviewResponseSchema,
} from '../model/schemas';
import { CreateReviewRequest, GetPlaceReviewsRequest } from '../model/types';

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
  placeType,
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
    `/reviews/${placeType}/${placeId}?${params}`,
    placeReviewPageResponseSchema,
  );
}
