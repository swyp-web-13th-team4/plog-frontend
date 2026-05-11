const interactive =
  'cursor-pointer hover:bg-semantic-bg-deep active:bg-semantic-object-subtler';

export function getDatePickerCellStateClass(
  isDisabled: boolean,
  isSelected: boolean,
  isToday: boolean,
  isCurrentMonth: boolean,
): string {
  if (isDisabled) return 'cursor-not-allowed text-semantic-object-subtler';
  if (isSelected)
    return 'cursor-pointer bg-semantic-accent-normal text-semantic-object-inverse';
  if (isToday) return `${interactive} text-semantic-accent-normal`;
  if (isCurrentMonth) return `${interactive} text-semantic-object-boldest`;
  return `${interactive} text-semantic-object-subtle`;
}
