import { type StaticImageData } from 'next/image';

export type UserBadge = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  isAcquired: boolean;
};

export type TypeCardId = 'LOGI' | 'CHICHI' | 'TORI' | 'HARU' | 'POPO' | 'NAO';

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

export type MypageData = {
  nickname: string;
  profileImageUrl: string;
  introduction: string | null;
  mainBadge: UserBadge | null;
};

export type AnalyticsFocusEnvironment = {
  bestTimePeriod: string;
  bestTimePeriodAvgFocus: number;
  bestPlaceTag: string;
  bestPlaceTagAvgFocus: number;
  worstPlaceTag: string;
  worstPlaceTagAvgFocus: number;
};

export type AnalyticsSpaceRanking = {
  placeCategoryName: string;
  postCount: number;
  averageFocus: number;
};

export type AnalyticsData = {
  totalPostCount: number;
  totalStudyTime: number;
  workType: TypeCardId | null;
  focusEnvironment: AnalyticsFocusEnvironment | null;
  spaceRankings: AnalyticsSpaceRanking[] | null;
};
