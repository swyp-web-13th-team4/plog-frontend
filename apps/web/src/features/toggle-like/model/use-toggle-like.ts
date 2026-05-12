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

function updateLikeInFeedCache(
  prev: InfiniteData<FeedPage> | undefined,
  postId: number,
  isLiked: boolean,
): InfiniteData<FeedPage> | undefined {
  if (!prev) return prev;
  return {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      items: page.items.map((post) => {
        if (post.postId !== postId) return post;
        const delta = post.like === isLiked ? 0 : isLiked ? 1 : -1;
        return { ...post, like: isLiked, likes: post.likes + delta };
      }),
    })),
  };
}

function updateLikeInFeedDetailCache(
  prev: FeedPost | undefined,
  postId: number,
  isLiked: boolean,
): FeedPost | undefined {
  if (!prev || prev.postId !== postId) return prev;

  const delta = prev.like === isLiked ? 0 : isLiked ? 1 : -1;
  return { ...prev, like: isLiked, likes: prev.likes + delta };
}

type ToggleLikeVariables = {
  postId: number;
  isLiked: boolean;
};

export function useToggleLike() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ postId }: ToggleLikeVariables) => postToggleLike(postId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: feedQueryKeys.list });
      await queryClient.cancelQueries({
        queryKey: feedQueryKeys.detail(postId),
      });

      const snapshot = queryClient.getQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
      );
      const detailSnapshot = queryClient.getQueryData<FeedPost>(
        feedQueryKeys.detail(postId),
      );

      queryClient.setQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
        (prev) => updateLikeInFeedCache(prev, postId, !detailSnapshot?.like),
      );

      queryClient.setQueryData<FeedPost>(feedQueryKeys.detail(postId), (prev) =>
        updateLikeInFeedDetailCache(prev, postId, !detailSnapshot?.like),
      );

      return { detailSnapshot, snapshot };
    },
    onError: (_err, _variables, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData<InfiniteData<FeedPage>>(
          feedQueryKeys.list,
          context.snapshot,
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
    onSuccess: (res, { postId }) => {
      queryClient.setQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
        (prev) => updateLikeInFeedCache(prev, postId, res.isLiked),
      );
      queryClient.setQueryData<FeedPost>(feedQueryKeys.detail(postId), (prev) =>
        updateLikeInFeedDetailCache(prev, postId, res.isLiked),
      );
    },
  });

  const toggleLike = (postId: number, isLiked: boolean) => {
    mutation.mutate({ postId, isLiked });
  };

  return { toggleLike, isPending: mutation.isPending };
}
