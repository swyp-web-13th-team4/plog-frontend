import { type ComponentPropsWithoutRef } from 'react';

import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { cn } from '@plog/utils';

import { Spinner } from '@/components/Spinner';

import { type AvatarSize } from './Avatar.types';

const sizeClass: Record<AvatarSize, string> = {
  large: 'size-38',
  medium: 'size-24',
  small: 'size-20',
  xsmall: 'size-12',
};

const defaultOutlineClass: Record<AvatarSize, string> = {
  large: 'outline-2 outline-semantic-stroke-neutral/30',
  medium: 'outline outline-semantic-stroke-neutral/30',
  small: 'outline outline-semantic-stroke-neutral/30',
  xsmall: 'outline outline-semantic-stroke-neutral/30',
};

const selectedOutlineClass: Record<AvatarSize, string> = {
  large: 'outline-4 outline-semantic-accent-normal',
  medium: 'outline-3 outline-semantic-accent-normal',
  small: 'outline-2 outline-semantic-accent-normal',
  xsmall: 'outline-2 outline-semantic-accent-normal',
};

type AvatarProps = {
  size: AvatarSize;
  src?: string;
  alt: string;
  fallbackSrc?: string;
  selected?: boolean;
  loading?: boolean;
  className?: string;
  containerClassName?: string;
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
  containerClassName,
  ...props
}: AvatarProps) {
  const spinnerSize = size === 'xsmall' ? 'small' : 'large';

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0',
        sizeClass[size],
        containerClassName,
      )}
    >
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
          <span
            role="status"
            className="absolute inset-0 flex items-center justify-center rounded-full bg-semantic-system-black/40"
          >
            <Spinner size={spinnerSize} color="white" />
          </span>
        )}
      </BaseAvatar.Root>
    </span>
  );
}
