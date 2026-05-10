'use client';

import { useQuery } from '@tanstack/react-query';

import { feedQueryKeys, getFeedProfileView } from '@/entities/feed';

export function useFeedProfileViewQuery(memberKey: string) {
  const selectedMember = memberKey.trim();

  return useQuery({
    queryKey: feedQueryKeys.profileView(selectedMember),
    queryFn: () => getFeedProfileView(selectedMember),
    enabled: selectedMember.length > 0,
  });
}
