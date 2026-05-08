export function formatRecentPlaceDate(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return dateValue;

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}.${day}`;
}
