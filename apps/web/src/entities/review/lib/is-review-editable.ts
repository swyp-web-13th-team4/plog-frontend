const REVIEW_EDITABLE_PERIOD_MS = 30 * 24 * 60 * 60 * 1000;

export function isReviewEditable(createdAt: string) {
  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) {
    return false;
  }

  return Date.now() < createdTime + REVIEW_EDITABLE_PERIOD_MS;
}
