import { type ComponentPropsWithoutRef } from 'react';

import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { cn } from '@plog/utils';

import Spinner from './Spinner';

type AvatarSize = 'lg' | 'md' | 'sm' | 'xs';

const sizeClass: Record<AvatarSize, string> = {
  lg: 'size-38',
  md: 'size-24',
  sm: 'size-20',
  xs: 'size-12',
};

const defaultOutlineClass: Record<AvatarSize, string> = {
  lg: 'outline-2 outline-semantic-stroke-neutral/30',
  md: 'outline outline-semantic-stroke-neutral/30',
  sm: 'outline outline-semantic-stroke-neutral/30',
  xs: 'outline outline-semantic-stroke-neutral/30',
};

const selectedOutlineClass: Record<AvatarSize, string> = {
  lg: 'outline-4 outline-semantic-accent-normal',
  md: 'outline-3 outline-semantic-accent-normal',
  sm: 'outline-2 outline-semantic-accent-normal',
  xs: 'outline-2 outline-semantic-accent-normal',
};

type AvatarProps = {
  size: AvatarSize;
  src?: string;
  alt: string;
  fallbackSrc?: string;
  selected?: boolean;
  loading?: boolean;
  className?: string;
} & Omit<
  ComponentPropsWithoutRef<typeof BaseAvatar.Root>,
  'className' | 'render' | 'children'
>;

export default function Avatar({
  size,
  src,
  alt,
  fallbackSrc,
  selected = false,
  loading = false,
  className,
  ...props
}: AvatarProps) {
  const spinnerSize = size === 'xs' ? 'small' : 'large';

  return (
    <span className={cn('relative inline-flex shrink-0', sizeClass[size])}>
      <BaseAvatar.Root
        className={cn(
          'inline-flex size-full items-center justify-center overflow-hidden rounded-full bg-semantic-bg-deeper',
          selected ? selectedOutlineClass[size] : defaultOutlineClass[size],
          className,
        )}
        {...props}
      >
        <BaseAvatar.Image
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
        <BaseAvatar.Fallback className="size-full bg-semantic-bg-deep">
          {fallbackSrc && (
            <img
              src={fallbackSrc}
              alt={alt}
              className="size-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </BaseAvatar.Fallback>

        {loading && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-semantic-system-black/40">
            <Spinner size={spinnerSize} color="white" />
          </span>
        )}
      </BaseAvatar.Root>
    </span>
  );
}
