'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost, FEED_QUERY_KEY } from '@/entities/feed';

export function useDeletePostMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
      toast({ type: 'success', description: '게시글이 삭제되었어요.' });
      router.replace('/feed');
    },
    onError: () => {
      toast({
        type: 'error',
        description: '게시글을 삭제하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
