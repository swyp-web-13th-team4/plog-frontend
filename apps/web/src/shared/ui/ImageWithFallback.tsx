'use client';

import { useState } from 'react';

import Image, { type ImageProps } from 'next/image';

import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

type ImageWithFallbackProps = Omit<ImageProps, 'onError'> & {
  fallbackIconSize?: number;
};

export default function ImageWithFallback({
  src,
  alt,
  fill,
  className,
  fallbackIconSize = 40,
  ...props
}: ImageWithFallbackProps) {
  const [errorUrl, setErrorUrl] = useState<ImageProps['src'] | null>(null);
  const imageError = errorUrl === src;

  if (imageError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-semantic-object-subtler',
          fill && 'absolute inset-0',
          className,
        )}
      >
        <Icon
          name="image-banned"
          size={fallbackIconSize}
          className="text-semantic-object-subtle"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setErrorUrl(src)}
      {...props}
    />
  );
}
