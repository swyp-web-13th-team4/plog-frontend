'use client';

import { useQuery } from '@tanstack/react-query';

import { feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

import { type UserDetailData } from './types';

function fetchFeedProfileView(memberKey: string) {
  return clientApi.get<UserDetailData>(
    `/feed/profileView/${encodeURIComponent(memberKey)}`,
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
