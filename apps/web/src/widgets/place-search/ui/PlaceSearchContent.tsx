import { type ReactNode } from 'react';

import { type RecentPlace, RecentPlaceList } from '@/features/place-search';

import { type SearchState } from '../model/types';

type PlaceSearchContentProps = {
  state: SearchState;
  resultList: ReactNode;
  recentPlaces: RecentPlace[];
  onRecentSelect: (place: RecentPlace) => void;
  onRecentRemove: (id: string) => void;
  onRecentClear: () => void;
  idleView: ReactNode;
  emptyView: ReactNode;
  errorView: ReactNode;
};

export default function PlaceSearchContent({
  state,
  resultList,
  recentPlaces,
  onRecentSelect,
  onRecentRemove,
  onRecentClear,
  idleView,
  emptyView,
  errorView,
}: PlaceSearchContentProps) {
  if (state === 'success') return <>{resultList}</>;
  if (state === 'empty') return <>{emptyView}</>;
  if (state === 'error') return <>{errorView}</>;

  return (
    <RecentPlaceList
      places={recentPlaces}
      idleView={idleView}
      onSelect={onRecentSelect}
      onRemove={onRecentRemove}
      onClear={onRecentClear}
    />
  );
}
