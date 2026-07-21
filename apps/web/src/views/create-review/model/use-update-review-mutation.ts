'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { mapQueryKeys } from '@/entities/place';
import { reviewQueryKeys, updateReview } from '@/entities/review';

import { getReviewPhotoFiles, updateReviewForm } from './mapper';
import { type ReviewSubmitValues } from './types';

type UseUpdateReviewMutationOptions = {
  reviewId: number | null;
  onSuccess?: () => void;
};

export function useUpdateReviewMutation({
  reviewId,
  onSuccess,
}: UseUpdateReviewMutationOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: ReviewSubmitValues) => {
      if (reviewId === null || !Number.isFinite(reviewId)) {
        throw new Error('수정할 리뷰를 찾을 수 없습니다.');
      }

      return updateReview(
        reviewId,
        updateReviewForm(values),
        getReviewPhotoFiles(values),
      );
    },
    onSuccess: async () => {
      onSuccess?.();

      if (reviewId !== null) {
        queryClient.removeQueries({
          queryKey: reviewQueryKeys.edit(reviewId),
          exact: true,
        });
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: mapQueryKeys.pinDetailAll(),
        }),
      ]);

      toast({ type: 'success', description: '리뷰가 수정되었어요.' });
      router.back();
    },
    onError: () => {
      toast({
        type: 'error',
        description: '리뷰를 수정하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
