export type TermId = 'isOver14' | 'service' | 'privacy' | 'geolocation';

export type TermsAgreements = Record<TermId, boolean>;

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
