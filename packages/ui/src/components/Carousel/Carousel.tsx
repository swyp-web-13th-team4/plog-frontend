import 'swiper/css';
import 'swiper/css/pagination';

import { Children, type ReactNode } from 'react';

import { cn } from '@plog/utils';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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
  const isSingle = Children.count(children) <= 1;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'relative w-full',
        '[--swiper-pagination-bottom:12px] [--swiper-pagination-bullet-horizontal-gap:6px] [--swiper-pagination-color:white]',
        '[--swiper-pagination-bullet-inactive-color:white] [--swiper-pagination-bullet-inactive-opacity:0.6]',
        '[&_.swiper-pagination-bullet]:!size-1.5 [&_.swiper-pagination-bullet]:align-middle [&_.swiper-pagination-bullet-active]:!size-2',
        !isSingle && 'cursor-grab active:cursor-grabbing',
        className,
      )}
    >
      <Swiper
        modules={[Pagination]}
        pagination={isSingle ? false : { clickable: false }}
        allowTouchMove={!isSingle}
        loop={loop}
        initialSlide={initialSlide}
        onSlideChange={(swiper) => onChange?.(swiper.realIndex)}
        className="w-full"
      >
        {children}
      </Swiper>
    </div>
  );
}

function Slide({ children, className }: CarouselSlideProps) {
  return (
    <SwiperSlide
      role="group"
      aria-roledescription="slide"
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
