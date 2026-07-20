import { formatDate } from '@/shared/lib/datetime';

export function formatRecentPlaceDate(dateValue: string) {
  return formatDate(dateValue, 'dot', { year: false }) ?? dateValue;
}
