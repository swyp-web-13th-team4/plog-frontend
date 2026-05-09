'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FEED_QUERY_KEY } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import { getNewPhotoFiles, mapUpdateLogForm } from './mapper';
import {
  type CreateLogFormValues,
  type PostEditData,
  type PostUpdateRequest,
} from './types';

function updatePost(
  postId: number,
  data: PostUpdateRequest,
  images: File[] = [],
) {
  return clientApi.put<PostEditData>(
    `/post/${postId}`,
    createMultipartRequest(data, { images }),
  );
}

type UseUpdateLogMutationOptions = {
  postId: number | null;
  onSuccess?: () => void;
};

export function useUpdateLogMutation({
  postId,
  onSuccess,
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
    onError: () => {
      toast({
        type: 'error',
        description: '기록을 수정하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
