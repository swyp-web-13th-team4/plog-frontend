import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { feedQueryKeys, toMemberKey } from '@/entities/feed/model/query-keys';

import { getQueryClient } from '@/shared/lib/query-client';

import { getUserProfile, getUserProfilePosts } from '../api/server';
import { DEFAULT_POST_SORT } from '../model/constants';
import UserFeedSection from './UserFeedSection';
import UserProfileSection from './UserProfileSection';

export default async function UserProfileContent({
  userId,
}: {
  userId: string;
}) {
  const memberKey = toMemberKey(userId);
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: feedQueryKeys.profileView(memberKey),
      queryFn: () => getUserProfile(memberKey),
    }),
    queryClient.prefetchQuery({
      queryKey: feedQueryKeys.profileViewPosts(memberKey, DEFAULT_POST_SORT),
      queryFn: () => getUserProfilePosts(memberKey, DEFAULT_POST_SORT),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-3 pt-[var(--spacing-header)]">
        <UserProfileSection userId={memberKey} />
        <UserFeedSection userId={memberKey} />
      </div>
    </HydrationBoundary>
  );
}
