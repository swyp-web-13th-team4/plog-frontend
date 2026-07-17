import { type DateValue } from '@plog/ui';

function padDatePart(value: number) {
  return String(value).padStart(2, '0');
}

export function formatStudyDate({ year, month, date }: DateValue) {
  return `${year}-${padDatePart(month)}-${padDatePart(date)}`;
}

export function parseStudyDate(value: string): DateValue | null {
  const parts = value.split('-');
  if (parts.length !== 3) return null;

  const [year, month, date] = parts.map((part) => Number(part));
  const isValid =
    Number.isInteger(year) &&
    Number.isInteger(month) &&
    Number.isInteger(date) &&
    month >= 1 &&
    month <= 12 &&
    date >= 1 &&
    date <= 31;

  if (!isValid) return null;

  const parsed = new Date(year, month - 1, date);
  const isCalendarDate =
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === date;

  return isCalendarDate ? { year, month, date } : null;
}
