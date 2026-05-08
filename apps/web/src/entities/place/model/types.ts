export type PlaceLayer = 'record' | 'bookmark';

export type Place = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  address: string;
  imageUrl: string;
  category: string;
  recordCount?: number;
  bookmarkCount?: number;
  totalWorkHours: number;
  averageFocus: number;
};

export type RecentPlace = {
  id: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  searchedAt: string;
};

export type RecentPlacesResponse = {
  places: RecentPlace[];
  totalCount: number;
};

export type SaveRecentPlaceRequest = {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type RecentPlaceSaveResponse = {
  totalCount: number;
};

export type RecentPlaceDeleteResponse = {
  deletedCount: number;
};
