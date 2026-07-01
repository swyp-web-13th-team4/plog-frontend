'use client';

import * as amplitude from '@amplitude/unified';
import { useToast } from '@plog/ui';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  type FeedDetailItem,
  type FeedItemBase,
  type FeedMainPage,
  feedQueryKeys,
} from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

function postToggleLike(postId: number) {
  return clientApi.post<{ isLiked: boolean }>(`/feed/like/${postId}`);
}

function applyLike<TFeed extends FeedItemBase>(
  post: TFeed,
  isLiked: boolean,
): TFeed {
  const countLike = post.like === isLiked ? 0 : isLiked ? 1 : -1;
  return { ...post, like: isLiked, likes: post.likes + countLike };
}

function toggleLikeInFeedList(
  prev: InfiniteData<FeedMainPage> | undefined,
  postId: number,
): InfiniteData<FeedMainPage> | undefined {
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
    mutationFn: ({ postId }: { postId: number; disableTracking?: boolean }) =>
      postToggleLike(postId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: feedQueryKeys.all,
        exact: true,
      });
      await queryClient.cancelQueries({
        queryKey: feedQueryKeys.detail(postId),
      });

      queryClient.setQueryData<InfiniteData<FeedMainPage>>(
        feedQueryKeys.all,
        (prev) => toggleLikeInFeedList(prev, postId),
      );

      queryClient.setQueryData<FeedDetailItem>(
        feedQueryKeys.detail(postId),
        (prev) => (prev ? applyLike(prev, !prev.like) : prev),
      );
    },
    onSuccess: (data, { postId, disableTracking }) => {
      if (!disableTracking) {
        amplitude.track('like_toggled', {
          post_id: postId,
          liked: data.isLiked,
        });
      }
    },
    onError: () => {
      toast({
        id: 'like-error',
        type: 'error',
        description: '좋아요 처리 중 오류가 발생했어요.',
      });
    },
    onSettled: (_data, _err, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: feedQueryKeys.all,
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: feedQueryKeys.detail(postId),
      });
    },
  });

  const toggleLike = (postId: number, disableTracking?: boolean) => {
    mutation.mutate({ postId, disableTracking });
  };

  return { toggleLike, isPending: mutation.isPending };
}
