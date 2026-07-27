'use client';

import {
  type KeyboardEvent,
  type Ref,
  type RefCallback,
  useCallback,
  useRef,
} from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Field } from '@plog/ui';

import { type FocusLevel } from '@/features/create-log';

import FocusLevelDefault1 from '@/shared/assets/focus-levels/focus-level-default-1.svg';
import FocusLevelDefault2 from '@/shared/assets/focus-levels/focus-level-default-2.svg';
import FocusLevelDefault3 from '@/shared/assets/focus-levels/focus-level-default-3.svg';
import FocusLevelDefault4 from '@/shared/assets/focus-levels/focus-level-default-4.svg';
import FocusLevelDefault5 from '@/shared/assets/focus-levels/focus-level-default-5.svg';
import FocusLevelSelect1 from '@/shared/assets/focus-levels/focus-level-select-1.svg';
import FocusLevelSelect2 from '@/shared/assets/focus-levels/focus-level-select-2.svg';
import FocusLevelSelect3 from '@/shared/assets/focus-levels/focus-level-select-3.svg';
import FocusLevelSelect4 from '@/shared/assets/focus-levels/focus-level-select-4.svg';
import FocusLevelSelect5 from '@/shared/assets/focus-levels/focus-level-select-5.svg';

import { CreateLogFormValues } from '../model/types';

const FOCUS_LEVEL_OPTIONS = [
  {
    value: 1,
    label: '매우 낮음',
    DefaultIcon: FocusLevelDefault1,
    SelectedIcon: FocusLevelSelect1,
  },
  {
    value: 2,
    label: '낮음',
    DefaultIcon: FocusLevelDefault2,
    SelectedIcon: FocusLevelSelect2,
  },
  {
    value: 3,
    label: '보통',
    DefaultIcon: FocusLevelDefault3,
    SelectedIcon: FocusLevelSelect3,
  },
  {
    value: 4,
    label: '높음',
    DefaultIcon: FocusLevelDefault4,
    SelectedIcon: FocusLevelSelect4,
  },
  {
    value: 5,
    label: '매우 높음',
    DefaultIcon: FocusLevelDefault5,
    SelectedIcon: FocusLevelSelect5,
  },
] as const;

type RatingPickerProps = {
  value: FocusLevel | null;
  onChange: (score: FocusLevel) => void;
  firstButtonRef?: Ref<HTMLButtonElement>;
};

function assignRef<TElement>(
  ref: Ref<TElement> | undefined,
  value: TElement | null,
) {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    ref.current = value;
  }
}

function RatingPicker({ value, onChange, firstButtonRef }: RatingPickerProps) {
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const count = FOCUS_LEVEL_OPTIONS.length;
    const currentIndex = value !== null ? value - 1 : -1;

    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % count;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex =
        currentIndex === -1 ? count - 1 : (currentIndex - 1 + count) % count;
    }

    if (nextIndex !== null) {
      onChange(FOCUS_LEVEL_OPTIONS[nextIndex].value);
      radioRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="집중도"
      className="grid w-full grid-cols-5 gap-2"
      onKeyDown={handleKeyDown}
    >
      {FOCUS_LEVEL_OPTIONS.map(
        ({ value: score, label, DefaultIcon, SelectedIcon }, index) => {
          const isSelected = value === score;
          const RatingIcon = isSelected ? SelectedIcon : DefaultIcon;

          return (
            <button
              key={score}
              ref={(el) => {
                radioRefs.current[index] = el;
                if (index === 0) {
                  assignRef(firstButtonRef, el);
                }
              }}
              type="button"
              role="radio"
              aria-label={`집중도 ${score}점, ${label}`}
              aria-checked={isSelected}
              tabIndex={isSelected || (value === null && index === 0) ? 0 : -1}
              className="relative flex aspect-square cursor-pointer items-center justify-center"
              onClick={() => onChange(score)}
            >
              <RatingIcon
                aria-hidden="true"
                className="block size-full scale-140"
              />
            </button>
          );
        },
      )}
    </div>
  );
}

type LogSelectFocusFieldProps = {
  fieldRef: RefCallback<HTMLDivElement>;
  buttonRef: RefCallback<HTMLButtonElement>;
};

export default function LogSelectFocusField({
  fieldRef,
  buttonRef,
}: LogSelectFocusFieldProps) {
  const { control } = useFormContext<CreateLogFormValues>();
  const { field } = useController({
    control,
    name: 'focus',
  });
  const { ref: rhfRef } = field;
  const setButtonRef = useCallback(
    (element: HTMLButtonElement | null) => {
      rhfRef(element);
      buttonRef(element);
    },
    [rhfRef, buttonRef],
  );

  return (
    <div ref={fieldRef} className="flex flex-col gap-4">
      <Field label="집중도를 평가해 주세요" required>
        <RatingPicker
          value={field.value}
          firstButtonRef={setButtonRef}
          onChange={field.onChange}
        />
      </Field>
    </div>
  );
}
