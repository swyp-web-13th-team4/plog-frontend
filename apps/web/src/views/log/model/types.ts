import { type z } from 'zod';

import { type createLogSchema } from './schema';

export type CreateLogFormValues = z.infer<typeof createLogSchema>;

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
  focus: NonNullable<CreateLogFormValues['focus']>;
  scope: CreateLogFormValues['scope'];
  place: Place;
  placeTags: CreateLogFormValues['placeTags'];
  categoryCode: NonNullable<CreateLogFormValues['categoryCode']>;
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
