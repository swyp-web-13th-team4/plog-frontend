import { type DateValue, type TimeValue } from '@plog/ui';

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const HAS_TIMEZONE = /(Z|[+-]\d{2}:?\d{2})$/;

export type DateInput = string | number | Date | DateValue;

function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function parseServerTime(value: string | number | Date) {
  if (typeof value !== 'string' || HAS_TIMEZONE.test(value)) {
    return new Date(value);
  }

  const separated = value.includes('T') ? value : value.replace(' ', 'T');
  const withTime = separated.includes('T')
    ? separated
    : `${separated}T00:00:00`;
  const normalized = withTime.replace(/(\.\d{3})\d+/, '$1');

  return new Date(`${normalized}+09:00`);
}

function toDateValue(input: DateInput): DateValue | null {
  if (typeof input === 'object' && !(input instanceof Date)) return input;

  const parsed = parseServerTime(input);
  if (Number.isNaN(parsed.getTime())) return null;

  const kst = new Date(parsed.getTime() + KST_OFFSET_MS);

  return {
    year: kst.getUTCFullYear(),
    month: kst.getUTCMonth() + 1,
    date: kst.getUTCDate(),
  };
}

export function serializeDate({ year, month, date }: DateValue) {
  return `${year}-${pad(month)}-${pad(date)}`;
}

export function parseDate(value: string): DateValue | null {
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

type DatePreset = 'dot' | 'ko';
type DateFormatOptions = { year?: boolean };

export function formatDate(
  input: DateValue,
  preset: DatePreset,
  options?: DateFormatOptions,
): string;
export function formatDate(
  input: string | number | Date,
  preset: DatePreset,
  options?: DateFormatOptions,
): string | null;
export function formatDate(
  input: DateInput,
  preset: DatePreset,
  options?: DateFormatOptions,
) {
  const value = toDateValue(input);
  if (!value) return null;

  const withYear = options?.year ?? true;

  if (preset === 'dot') {
    const md = `${pad(value.month)}.${pad(value.date)}`;
    return withYear ? `${value.year}.${md}` : md;
  }

  const md = `${value.month}월 ${value.date}일`;
  return withYear ? `${value.year}년 ${md}` : md;
}

type TimePreset = '24h' | 'ko';

export function formatTime({ hour, minute }: TimeValue, preset: TimePreset) {
  if (preset === '24h') return `${pad(hour)}:${pad(minute)}`;

  const meridiem = hour < 12 ? '오전' : '오후';

  return `${meridiem} ${pad(hour % 12 || 12)}:${pad(minute)}`;
}

export function formatShortDateTime(input: string | number | Date) {
  const parsed = parseServerTime(input);
  if (Number.isNaN(parsed.getTime())) return null;

  const kst = new Date(parsed.getTime() + KST_OFFSET_MS);
  const year = String(kst.getUTCFullYear()).slice(-2);
  const month = pad(kst.getUTCMonth() + 1);
  const date = pad(kst.getUTCDate());
  const hour = pad(kst.getUTCHours());
  const minute = pad(kst.getUTCMinutes());

  return `${year}.${month}.${date} ${hour}:${minute}`;
}

export function formatTimeAgo(time: Date | string | number) {
  const start = parseServerTime(time);
  if (Number.isNaN(start.getTime())) return '';

  const secondDiff = Math.max(
    0,
    Math.floor((Date.now() - start.getTime()) / 1000),
  );

  if (secondDiff < 60) return '방금 전';

  const minuteDiff = Math.floor(secondDiff / 60);
  if (minuteDiff < 60) return `${minuteDiff}분 전`;

  const hourDiff = Math.floor(minuteDiff / 60);
  if (hourDiff < 24) return `${hourDiff}시간 전`;

  const dayDiff = Math.floor(hourDiff / 24);
  if (dayDiff < 7) return `${dayDiff}일 전`;

  if (dayDiff < 30) return `${Math.floor(dayDiff / 7)}주 전`;
  if (dayDiff < 365) return `${Math.floor(dayDiff / 30)}달 전`;

  return `${Math.floor(dayDiff / 365)}년 전`;
}

type DurationPreset = 'ko' | 'en';

export function formatDuration(totalMinutes: number, preset: DurationPreset) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const [hourUnit, minuteUnit] = preset === 'ko' ? ['시간', '분'] : ['h', 'm'];

  if (hours === 0) return `${minutes}${minuteUnit}`;
  if (minutes === 0) return `${hours}${hourUnit}`;

  return `${hours}${hourUnit} ${minutes}${minuteUnit}`;
}
