'use client';

import { useToast } from '@plog/ui';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { FEED_QUERY_KEY, type FeedPage } from '@/entities/feed';

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

export function useToggleLike() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: postToggleLike,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEY });
      const snapshot =
        queryClient.getQueryData<InfiniteData<FeedPage>>(FEED_QUERY_KEY);

      queryClient.setQueryData<InfiniteData<FeedPage>>(
        FEED_QUERY_KEY,
        (prev) => {
          const current = prev?.pages
            .flatMap((p) => p.items)
            .find((post) => post.postId === postId);
          return updateLikeInFeedCache(prev, postId, !current?.like);
        },
      );

      return { snapshot };
    },
    onError: (_err, _postId, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData<InfiniteData<FeedPage>>(
          FEED_QUERY_KEY,
          context.snapshot,
        );
      }
      toast({
        id: 'like-error',
        type: 'error',
        description: '좋아요 처리 중 오류가 발생했어요.',
      });
    },
    onSuccess: (res, postId) => {
      queryClient.setQueryData<InfiniteData<FeedPage>>(FEED_QUERY_KEY, (prev) =>
        updateLikeInFeedCache(prev, postId, res.isLiked),
      );
    },
  });

  const toggleLike = (postId: number) => {
    mutation.mutate(postId);
  };

  return { toggleLike, isPending: mutation.isPending };
}
