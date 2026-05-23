import { type DateValue } from '@plog/ui';

function padDatePart(value: number) {
  return String(value).padStart(2, '0');
}

export function formatStudyDate({ year, month, date }: DateValue) {
  return `${year}-${padDatePart(month)}-${padDatePart(date)}`;
}

export function parseStudyDate(value: string): DateValue {
  const parts = value.split('-');
  if (parts.length !== 3) return { year: 0, month: 0, date: 0 };

  const [year, month, date] = parts.map((part) => Number(part));
  const isValid =
    Number.isInteger(year) &&
    Number.isInteger(month) &&
    Number.isInteger(date) &&
    month >= 1 &&
    month <= 12 &&
    date >= 1 &&
    date <= 31;

  return isValid ? { year, month, date } : { year: 0, month: 0, date: 0 };
  return { year, month, date };
}
