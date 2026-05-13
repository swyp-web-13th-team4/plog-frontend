import { type CreateLogValues } from '@/features/create-log';

import { type PlaceTagValue, type PostScope } from '@/entities/feed';

import { type PhotoPreview } from './use-photo-upload';

export type CreateLogFormValues = CreateLogValues & {
  photos: PhotoPreview[];
};

export type Time = {
  hour: number;
  minute: number;
};

export type Place = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type CreateRequest = {
  title: string;
  contents: string;
  startedAt: Time;
  endedAt: Time;
  studyDate: string;
  focus: number;
  scope: PostScope;
  place: Place;
  placeTags: PlaceTagValue[];
  categoryCode: string;
};

export type UpdateRequest = CreateRequest & {
  keepImageIds: number[];
};

export type PostImage = {
  id: number;
  url: string;
};

export type EditFields = Omit<CreateRequest, 'place'> & {
  studyTime: number;
  place: Place;
};

export type EditData = {
  post: EditFields;
  images: {
    images: PostImage[];
    total: number;
  };
};
