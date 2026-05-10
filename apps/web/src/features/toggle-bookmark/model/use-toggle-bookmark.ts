'use client';

import { useToast } from '@plog/ui';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { type FeedPage, feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';
import { dialog } from '@/shared/lib/dialog';

export function postToggleBookmark(postId: number) {
  return clientApi.post<{ isBookmarked: boolean }>(`/feed/bookmark/${postId}`);
}

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
      await queryClient.cancelQueries({ queryKey: feedQueryKeys.list });
      const snapshot = queryClient.getQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
      );

      queryClient.setQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
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
          feedQueryKeys.list,
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
      queryClient.setQueryData<InfiniteData<FeedPage>>(
        feedQueryKeys.list,
        (prev) => updateBookmarkInFeedCache(prev, postId, res.isBookmarked),
      );
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
      queryClient.invalidateQueries({ queryKey: ['map', 'count'] });
      queryClient.invalidateQueries({ queryKey: ['map', 'pins', 'bookmark'] });
      queryClient.invalidateQueries({ queryKey: ['map', 'sheet', 'bookmark'] });
      queryClient.invalidateQueries({ queryKey: ['map', 'pin-detail'] });
      queryClient.invalidateQueries({ queryKey: ['map', 'place'] });
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
