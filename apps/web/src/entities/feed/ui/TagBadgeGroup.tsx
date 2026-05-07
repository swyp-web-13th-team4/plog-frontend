'use client';

import { useId, useState } from 'react';

import { Badge } from '@plog/ui';
import { cn } from '@plog/utils';

import { PLACE_TAG_LABELS, type PlaceTagValue } from '../model/place-tag';

type TagBadgeGroupProps = {
  tags: PlaceTagValue[];
  maxVisible?: number;
  popoverSide?: 'bottom' | 'right';
};

const POPOVER_SIDE_CLASS = {
  bottom: 'top-full left-0 mt-2',
  right: 'left-full top-0 ml-2',
} as const;

export default function TagBadgeGroup({
  tags,
  maxVisible = 3,
  popoverSide = 'bottom',
}: TagBadgeGroupProps) {
  const hiddenTagsId = useId();
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTags = tags.slice(0, maxVisible);
  const hiddenTags = tags.slice(maxVisible);
  const hasHiddenTags = hiddenTags.length > 0;

  return (
    <div className="flex gap-2">
      {visibleTags.map((tag) => (
        <Badge
          color="gray"
          variant="soft"
          className="caption-md flex items-center text-semantic-object-normal"
          key={tag}
        >
          {PLACE_TAG_LABELS[tag]}
        </Badge>
      ))}
      {hasHiddenTags && (
        <div className="relative">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={hiddenTagsId}
            aria-label={
              isExpanded
                ? '숨겨진 태그 접기'
                : `숨겨진 태그 ${hiddenTags.length}개 보기`
            }
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <Badge
              color="gray"
              variant="outline"
              className="caption-md flex cursor-pointer items-center text-semantic-object-normal"
            >
              {`+${hiddenTags.length}`}
            </Badge>
          </button>
          {isExpanded && (
            <div
              id={hiddenTagsId}
              className={cn(
                'absolute z-10 min-w-max rounded-lg border border-semantic-stroke-subtle bg-semantic-system-white p-2',
                POPOVER_SIDE_CLASS[popoverSide],
              )}
            >
              <div className="flex flex-col gap-2">
                {hiddenTags.map((tag) => (
                  <Badge
                    color="gray"
                    variant="soft"
                    className="caption-md flex items-center text-semantic-object-normal"
                    key={tag}
                  >
                    {PLACE_TAG_LABELS[tag]}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
