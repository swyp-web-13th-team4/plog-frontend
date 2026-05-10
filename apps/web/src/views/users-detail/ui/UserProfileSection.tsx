'use client';

import { UserProfile, type UserProfileType } from '@/entities/user';

import { useFeedProfileViewQuery } from '../model/use-feed-profile-view-query';

function getProfileFromFeedView(
  data: ReturnType<typeof useFeedProfileViewQuery>['data'],
): UserProfileType | null {
  if (data?.memberInfo) return data.memberInfo;

  const firstPost = data?.posts[0];
  if (!firstPost) return null;

  return {
    nickname: firstPost.name,
    profileImageUrl: firstPost.profileImage,
    introduction: null,
    mainBadge: null,
  };
}

export default function UserProfileSection({ userId }: { userId: string }) {
  const { data, isPending, isError } = useFeedProfileViewQuery(userId);
  const profile = getProfileFromFeedView(data);

  if (isPending || isError || !profile) return null;

  return <UserProfile profile={profile} />;
}
