import { type StaticImageData } from 'next/image';

import { type TypeCardId, type UserBadge } from './schemas';

export type TypeCardTheme =
  | 'green'
  | 'yellow'
  | 'pink'
  | 'sky'
  | 'navy'
  | 'purple';

export type TypeCardStat = {
  label: string;
  filled: number;
};

export type TypeCardData = {
  id: TypeCardId;
  name: string;
  fullName: string;
  image: StaticImageData;
  theme: TypeCardTheme;
  summary: string;
  description: string;
  stats: TypeCardStat[];
  traits: string[];
};

export type TermId = 'isOver14' | 'service' | 'privacy' | 'geolocation';

export type TermsAgreements = Record<TermId, boolean>;

export type SetupProfileRequest = {
  nickname: string;
  introduction?: string;
};

export type ProfileImageOption =
  | { type: 'default'; imageId: number }
  | { type: 'upload'; file: File }
  | { type: 'unchanged' };

export type DefaultProfileImage = {
  id: number;
  imageUrl: string;
};

export type UserProfileType = {
  id?: number;
  nickname: string;
  profileImageUrl?: string;
  introduction: string | null;
  mainBadge: UserBadge | null;
};
