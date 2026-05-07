'use client';

import { type InfiniteData, useQueryClient } from '@tanstack/react-query';

import { FEED_QUERY_KEY, type FeedPage } from '@/entities/feed';

export function useToggleLike() {
  const queryClient = useQueryClient();

  const toggleLike = (postId: number) => {
    queryClient.setQueryData<InfiniteData<FeedPage>>(FEED_QUERY_KEY, (prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        pages: prev.pages.map((page) => ({
          ...page,
          items: page.items.map((post) =>
            post.postId === postId ? { ...post, like: !post.like } : post,
          ),
        })),
      };
    });
  };

  return { toggleLike };
}
