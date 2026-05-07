'use client';

import { UserProfile, type UserProfileType } from '@/entities/user';

// TODO: API 연동 시 /api/feed/profileView/{memberKey} 응답의 memberInfo로 교체
const MOCK_PROFILE: UserProfileType = {
  id: 4,
  nickname: 'zl존하민ㅋ',
  introduction:
    '글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자글자수백자',
  mainBadge: null,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UserProfileSection({ userId }: { userId: string }) {
  return <UserProfile profile={MOCK_PROFILE} />;
}
