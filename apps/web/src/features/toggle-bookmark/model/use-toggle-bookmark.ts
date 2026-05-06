'use client';

import { type InfiniteData, useQueryClient } from '@tanstack/react-query';

import { FEED_QUERY_KEY, type FeedPage } from '@/entities/feed';

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  const toggleBookmark = (postId: string) => {
    queryClient.setQueryData<InfiniteData<FeedPage>>(FEED_QUERY_KEY, (prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        pages: prev.pages.map((page) => ({
          ...page,
          items: page.items.map((post) =>
            post.POST_INFO.id === postId
              ? {
                  ...post,
                  POST_INFO: {
                    ...post.POST_INFO,
                    isBookmarked: !post.POST_INFO.isBookmarked,
                  },
                }
              : post,
          ),
        })),
      };
    });
  };

  return { toggleBookmark };
}
