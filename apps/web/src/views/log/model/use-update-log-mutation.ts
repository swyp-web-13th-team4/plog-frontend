'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FEED_QUERY_KEY, updatePost } from '@/entities/feed';

import { API_ERROR_CODE } from '@/shared/api/constants';
import { ApiResponseError } from '@/shared/api/response.utils';

import { getNewPhotoFiles, mapUpdateLogForm } from './mapper';
import { type CreateLogFormValues } from './types';

type UseUpdateLogMutationOptions = {
  postId: number | null;
  onSuccess?: () => void;
  onTitleForbidden?: () => void;
  onContentsForbidden?: () => void;
};

export function useUpdateLogMutation({
  postId,
  onSuccess,
  onTitleForbidden,
  onContentsForbidden,
}: UseUpdateLogMutationOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: CreateLogFormValues) => {
      if (postId === null || !Number.isFinite(postId)) {
        throw new Error('수정할 게시글을 찾을 수 없습니다.');
      }

      return updatePost(
        postId,
        mapUpdateLogForm(values),
        getNewPhotoFiles(values),
      );
    },
    onSuccess: async () => {
      onSuccess?.();
      await queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
      toast({ type: 'success', description: '기록이 수정되었어요.' });
      if (postId !== null) router.replace(`/feed/${postId}`);
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
        description: '기록을 수정하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
