import { cn } from '@plog/utils';

import { iconMap, type IconName } from './iconMap';

const BASE_SIZE = 24;

type IconProps = {
  name: IconName;
  size?: number;
  boxed?: boolean;
  className?: string;
};

export default function Icon({
  name,
  size,
  boxed = true,
  className,
}: IconProps) {
  const { Component, width: rawWidth, height: rawHeight } = iconMap[name];

  if (!boxed) {
    return (
      <Component
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
      />
    );
  }

  const containerSize = size ?? BASE_SIZE;
  const scale = size !== undefined ? size / BASE_SIZE : 1;
  const iconWidth = rawWidth * scale;
  const iconHeight = rawHeight * scale;

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        className,
      )}
      style={{ width: containerSize, height: containerSize }}
    >
      <Component width={iconWidth} height={iconHeight} />
    </span>
  );
}
