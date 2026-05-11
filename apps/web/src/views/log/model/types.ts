import { type CreateLogValues } from '@/features/create-log';

import { type PlaceTagValue, type PostScope } from '@/entities/feed';

import { type PhotoPreview } from './use-photo-upload';

export type CreateLogFormValues = CreateLogValues & {
  photos: PhotoPreview[];
};

export type PostTime = {
  hour: number;
  minute: number;
};

export type PostPlace = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type PostCreateRequest = {
  title: string;
  contents: string;
  startedAt: PostTime;
  endedAt: PostTime;
  studyDate: string;
  focus: number;
  scope: PostScope;
  place: PostPlace;
  placeTags: PlaceTagValue[];
  categoryCode: string;
};

export type PostUpdateRequest = PostCreateRequest & {
  keepImageIds: number[];
};

export type PostImage = {
  id: number;
  url: string;
};

export type PostEditFields = Omit<PostCreateRequest, 'place'> & {
  studyTime: number;
  place: PostPlace;
};

export type PostEditData = {
  post: PostEditFields;
  images: {
    images: PostImage[];
    total: number;
  };
};
