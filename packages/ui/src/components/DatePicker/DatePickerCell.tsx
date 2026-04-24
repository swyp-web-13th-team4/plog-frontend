import { type ComponentRef, useEffect, useRef } from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '@plog/utils';

import { getDatePickerCellStateClass } from './getDatePickerCellStateClass';

type DatePickerCellProps = {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isToday: boolean;
  isTabTarget: boolean;
  isFocused: boolean;
  onClick: () => void;
};

function DatePickerCell({
  date,
  isCurrentMonth,
  isSelected,
  isDisabled,
  isToday,
  isTabTarget,
  isFocused,
  onClick,
}: DatePickerCellProps) {
  const ref = useRef<ComponentRef<typeof BaseButton>>(null);

  useEffect(() => {
    if (isFocused) ref.current?.focus();
  }, [isFocused]);

  return (
    <BaseButton
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      tabIndex={isTabTarget ? 0 : -1}
      aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일${isToday ? ', 오늘' : ''}`}
      className={cn(
        'body-lg flex size-10 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-accent-subtle',
        getDatePickerCellStateClass(
          isDisabled,
          isSelected,
          isToday,
          isCurrentMonth,
        ),
      )}
    >
      {date.getDate()}
    </BaseButton>
  );
}

export default DatePickerCell;
