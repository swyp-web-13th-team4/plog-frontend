'use client';

import { useToast } from '@plog/ui';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { FEED_QUERY_KEY, type FeedPage } from '@/entities/feed';

import { dialog } from '@/shared/lib/dialog';

import { postToggleBookmark } from '../api/client';

function updateBookmarkInFeedCache(
  prev: InfiniteData<FeedPage> | undefined,
  postId: number,
  isBookmarked: boolean,
): InfiniteData<FeedPage> | undefined {
  if (!prev) return prev;
  return {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      items: page.items.map((post) =>
        post.postId === postId ? { ...post, bookMark: isBookmarked } : post,
      ),
    })),
  };
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: postToggleBookmark,
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
          return updateBookmarkInFeedCache(prev, postId, !current?.bookMark);
        },
      );

      return { snapshot };
    },
    onError: (_err, postId, context) => {
      if (context?.snapshot) {
        const original = context.snapshot.pages
          .flatMap((p) => p.items)
          .find((post) => post.postId === postId);
        queryClient.setQueryData<InfiniteData<FeedPage>>(
          FEED_QUERY_KEY,
          (prev) =>
            updateBookmarkInFeedCache(
              prev,
              postId,
              original?.bookMark ?? false,
            ),
        );
      }
      toast({
        id: 'bookmark-error',
        type: 'error',
        description: '북마크 처리 중 오류가 발생했어요.',
      });
    },
    onSuccess: (res, postId) => {
      queryClient.setQueryData<InfiniteData<FeedPage>>(FEED_QUERY_KEY, (prev) =>
        updateBookmarkInFeedCache(prev, postId, res.isBookmarked),
      );
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });

  const toggleBookmark = async (
    postId: number,
    isBookmarked: boolean,
  ): Promise<boolean> => {
    if (isBookmarked) {
      const confirmed = await dialog.confirm({
        message: '북마크를 취소하시겠어요?',
        confirmLabel: '취소하기',
        cancelLabel: '닫기',
      });
      if (!confirmed) return false;
    }

    mutation.mutate(postId);
    return true;
  };

  return { toggleBookmark, isPending: mutation.isPending };
}
