import { type DateValue, type TimeValue } from '@plog/ui';

import { type PlaceTagValue, type PostScope } from '@/entities/feed';
import { type PlaceCategoryValue } from '@/entities/place';

export type FocusLevel = 1 | 2 | 3 | 4 | 5;

export type CreateLogPlace = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type CreateLogStoredValues = {
  title: string;
  contents: string;
  place: CreateLogPlace | null;
  categoryCode: PlaceCategoryValue | null;
  studyDate: DateValue | null;
  startedAt: TimeValue | null;
  endedAt: TimeValue | null;
  focus: FocusLevel | null;
  placeTags: PlaceTagValue[];
  scope: PostScope;
};
