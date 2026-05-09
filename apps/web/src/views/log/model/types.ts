import { type CreateLogStoredValues } from '@/features/create-log';

import { type PlaceTagValue, type PostScope } from '@/entities/feed';

import { type PhotoPreview } from './use-photo-upload';

export type CreateLogFormValues = CreateLogStoredValues & {
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
  images: number[];
};

export type PostImage = {
  id: number;
  url: string;
};

export type PostEditFields = Omit<PostCreateRequest, 'place'> & {
  studyTime: number;
  placeName: string;
  placeAddress: string;
  latitude: number;
  longitude: number;
};

export type PostEditData = {
  post: PostEditFields;
  images: {
    images: PostImage[];
    total: number;
  };
};
