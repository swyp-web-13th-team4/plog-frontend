import { type FeedResponse } from '../model/schemas';
import { type FeedMainPage } from '../model/types';

export type FeedCursor = {
  lastPostId: number | null;
};

export const FEED_INITIAL_CURSOR: FeedCursor = { lastPostId: 0 };

export function toFeedMainPage(data: FeedResponse): FeedMainPage {
  return {
    items: data.feedFindResponses,
    lastPostId: data.lastPostId,
    createAt: data.createdAt,
  };
}

export function buildFeedListPath(lastPostId: number | null) {
  const params = new URLSearchParams();
  if (lastPostId !== null) {
    params.set('lastPostId', String(lastPostId));
  }

  const query = params.toString();
  return `/feed/list${query ? `?${query}` : ''}`;
}

export function getFeedNextCursor(
  lastPage: FeedMainPage,
  lastCursor: FeedCursor,
): FeedCursor | undefined {
  if (lastPage.items.length === 0) return undefined;
  if (lastPage.lastPostId === null) return undefined;
  if (lastPage.lastPostId === lastCursor.lastPostId) return undefined;

  return { lastPostId: lastPage.lastPostId };
}
