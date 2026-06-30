import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import { type CreateReviewRequest, type ReviewResponse } from '../model/types';

export function createReview(
  postId: number,
  data: CreateReviewRequest,
  images?: File[],
) {
  return clientApi.post<ReviewResponse>(
    `/feed/review/${postId}`,
    createMultipartRequest(data, images?.length ? { images } : undefined),
  );
}
