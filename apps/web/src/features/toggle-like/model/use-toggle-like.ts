'use client';

import { useToast } from '@plog/ui';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { type FeedPage, type FeedPost, feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

function postToggleLike(postId: number) {
  return clientApi.post<{ isLiked: boolean }>(`/feed/like/${postId}`);
}

function applyLike(post: FeedPost, isLiked: boolean): FeedPost {
  const countLike = post.like === isLiked ? 0 : isLiked ? 1 : -1;
  return { ...post, like: isLiked, likes: post.likes + countLike };
}

function toggleLikeInFeedList(
  prev: InfiniteData<FeedPage> | undefined,
  postId: number,
): InfiniteData<FeedPage> | undefined {
  if (!prev) return prev;
  return {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      items: page.items.map((post) =>
        post.postId === postId ? applyLike(post, !post.like) : post,
      ),
    })),
  };
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ postId }: { postId: number }) => postToggleLike(postId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: feedQueryKeys.list,
        exact: true,
      });
      await queryClient.cancelQueries({
        queryKey: feedQueryKeys.detail(postId),
      });

      const listSnapshot = queryClient.getQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
      );
      const detailSnapshot = queryClient.getQueryData<FeedPost>(
        feedQueryKeys.detail(postId),
      );

      queryClient.setQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
        (prev) => toggleLikeInFeedList(prev, postId),
      );

      queryClient.setQueryData<FeedPost>(
        feedQueryKeys.detail(postId),
        (prev) => (prev ? applyLike(prev, !prev.like) : prev),
      );

      return { listSnapshot, detailSnapshot };
    },
    onError: (_err, _variables, context) => {
      if (context?.listSnapshot) {
        queryClient.setQueryData<InfiniteData<FeedPage>>(
          feedQueryKeys.list,
          context.listSnapshot,
        );
      }
      if (context?.detailSnapshot) {
        queryClient.setQueryData<FeedPost>(
          feedQueryKeys.detail(context.detailSnapshot.postId),
          context.detailSnapshot,
        );
      }
      toast({
        id: 'like-error',
        type: 'error',
        description: '좋아요 처리 중 오류가 발생했어요.',
      });
    },
    onSettled: (_data, _err, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: feedQueryKeys.list,
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: feedQueryKeys.detail(postId),
      });
    },
  });

  const toggleLike = (postId: number) => {
    mutation.mutate({ postId });
  };

  return { toggleLike, isPending: mutation.isPending };
}
