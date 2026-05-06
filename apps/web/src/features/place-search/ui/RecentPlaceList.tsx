import { type ReactNode } from 'react';

import { type RecentPlace } from '../model/recent-places';
import RecentPlaceItem from './RecentPlaceItem';

type RecentPlaceListProps = {
  places: RecentPlace[];
  idleView: ReactNode;
  onSelect: (place: RecentPlace) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export default function RecentPlaceList({
  places,
  idleView,
  onSelect,
  onRemove,
  onClear,
}: RecentPlaceListProps) {
  if (places.length === 0) return <>{idleView}</>;

  return (
    <section className="bg-semantic-bg-standard">
      <div className="flex items-center justify-between px-5 pt-5 pb-6">
        <h2 className="title-xs text-semantic-object-boldest">최근 검색</h2>
        <button
          type="button"
          className="body-md text-semantic-object-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-accent-normal"
          onClick={onClear}
        >
          전체삭제
        </button>
      </div>
      <ul>
        {places.map((place) => (
          <RecentPlaceItem
            key={place.id}
            place={place}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </section>
  );
}
