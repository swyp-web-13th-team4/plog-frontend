'use client';

import { useState } from 'react';

import { Carousel, Dialog, Icon } from '@plog/ui';

import { ImageWithFallback } from '@/shared/ui';

type ImagesModalProps = {
  open: boolean;
  images: string[];
  initialIndex: number;
  onOpenChange: (open: boolean) => void;
};

export default function ImagesModal({
  open,
  images,
  initialIndex,
  onOpenChange,
}: ImagesModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="h-dvh w-full max-w-layout gap-0 rounded-none bg-semantic-system-black p-0 text-semantic-object-inverse">
        <Dialog.Title className="sr-only">리뷰 이미지 전체 보기</Dialog.Title>
        <button
          type="button"
          aria-label="닫기"
          onClick={() => onOpenChange(false)}
          className="absolute top-5 left-5 z-10 flex size-10 cursor-pointer items-center justify-center text-semantic-object-inverse"
        >
          <Icon name="close" size={28} />
        </button>
        <div className="title-sm absolute top-7.5 left-1/2 z-10 -translate-x-1/2 text-semantic-object-subtle">
          {currentIndex + 1} / {images.length}
        </div>

        <Carousel
          aria-label="리뷰 이미지"
          initialSlide={initialIndex}
          onChange={setCurrentIndex}
          className="flex h-full items-center"
        >
          {images.map((image, index) => (
            <Carousel.Slide
              key={`${image}-${index}`}
              className="flex items-center"
            >
              <ImageWithFallback
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                fill
                className="object-cover"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Dialog.Content>
    </Dialog>
  );
}
