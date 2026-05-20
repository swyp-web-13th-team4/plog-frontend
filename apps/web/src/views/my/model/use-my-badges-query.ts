import { useQuery } from '@tanstack/react-query';

import { mypageQueryKeys, type UserBadge } from '@/entities/user';

import { clientApi } from '@/shared/api/client-api';

async function fetchMyBadges() {
  return clientApi.get<{ badges: UserBadge[] }>('/members/badge');
}

export function useMyBadgesQuery() {
  return useQuery({
    queryKey: mypageQueryKeys.badges,
    queryFn: () => fetchMyBadges(),
    select: (data) => data.badges,
  });
}
