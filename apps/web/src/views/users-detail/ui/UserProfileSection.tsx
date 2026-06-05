'use client';

import { UserProfile } from '@/entities/user';

import { type FeedProfileViewResponse } from '../model/schemas';
import { useFeedProfileViewQuery } from '../model/use-feed-profile-view-query';

type UserProfileSectionProps = {
  userId: string;
  initialData?: FeedProfileViewResponse;
};

export default function UserProfileSection({
  userId,
  initialData,
}: UserProfileSectionProps) {
  const { data, isPending, isError } = useFeedProfileViewQuery(
    userId,
    initialData,
  );

  if (isPending || isError || !data?.memberInfo) return null;

  return <UserProfile profile={data.memberInfo} />;
}
