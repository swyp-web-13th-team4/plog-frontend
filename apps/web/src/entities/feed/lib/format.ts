export function formatLikeCount(count: number): string {
  if (count < 10_000) return String(count.toLocaleString());
  if (count < 1_000_000) {
    const val = (count / 1_000).toFixed(1).replace(/\.0$/, '');
    return `${val}K`;
  }
  const val = (count / 1_000_000).toFixed(1).replace(/\.0$/, '');
  return `${val}M`;
}
