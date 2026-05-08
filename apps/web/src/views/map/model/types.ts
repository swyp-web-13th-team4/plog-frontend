import { type PlaceTagValue } from '@/entities/feed';

export type MapPin = {
  placeId: number;
  latitude: number;
  longitude: number;
  count: number;
  thumbnailUrl: string;
};

export type MapSheetPlace = {
  placeId: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  count: number;
  thumbnailUrl: string;
  placeCategory: string;
  lastStudyDate: string;
};

export type MapPinDetail = {
  placeId: number;
  placeName: string;
  address: string;
  count: number;
  avgFocus: number;
  totalStudyTime: number;
  thumbnailUrl: string;
  placeCategory: string;
};

export type MapSortType = 'LATEST' | 'RECORD_COUNT' | 'STUDY_TIME' | 'FOCUS';

export type MapBounds = {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
};

export type MapSearchPlace = {
  placeId: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  lastStudyDate: string;
};

export type PlacePost = {
  postId: number;
  title: string;
  studyDate: string;
  studyTime: number;
  focus: number;
  contents: string;
  thumbnailUrl: string;
  categoryCode: string;
  tags: PlaceTagValue[];
};
