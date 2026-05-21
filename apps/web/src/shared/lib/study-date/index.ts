import { type DateValue } from '@plog/ui';

function padDatePart(value: number) {
  return String(value).padStart(2, '0');
}

export function formatStudyDate({ year, month, date }: DateValue) {
  return `${year}-${padDatePart(month)}-${padDatePart(date)}`;
}

export function parseStudyDate(value: string): DateValue {
  const [year = 0, month = 0, date = 0] = value
    .split('-')
    .map((part) => Number(part));

  return { year, month, date };
}
