'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { type FeedPage, feedQueryKeys } from '@/entities/feed';
import { mypageQueryKeys } from '@/entities/user';

import { clientApi } from '@/shared/api/client-api';

function deletePost(postId: number) {
  return clientApi.delete<unknown>(`/post/${postId}`);
}

function removePostFromFeedCache(
  prev: InfiniteData<FeedPage> | undefined,
  postId: number,
): InfiniteData<FeedPage> | undefined {
  if (!prev) return prev;

  return {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      items: page.items.filter((post) => post.postId !== postId),
    })),
  };
}

export function useDeletePostMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_data, postId) => {
      queryClient.removeQueries({
        queryKey: feedQueryKeys.detail(postId),
        exact: true,
      });
      queryClient.setQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
        (prev) => removePostFromFeedCache(prev, postId),
      );

      toast({ type: 'success', description: '게시글이 삭제되었어요.' });
      router.replace('/feed');

      void queryClient.invalidateQueries({
        queryKey: feedQueryKeys.list,
        exact: true,
      });
      void queryClient.invalidateQueries({ queryKey: mypageQueryKeys.all });
    },
    onError: () => {
      toast({
        type: 'error',
        description: '게시글을 삭제하지 못했어요. 다시 시도해 주세요.',
      });
    },
  });
}
