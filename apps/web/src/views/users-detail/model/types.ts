import { type UserBadge } from '@/entities/user';

export type UserDetailProfile = {
  id?: number;
  nickname: string;
  profileImageUrl?: string;
  introduction: string | null;
  mainBadge: UserBadge | null;
};

export type UserDetailData = {
  memberInfo: UserDetailProfile;
};
