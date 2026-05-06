export function formatTimeAgo(time: Date | string | number) {
  const start = new Date(time);
  if (Number.isNaN(start.getTime())) return '';
  const end = new Date();

  const secondDiff = Math.max(
    0,
    Math.floor((end.getTime() - start.getTime()) / 1000),
  );

  if (secondDiff < 60) return '방금 전';

  const minuteDiff = Math.floor(secondDiff / 60);
  if (minuteDiff < 60) return `${minuteDiff}분 전`;

  const hourDiff = Math.floor(minuteDiff / 60);
  if (hourDiff < 24) return `${hourDiff}시간 전`;

  const dayDiff = Math.floor(hourDiff / 24);
  if (dayDiff < 7) return `${dayDiff}일 전`;

  const weekDiff = Math.floor(dayDiff / 7);
  if (dayDiff < 30) return `${weekDiff}주 전`;

  const monthDiff = Math.floor(dayDiff / 30);
  if (dayDiff < 365) return `${monthDiff}달 전`;

  const yearDiff = Math.floor(dayDiff / 365);
  return `${yearDiff}년 전`;
}

export function formatStudyDate(time: Date | string | number) {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return null;

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatStudyDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;
  return `${hours}시간${minutes}분`;
}

export function formatStudyDurationShort(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function formatLikeCount(count: number): string {
  if (count < 10_000) return String(count.toLocaleString());
  if (count < 1_000_000) {
    const val = (count / 1_000).toFixed(1).replace(/\.0$/, '');
    return `${val}K`;
  }
  const val = (count / 1_000_000).toFixed(1).replace(/\.0$/, '');
  return `${val}M`;
}
