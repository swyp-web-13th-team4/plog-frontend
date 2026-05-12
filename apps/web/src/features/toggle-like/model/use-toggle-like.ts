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

function updateLikeCount(
  post: FeedPost,
  postId: number,
  isLiked: boolean,
): FeedPost {
  if (post.postId !== postId) return post;

  const countLike = post.like === isLiked ? 0 : isLiked ? 1 : -1;
  return { ...post, like: isLiked, likes: post.likes + countLike };
}

function updateLikeInFeedList(
  prev: InfiniteData<FeedPage> | undefined,
  postId: number,
  isLiked: boolean,
): InfiniteData<FeedPage> | undefined {
  if (!prev) return prev;

  return {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      items: page.items.map((post) => updateLikeCount(post, postId, isLiked)),
    })),
  };
}

function updateLikeInFeedDetail(
  prev: FeedPost | undefined,
  postId: number,
  isLiked: boolean,
): FeedPost | undefined {
  if (!prev) return prev;

  return updateLikeCount(prev, postId, isLiked);
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ postId }: { postId: number }) => postToggleLike(postId),
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
        (prev) => updateLikeInFeedList(prev, postId, !detailSnapshot?.like),
      );

      queryClient.setQueryData<FeedPost>(feedQueryKeys.detail(postId), (prev) =>
        updateLikeInFeedDetail(prev, postId, !detailSnapshot?.like),
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
        (prev) => updateLikeInFeedList(prev, postId, res.isLiked),
      );
      queryClient.setQueryData<FeedPost>(feedQueryKeys.detail(postId), (prev) =>
        updateLikeInFeedDetail(prev, postId, res.isLiked),
      );
    },
  });

  const toggleLike = (postId: number) => {
    mutation.mutate({ postId });
  };

  return { toggleLike, isPending: mutation.isPending };
}
