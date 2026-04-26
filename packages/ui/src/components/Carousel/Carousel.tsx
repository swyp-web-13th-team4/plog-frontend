import 'swiper/css';
import 'swiper/css/pagination';

import { Children, type ReactNode, useRef } from 'react';

import { cn } from '@plog/utils';
import { A11y, Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

type CarouselProps = {
  loop?: boolean;
  initialSlide?: number;
  onChange?: (index: number) => void;
  className?: string;
  children: ReactNode;
} & (
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }
);

type CarouselSlideProps = {
  children: ReactNode;
  className?: string;
};

function CarouselRoot({
  loop = false,
  initialSlide = 0,
  onChange,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: CarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const isSingle = Children.count(children) <= 1;

  return (
    <div
      className={cn(
        'relative w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-accent-alternative',
        '[--swiper-pagination-bottom:12px] [--swiper-pagination-bullet-horizontal-gap:6px] [--swiper-pagination-color:white]',
        '[--swiper-pagination-bullet-inactive-color:white] [--swiper-pagination-bullet-inactive-opacity:0.6]',
        '[&_.swiper-pagination-bullet]:!size-1.5 [&_.swiper-pagination-bullet]:align-middle [&_.swiper-pagination-bullet-active]:!size-2',
        !isSingle && 'cursor-grab active:cursor-grabbing',
        className,
      )}
      aria-controls="carousel-swiper"
      tabIndex={0}
      onFocus={() => {
        swiperRef.current?.keyboard.enable();
      }}
      onBlur={() => {
        swiperRef.current?.keyboard.disable();
      }}
    >
      <Swiper
        className="w-full"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        modules={[A11y, Keyboard, Pagination]}
        a11y={{
          enabled: true,
          containerRole: 'region',
          containerRoleDescriptionMessage: 'carousel',
          itemRoleDescriptionMessage: 'slide',
          slideLabelMessage: '슬라이드 {{index}} / {{slidesLength}}',
        }}
        keyboard={{ enabled: false }}
        pagination={isSingle ? false : { clickable: false }}
        allowTouchMove={!isSingle}
        loop={loop}
        initialSlide={initialSlide}
        onSlideChange={(swiper) => onChange?.(swiper.realIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {children}
      </Swiper>
    </div>
  );
}

function Slide({ children, className }: CarouselSlideProps) {
  return (
    <SwiperSlide
      className={cn(
        'relative aspect-square [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:drag-none',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_72.08%,rgba(0,0,0,0.5)_100%)]" />
      {children}
    </SwiperSlide>
  );
}
Slide.displayName = 'SwiperSlide';

const Carousel = Object.assign(CarouselRoot, { Slide });

export default Carousel;
