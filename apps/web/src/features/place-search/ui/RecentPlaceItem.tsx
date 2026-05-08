import { Icon } from '@plog/ui';

import { type RecentPlace } from '@/entities/place';

import { formatRecentPlaceDate } from '../model/recent-place-date';

type RecentPlaceItemProps = {
  place: RecentPlace;
  onSelect: (place: RecentPlace) => void;
  onRemove: (id: number) => void;
};

export default function RecentPlaceItem({
  place,
  onSelect,
  onRemove,
}: RecentPlaceItemProps) {
  return (
    <li className="border-b border-semantic-stroke-subtle">
      <div className="flex w-full justify-between px-6 py-5 hover:bg-semantic-bg-deep">
        <button
          type="button"
          onClick={() => onSelect(place)}
          className="flex min-w-0 flex-1 cursor-pointer items-center justify-between gap-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-accent-normal"
        >
          <span className="flex min-w-0 items-center gap-1">
            <Icon
              name="clock"
              size={20}
              className="shrink-0 text-semantic-object-subtle"
            />
            <span className="label-md truncate text-semantic-object-boldest">
              {place.placeName}
            </span>
          </span>
          <span className="label-md shrink-0 text-semantic-object-subtle">
            {formatRecentPlaceDate(place.searchedAt)}
          </span>
        </button>
        <button
          type="button"
          className="ml-2 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-accent-normal"
          onClick={() => onRemove(place.id)}
          aria-label={`${place.placeName} 삭제`}
        >
          <Icon
            name="close"
            size={20}
            className="text-semantic-object-normal"
          />
        </button>
      </div>
    </li>
  );
}
