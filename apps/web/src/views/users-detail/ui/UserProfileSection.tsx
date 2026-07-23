'use client';

import { UserProfile } from '@/entities/user';

import { useFeedProfileViewQuery } from '../model/use-feed-profile-view-query';

export default function UserProfileSection({ userId }: { userId: string }) {
  const { data, isPending, isError } = useFeedProfileViewQuery(userId);

  if (isPending || isError || !data?.memberInfo) return null;

  return <UserProfile profile={data.memberInfo} />;
}
