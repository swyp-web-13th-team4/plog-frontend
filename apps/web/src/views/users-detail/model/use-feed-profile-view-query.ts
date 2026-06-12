'use client';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { feedQueryKeys, profileFeedItemSchema } from '@/entities/feed';
import { mypageDataSchema } from '@/entities/user/model/schemas';

import { clientApi } from '@/shared/api/client-api';

export const feedProfileViewResponseSchema = z.object({
  memberInfo: mypageDataSchema,
  posts: z.array(profileFeedItemSchema),
});

export type FeedProfileViewResponse = z.infer<
  typeof feedProfileViewResponseSchema
>;

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
