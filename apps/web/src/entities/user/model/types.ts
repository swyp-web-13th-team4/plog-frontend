import { BadgeDto } from '@/shared/api/dto/badge';

export type TermId = 'isOver14' | 'service' | 'privacy' | 'geolocation';

export type TermsAgreements = Record<TermId, boolean>;

type UserMainBadge = BadgeDto;

export type SetupProfileRequest = {
  nickname: string;
  introduction?: string;
};

export type ProfileImageOption =
  | { type: 'default'; imageId: number }
  | { type: 'upload'; file: File };

export type DefaultProfileImage = {
  id: number;
  imageUrl: string;
};

export type UserProfileType = {
  id: string;
  nickname: string;
  profileImage?: string;
  introduction?: string;
  mainBadge?: UserMainBadge;
};
