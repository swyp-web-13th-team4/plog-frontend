import { type Ref, useMemo } from 'react';

import { Icon } from '@plog/ui';

type RatingSelectorProps = {
  value: number;
  onChange: (value: number) => void;
  focusFirstButton?: Ref<HTMLButtonElement>;
};

export default function RatingSelector({
  value,
  onChange,
  focusFirstButton,
}: RatingSelectorProps) {
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

  return (
    <div
      role="radiogroup"
      aria-label="장소 경험 별점"
      className="flex items-center justify-center gap-3"
    >
      {stars.map((score) => {
        const selected = score <= value;

        return (
          <button
            key={score}
            ref={score === stars[0] ? focusFirstButton : undefined}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={`${score}점`}
            className="flex size-10 cursor-pointer items-center justify-center rounded-lg transition-transform outline-none hover:scale-105 focus-visible:outline-2 focus-visible:outline-semantic-accent-subtle"
            onClick={() => onChange(score)}
          >
            <Icon
              name="star-filled"
              size={40}
              className={
                selected
                  ? 'text-semantic-theme-amber-normal'
                  : 'text-semantic-object-subtler'
              }
            />
          </button>
        );
      })}
    </div>
  );
}
