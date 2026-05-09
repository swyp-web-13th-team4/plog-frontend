'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost, FEED_QUERY_KEY } from '@/entities/feed';

import { getNewPhotoFiles, mapCreateLogForm } from './mapper';
import { type CreateLogFormValues } from './types';

type UseCreateLogMutationOptions = {
  onSuccess?: () => void;
};

export function useCreateLogMutation({
  onSuccess,
}: UseCreateLogMutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: CreateLogFormValues) =>
      createPost(mapCreateLogForm(values), getNewPhotoFiles(values)),
    onSuccess: async () => {
      onSuccess?.();
      await queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
      toast({ type: 'success', description: '기록이 등록되었어요.' });
      router.replace('/feed');
    },
    onError: () => {
      toast({
        type: 'error',
        description: '기록을 등록하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
