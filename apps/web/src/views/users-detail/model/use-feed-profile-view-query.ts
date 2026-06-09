'use client';

import { useQuery } from '@tanstack/react-query';

import { feedQueryKeys, feedUserProfileResponseSchema } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

function fetchFeedProfileView(memberKey: string) {
  return clientApi.get(
    `/feed/profileView/${encodeURIComponent(memberKey)}`,
    feedUserProfileResponseSchema,
  );
}

export function useFeedProfileViewQuery(memberKey: string) {
  const selectedMember = memberKey.trim();

  return useQuery({
    queryKey: feedQueryKeys.profileView(selectedMember),
    queryFn: () => fetchFeedProfileView(selectedMember),
    enabled: selectedMember.length > 0,
  });
}
