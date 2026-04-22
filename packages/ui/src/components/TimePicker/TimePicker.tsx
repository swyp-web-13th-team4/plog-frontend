import { useState } from 'react';

import type { TimeValue } from './TimePicker.types';
import TimePickerColumn from './TimePickerColumn';

type TimePickerProps = {
  defaultValue?: TimeValue;
  value?: TimeValue;
  onChange?: (value: TimeValue) => void;
} & (
  | { 'aria-label'?: string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby'?: string }
);

const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, '0'),
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0'),
);

function hourToIndex(hour24: number): number {
  const h12 = hour24 % 12;
  return h12 === 0 ? 11 : h12 - 1;
}

function indexToHour(hourIndex: number, meridiemIndex: number): number {
  const h12 = hourIndex + 1;
  if (meridiemIndex === 0) return h12 === 12 ? 0 : h12;
  return h12 === 12 ? 12 : h12 + 12;
}

function TimePicker({
  defaultValue,
  value,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: TimePickerProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<TimeValue>(
    defaultValue ?? { hour: 0, minute: 0 },
  );

  const current = isControlled ? value : internalValue;

  const update = (partial: Partial<TimeValue>) => {
    const next = { ...current, ...partial };
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const meridiemIndex = current.hour < 12 ? 0 : 1;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className="relative inline-flex items-center justify-center gap-6"
    >
      <div
        aria-hidden="true"
        className="absolute h-10 w-66 rounded-lg bg-semantic-feedback-success-subtle"
      />
      <TimePickerColumn
        aria-label="오전/오후"
        items={['오전', '오후'] as const}
        selectedIndex={meridiemIndex}
        onChange={(i) =>
          update({ hour: indexToHour(hourToIndex(current.hour), i) })
        }
        loop={false}
      />
      <TimePickerColumn
        aria-label="시"
        items={HOURS}
        selectedIndex={hourToIndex(current.hour)}
        onChange={(i) => update({ hour: indexToHour(i, meridiemIndex) })}
      />
      <TimePickerColumn
        aria-label="분"
        items={MINUTES}
        selectedIndex={current.minute}
        onChange={(i) => update({ minute: i })}
      />
    </div>
  );
}

export default TimePicker;
