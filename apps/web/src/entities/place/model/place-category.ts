export type Category =
  | 'cafe'
  | 'study-cafe'
  | 'library'
  | 'office'
  | 'shared-office'
  | 'etc';

export type PlaceCategory = {
  label: string;
  value: Category;
};

export const PLACE_CATEGORIES = [
  { label: '카페', value: 'cafe' },
  { label: '스터디 카페', value: 'study-cafe' },
  { label: '도서관', value: 'library' },
  { label: '사무실', value: 'office' },
  { label: '공유 오피스', value: 'shared-office' },
  { label: '기타 장소', value: 'etc' },
] as const;
