import { type DateValue, type TimeValue } from '@plog/ui';

import { type SelectedPlace } from '@/features/place-search/model/selected-place';

import { type PlaceTagValue } from '@/entities/feed';
import { type PlaceCategoryValue } from '@/entities/place';

import { type FocusLevel } from '../ui/RatingPicker';
import { type PhotoPreview } from './use-photo-upload';

export type CreateLogFormValues = {
  title: string;
  contents: string;
  photos: PhotoPreview[];
  place: SelectedPlace | null;
  categoryCode: PlaceCategoryValue | null;
  studyDate: DateValue | null;
  startedAt: TimeValue | null;
  endedAt: TimeValue | null;
  focus: FocusLevel | null;
  placeTags: PlaceTagValue[];
  isPublic: boolean;
};
