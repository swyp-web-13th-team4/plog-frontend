'use client';

import { cn } from '@plog/utils';

import { type Place } from '@/entities/place/model/types';

import { Icon } from '@plog/ui';

import { ImageWithFallback } from '@/shared/ui';

type MapPlaceItemProps = {
  place: Place;
  onClick?: () => void;
};

export default function MapPlaceItem({ place, onClick }: MapPlaceItemProps) {
  return (
    <div
      className={cn('flex gap-4 py-4', onClick && 'cursor-pointer')}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <ImageWithFallback
        src={place.imageUrl}
        alt={place.name}
        width={72}
        height={72}
        className="size-18 shrink-0 rounded-lg object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <p className="label-lg truncate text-semantic-object-boldest">
          {place.name}
        </p>
        <p className="caption-md flex-1 truncate text-semantic-object-normal">
          {place.address}
        </p>
        <div className="caption-md mt-0.5 flex items-center gap-3 text-semantic-object-normal">
          <span className="body-xs flex items-center gap-1">
            <Icon
              name="pin"
              size={16}
              className="text-semantic-object-subtle"
            />
            {place.category}
          </span>
          <span className="body-xs flex items-center gap-1">
            <Icon
              name="clock"
              size={16}
              className="text-semantic-object-subtle"
            />
            {place.totalWorkHours}h
          </span>
          <span className="body-xs flex items-center gap-1">
            <Icon
              name="fire"
              size={16}
              className="text-semantic-object-subtle"
            />
            집중도 {place.averageFocus}
          </span>
        </div>
      </div>
    </div>
  );
}
