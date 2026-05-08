'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost, FEED_QUERY_KEY } from '@/entities/feed';

import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';

import { mapCreateLogForm } from './mapper';
import { type CreateLogFormValues } from './types';

type UseCreateLogMutationOptions = {
  onSuccess?: () => void;
  onTitleForbidden?: () => void;
  onContentsForbidden?: () => void;
};

export function useCreateLogMutation({
  onSuccess,
  onTitleForbidden,
  onContentsForbidden,
}: UseCreateLogMutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: CreateLogFormValues) =>
      createPost(
        mapCreateLogForm(values),
        values.photos.map(({ file }) => file),
      ),
    onSuccess: async () => {
      onSuccess?.();
      await queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
      toast({ type: 'success', description: '기록이 등록되었어요.' });
      router.replace('/feed');
    },
    onError: (error) => {
      if (
        error instanceof ApiResponseError &&
        error.errorCode === API_ERROR_CODE.CONTAINS_BAD_WORD
      ) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('title') || error.message.includes('제목')) {
          onTitleForbidden?.();
        } else {
          onContentsForbidden?.();
        }
        return;
      }

      toast({
        type: 'error',
        description: '기록을 등록하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
