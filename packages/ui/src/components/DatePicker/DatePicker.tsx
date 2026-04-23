import { type KeyboardEvent, useMemo, useState } from 'react';

import { cn } from '@plog/utils';

import NextIcon from '@/assets/next.svg?react';
import PrevIcon from '@/assets/prev.svg?react';
import { IconButton } from '@/components/IconButton';

import type { DateValue } from './DatePicker.types';
import DatePickerCell from './DatePickerCell';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dateToValue(date: Date): DateValue {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
}

function valueToDate(value: DateValue): Date {
  return new Date(value.year, value.month - 1, value.date);
}

function shiftDate(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}

function shiftMonth(date: Date, months: number): Date {
  const next = new Date(date);
  next.setMonth(date.getMonth() + months);
  return next;
}

function getNextFocusDate(key: string, base: Date): Date | undefined {
  switch (key) {
    case 'ArrowRight':
      return shiftDate(base, 1);
    case 'ArrowLeft':
      return shiftDate(base, -1);
    case 'ArrowDown':
      return shiftDate(base, 7);
    case 'ArrowUp':
      return shiftDate(base, -7);
    case 'Home':
      return shiftDate(base, -base.getDay());
    case 'End':
      return shiftDate(base, 6 - base.getDay());
    case 'PageUp':
      return shiftMonth(base, -1);
    case 'PageDown':
      return shiftMonth(base, 1);
  }
}

type DatePickerProps = {
  defaultValue?: DateValue;
  value?: DateValue;
  onChange?: (value: DateValue) => void;
};

function DatePicker({ defaultValue, value, onChange }: DatePickerProps) {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<DateValue | undefined>(
    defaultValue,
  );
  const [currentDate, setCurrentDate] = useState(() => {
    const seed = value ?? defaultValue;
    return seed ? valueToDate(seed) : new Date();
  });
  const [focusedDate, setFocusedDate] = useState<Date | undefined>(undefined);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const current = isControlled ? value : internalValue;
  const selectedDate = current ? valueToDate(current) : undefined;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  const activeFocusDate = focusedDate ?? selectedDate ?? today;

  const firstDay = new Date(year, month, 1);
  const start = new Date(firstDay);
  start.setDate(1 - firstDay.getDay());

  const lastDay = new Date(year, month + 1, 0);
  const end = new Date(lastDay);
  end.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  const dates: Date[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  const weeks: Date[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  const handleSelect = (date: Date) => {
    if (date.getMonth() !== month) {
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    }
    const next = dateToValue(date);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handlePrevMonth = () => {
    setFocusedDate(undefined);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setFocusedDate(undefined);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (activeFocusDate <= today) handleSelect(activeFocusDate);
      return;
    }

    const next = getNextFocusDate(e.key, activeFocusDate);
    if (!next) return;

    e.preventDefault();
    if (next > today) return;

    setFocusedDate(next);
    if (next.getMonth() !== month || next.getFullYear() !== year) {
      setCurrentDate(new Date(next.getFullYear(), next.getMonth(), 1));
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-70 items-center justify-between">
        <IconButton
          icon={<PrevIcon />}
          aria-label="이전 월"
          onClick={handlePrevMonth}
        />
        <span
          aria-live="polite"
          className="label-lg text-semantic-object-boldest"
        >
          {year}년 {month + 1}월
        </span>
        <IconButton
          icon={<NextIcon />}
          aria-label="다음 월"
          onClick={handleNextMonth}
          disabled={isCurrentMonth}
        />
      </div>
      <div
        role="grid"
        aria-label={`${year}년 ${month + 1}월`}
        onKeyDown={handleKeyDown}
      >
        <div role="row" className="grid grid-cols-7">
          {DAY_LABELS.map((day) => (
            <div
              key={day}
              role="columnheader"
              aria-label={day}
              className={cn(
                'body-sm flex size-10 items-center justify-center text-semantic-object-subtle',
              )}
            >
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, i) => (
          <div key={i} role="row" className="grid grid-cols-7">
            {week.map((date) => (
              <div key={date.toISOString()} role="gridcell">
                <DatePickerCell
                  date={date}
                  isCurrentMonth={date.getMonth() === month}
                  isSelected={
                    selectedDate !== undefined && isSameDate(date, selectedDate)
                  }
                  isDisabled={date > today}
                  isToday={isSameDate(date, today)}
                  isTabTarget={isSameDate(date, activeFocusDate)}
                  isFocused={
                    focusedDate !== undefined && isSameDate(date, focusedDate)
                  }
                  onClick={() => handleSelect(date)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatePicker;
