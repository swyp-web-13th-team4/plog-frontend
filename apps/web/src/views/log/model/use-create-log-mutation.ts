'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { feedQueryKeys } from '@/entities/feed';
import { mypageQueryKeys } from '@/entities/user';

import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';
import { dialog } from '@/shared/lib/dialog';

import { createLogForm, getNewPhotoFiles } from './mapper';
import { type CreateLogFormValues, type CreateRequest } from './types';

type CreatePostResponse = {
  texts?: {
    postId?: number;
  };
};

function createPost(data: CreateRequest, images: File[]) {
  return clientApi.post<CreatePostResponse>(
    '/post',
    createMultipartRequest(data, { images }),
  );
}

type UseCreateLogMutationOptions = {
  onSuccess?: (result: { postId: number; values: CreateLogFormValues }) => void;
};

export function useCreateLogMutation({
  onSuccess,
}: UseCreateLogMutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (values: CreateLogFormValues) => {
      const response = await createPost(
        createLogForm(values),
        getNewPhotoFiles(values),
      );

      return { postId: response.texts?.postId ?? null, values };
    },
    onSuccess: async ({ postId, values }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: feedQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: mypageQueryKeys.all }),
      ]);

      if (!postId) {
        await dialog.alert({
          message: '기록은 등록됐지만 리뷰 화면을 열 수 없어요.',
          description: '게시글 생성 응답에서 postId를 찾지 못했어요.',
        });
        router.replace('/feed');
        return;
      }

      onSuccess?.({ postId, values });
    },
    onError: () => {
      toast({
        type: 'error',
        description: '기록을 등록하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
