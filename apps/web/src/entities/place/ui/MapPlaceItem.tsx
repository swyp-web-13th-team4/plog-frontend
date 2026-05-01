'use client';

import { cn } from '@plog/utils';

import ClockIcon from '@/shared/assets/icons/clock.svg';
import FireIcon from '@/shared/assets/icons/fire.svg';
import PinIcon from '@/shared/assets/icons/pin.svg';
import { ImageWithFallback } from '@/shared/ui';

import { type Place } from '../model/types';

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
            <PinIcon />
            {place.category}
          </span>
          <span className="body-xs flex items-center gap-1">
            <ClockIcon />
            {place.totalWorkHours}h
          </span>
          <span className="body-xs flex items-center gap-1">
            <FireIcon />
            집중도 {place.averageFocus}
          </span>
        </div>
      </div>
    </div>
  );
}
