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

export type MapBounds = {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
};
