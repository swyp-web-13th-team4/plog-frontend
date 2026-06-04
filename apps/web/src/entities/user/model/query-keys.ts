import { useQuery } from '@tanstack/react-query';

import { getAnalytics, getMypage } from '../api/client';

export const mypageQueryKeys = {
  all: ['mypage'] as const,
  info: () => ['mypage', 'info'] as const,
  analytics: () => ['mypage', 'analytics'] as const,
  posts: (sort: string, tags: readonly string[]) =>
    ['mypage', 'posts', sort, tags] as const,
  bookmarks: (sort: string, tags: readonly string[]) =>
    ['mypage', 'bookmarks', sort, tags] as const,
  badges: () => ['mypage', 'badges'] as const,
};

export function useMypageQuery() {
  return useQuery({
    queryKey: mypageQueryKeys.info(),
    queryFn: getMypage,
  });
}

export function useAnalyticsQuery() {
  return useQuery({
    queryKey: mypageQueryKeys.analytics(),
    queryFn: getAnalytics,
  });
}
