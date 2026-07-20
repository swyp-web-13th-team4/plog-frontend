'use client';

import { useQuery } from '@tanstack/react-query';

import { getReviewForEdit, reviewQueryKeys } from '@/entities/review';

export function useEditReviewQuery(reviewId: number | null) {
  return useQuery({
    queryKey: reviewQueryKeys.edit(reviewId),
    queryFn: () => getReviewForEdit(reviewId as number),
    enabled: reviewId !== null && Number.isFinite(reviewId),
  });
}
