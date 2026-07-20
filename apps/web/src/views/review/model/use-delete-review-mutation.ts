'use client';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteReview, reviewQueryKeys } from '@/entities/review';

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: async (_data, reviewId) => {
      queryClient.removeQueries({
        queryKey: reviewQueryKeys.edit(reviewId),
        exact: true,
      });

      await queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.lists(),
      });

      toast({ type: 'success', description: '리뷰가 삭제되었어요.' });
    },
    onError: () => {
      toast({
        type: 'error',
        description: '리뷰를 삭제하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
