import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import { reviewResponseSchema } from '../model/schemas';
import { type CreateReviewRequest } from '../model/types';

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
