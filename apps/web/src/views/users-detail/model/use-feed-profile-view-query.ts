'use client';

import { useQuery } from '@tanstack/react-query';

import { feedQueryKeys } from '@/entities/feed';

import { clientApi } from '@/shared/api/client-api';

import {
  type FeedProfileViewResponse,
  feedProfileViewResponseSchema,
} from './schemas';

function fetchFeedProfileView(memberKey: string) {
  return clientApi.get(
    `/feed/profileView/${encodeURIComponent(memberKey)}`,
    feedProfileViewResponseSchema,
  );
}

export function useFeedProfileViewQuery(
  memberKey: string,
  initialData?: FeedProfileViewResponse,
) {
  const selectedMember = memberKey.trim();

  return useQuery({
    queryKey: feedQueryKeys.profileView(selectedMember),
    queryFn: () => fetchFeedProfileView(selectedMember),
    enabled: selectedMember.length > 0,
    initialData,
  });
}
