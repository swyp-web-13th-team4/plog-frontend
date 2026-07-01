export type PlaceLayer = 'record' | 'bookmark';

export type MapSortType = 'LATEST' | 'RECORD_COUNT' | 'STUDY_TIME' | 'FOCUS';

export type SaveRecentPlaceRequest = {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
};
