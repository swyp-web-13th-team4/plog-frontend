import { Button as BaseButton } from '@base-ui/react/button';

import { getDatePickerCellStateClass } from './getDatePickerCellStateClass';

type DatePickerCellProps = {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isToday: boolean;
  onClick: () => void;
};

function DatePickerCell({
  date,
  isCurrentMonth,
  isSelected,
  isDisabled,
  isToday,
  onClick,
}: DatePickerCellProps) {
  return (
    <BaseButton
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-selected={isSelected}
      aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일${isToday ? ', 오늘' : ''}`}
      className={getDatePickerCellStateClass(
        isDisabled,
        isSelected,
        isToday,
        isCurrentMonth,
      )}
    >
      {date.getDate()}
    </BaseButton>
  );
}

export default DatePickerCell;
