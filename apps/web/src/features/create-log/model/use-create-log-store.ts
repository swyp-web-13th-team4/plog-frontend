import { type DateValue, type TimeValue } from '@plog/ui';
import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { type PlaceTagValue, type PostScope } from '@/entities/feed';
import { type PlaceCategoryValue } from '@/entities/place';

import {
  type CreateLogPlace,
  type CreateLogStoredValues,
  type FocusLevel,
} from './types';

export const initialCreateLogValues = {
  title: '',
  contents: '',
  place: null as CreateLogPlace | null,
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
  hasHydrated: false,
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
      reset: () => {
        set((state) => ({
          ...initialState,
          hasHydrated: state.hasHydrated,
        }));
      },
      setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),
    })),
    {
      name: 'plog:create-log',
      partialize: (state) => ({ values: state.values }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
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

export function getCreateLogDefaultValues(): CreateLogStoredValues {
  return structuredClone(useCreateLogStore.getState().values);
}
