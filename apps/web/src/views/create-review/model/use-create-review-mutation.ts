'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { mapQueryKeys } from '@/entities/place';
import { createReview, reviewQueryKeys } from '@/entities/review';

import { createReviewForm, getReviewPhotoFiles } from './mapper';
import { type ReviewFormValues } from './types';

export function useCreateReviewMutation({ postId }: { postId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: ReviewFormValues) =>
      createReview(
        postId,
        createReviewForm(values),
        getReviewPhotoFiles(values),
      ),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: mapQueryKeys.pinDetailAll(),
        }),
      ]);

      toast({ type: 'success', description: '리뷰가 등록되었어요.' });
      router.replace(`/feed`);
    },
    onError: () => {
      toast({
        type: 'error',
        description: '리뷰를 등록하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
