import { type DateValue, type TimeValue } from '@plog/ui';
import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { type SelectedPlace } from '@/features/place-search/model/selected-place';

import { type PlaceTagValue, type PostScope } from '@/entities/feed';
import { type PlaceCategoryValue } from '@/entities/place';

import { type FocusLevel } from '../ui/RatingPicker';
import { type CreateLogFormValues } from './types';

type CreateLogStoredValues = Omit<CreateLogFormValues, 'photos'>;

export const initialCreateLogValues = {
  title: '',
  contents: '',
  place: null as SelectedPlace | null,
  categoryCode: null as PlaceCategoryValue | null,
  studyDate: null as DateValue | null,
  startedAt: null as TimeValue | null,
  endedAt: null as TimeValue | null,
  focus: null as FocusLevel | null,
  placeTags: [] as PlaceTagValue[],
  scope: 'PRIVATE' as PostScope,
};

const initialState = {
  values: initialCreateLogValues,
  hasPhotos: false,
};

export function hasCreateLogValues(values: CreateLogStoredValues) {
  return (
    values.title.trim().length > 0 ||
    values.contents.trim().length > 0 ||
    values.place !== null ||
    values.categoryCode !== null ||
    values.studyDate !== null ||
    values.startedAt !== null ||
    values.endedAt !== null ||
    values.focus !== null ||
    values.placeTags.length > 0 ||
    values.scope === 'PUBLIC'
  );
}

export const useCreateLogStore = create(
  persist(
    combine(initialState, (set) => ({
      setValues: (values: Partial<CreateLogStoredValues>) =>
        set((state) => ({ values: { ...state.values, ...values } })),
      setHasPhotos: (hasPhotos: boolean) => set({ hasPhotos }),
      reset: () => set(initialState),
    })),
    {
      name: 'plog:create-log',
      partialize: (state) => ({ values: state.values }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<typeof initialState>;

        return {
          ...currentState,
          ...persisted,
          values: {
            ...currentState.values,
            ...persisted.values,
          },
        };
      },
    },
  ),
);

export function getCreateLogFormDefaultValues(
  initialPlace: SelectedPlace | null,
): CreateLogFormValues {
  const persistedValues = useCreateLogStore.getState().values;

  return {
    ...persistedValues,
    place: initialPlace ?? persistedValues.place,
    photos: [],
  };
}
