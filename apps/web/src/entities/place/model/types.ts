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
