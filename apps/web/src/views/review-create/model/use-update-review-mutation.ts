'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { mapQueryKeys } from '@/entities/place';
import { reviewQueryKeys, updateReview } from '@/entities/review';

import { getReviewPhotoFiles, updateReviewForm } from './mapper';
import { type CreateReviewFormValues } from './types';

type UseUpdateReviewMutationOptions = {
  onSuccess?: () => void;
};

type UpdateReviewVariables = {
  reviewId: number;
  values: CreateReviewFormValues;
};

export function useUpdateReviewMutation({
  onSuccess,
}: UseUpdateReviewMutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ reviewId, values }: UpdateReviewVariables) =>
      updateReview(
        reviewId,
        updateReviewForm(values),
        getReviewPhotoFiles(values),
      ),
    onSuccess: async (_data, { reviewId }) => {
      onSuccess?.();

      queryClient.removeQueries({
        queryKey: reviewQueryKeys.edit(reviewId),
        exact: true,
      });

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
