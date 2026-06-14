'use client';

import { useQuery } from '@tanstack/react-query';

import { feedQueryKeys, feedUserProfileResponseSchema } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

import { feedProfileViewResponseSchema } from './schemas';

function fetchFeedProfileView(memberKey: string) {
  return clientApi.get(
    `/feed/profileView/${encodeURIComponent(memberKey)}`,
    feedProfileViewResponseSchema,
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
