'use client';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { getCategoryLabel, type PlaceLayer } from '@/entities/place';

import { ImageWithFallback } from '@/shared/ui';

import { type MapSheetPlace } from '../model/types';

type MapPlaceItemProps = {
  layer: PlaceLayer;
  place: MapSheetPlace;
  onClick?: () => void;
};

export default function MapPlaceItem({
  layer,
  place,
  onClick,
}: MapPlaceItemProps) {
  return (
    <div
      className={cn('flex gap-4 py-5', onClick && 'cursor-pointer')}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="relative size-30 overflow-hidden rounded-xl mobile:size-27">
        <ImageWithFallback
          src={place.thumbnailUrl}
          alt={place.placeName}
          fill
          sizes="(max-width: 440px) 108px, 120px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <p className="label-lg truncate text-semantic-object-boldest">
          {place.placeName}
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
            {getCategoryLabel(place.placeCategory)}
          </span>
          <span className="body-xs flex items-center gap-1">
            <Icon
              name={layer === 'record' ? 'pencil' : 'bookmark'}
              size={16}
              className="text-semantic-object-subtle"
            />
            {place.count}개
          </span>
        </div>
      </div>
    </div>
  );
}
