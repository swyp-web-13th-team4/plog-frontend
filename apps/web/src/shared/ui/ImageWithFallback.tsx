'use client';

import { useState } from 'react';

import Image, { type ImageProps } from 'next/image';

import { cn } from '@plog/utils';

type ImageWithFallbackProps = Omit<ImageProps, 'onError'>;

export default function ImageWithFallback({
  src,
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [errorUrl, setErrorUrl] = useState<ImageProps['src'] | null>(null);
  const imageError = errorUrl === src;

  if (imageError) {
    return <div className={cn('bg-semantic-object-subtler', className)} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrorUrl(src)}
      {...props}
    />
  );
}
