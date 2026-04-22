import { useEffect, useRef } from 'react';

import { cn } from '@plog/utils';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const SLIDE_HEIGHT = 40;
const VISIBLE_COUNT = 3;

type TimePickerColumnProps = {
  items: readonly string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  loop?: boolean;
  'aria-label'?: string;
};

function TimePickerColumn({
  items,
  selectedIndex,
  onChange,
  loop = true,
  'aria-label': ariaLabel,
}: TimePickerColumnProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current;
    if (swiper.realIndex !== selectedIndex) {
      if (loop) {
        swiper.slideToLoop(selectedIndex, 0, false);
      } else {
        swiper.slideTo(selectedIndex, 0, false);
      }
    }
  }, [selectedIndex, loop]);

  return (
    <div
      role="listbox"
      aria-label={ariaLabel}
      className="relative overflow-hidden"
      style={{ height: SLIDE_HEIGHT * VISIBLE_COUNT }}
    >
      <Swiper
        direction="vertical"
        modules={[FreeMode]}
        loop={loop}
        slidesPerView={VISIBLE_COUNT}
        centeredSlides
        slideToClickedSlide
        initialSlide={selectedIndex}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => onChange(swiper.realIndex)}
        className="h-full"
      >
        {items.map((item) => (
          <SwiperSlide
            key={item}
            className="flex w-14 cursor-pointer items-center justify-center select-none"
          >
            {({ isActive }) => (
              <span
                role="option"
                aria-selected={isActive}
                className={cn(
                  'body-lg',
                  isActive
                    ? 'text-semantic-object-boldest'
                    : 'text-semantic-object-subtle',
                )}
              >
                {item}
              </span>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TimePickerColumn;
