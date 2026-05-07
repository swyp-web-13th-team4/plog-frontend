'use client';

import { MOCK_FEED_DATA } from '@/entities/feed/model/mock-data';
import { UserProfile, type UserProfileType } from '@/entities/user';

const INTRODUCTION_TEXT =
  '글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자';

export default function UserProfileSection({ userId }: { userId: string }) {
  const user = MOCK_FEED_DATA.find(
    (item) => item.POST_INFO.USER_INFO.id === userId,
  );

  const userProfileInfo = user?.POST_INFO.USER_INFO;

  if (!userProfileInfo) return null;

  const profile: UserProfileType = {
    id: userProfileInfo.id,
    nickname: userProfileInfo.nickname,
    profileImage: userProfileInfo.profileImage,
    introduction: INTRODUCTION_TEXT,
    mainBadge: userProfileInfo.mainBadge,
  };

  return <UserProfile profile={profile} />;
}
