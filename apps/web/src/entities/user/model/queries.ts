import { useQuery } from '@tanstack/react-query';

import { getAnalytics, getMypage } from '../api/client';

export const mypageQueryKeys = {
  info: ['mypage', 'info'] as const,
  analytics: ['mypage', 'analytics'] as const,
};

export function useMypageQuery() {
  return useQuery({
    queryKey: mypageQueryKeys.info,
    queryFn: getMypage,
  });
}

export function useAnalyticsQuery() {
  return useQuery({
    queryKey: mypageQueryKeys.analytics,
    queryFn: getAnalytics,
  });
}
