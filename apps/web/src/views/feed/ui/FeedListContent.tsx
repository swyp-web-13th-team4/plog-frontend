import { getFeedList } from '@/entities/feed/api/server';

import FeedPage from './FeedPage';

async function fetchInitialFeed() {
  const data = await getFeedList().catch(() => undefined);

  return { data, fetchedAt: Date.now() };
}

export default async function FeedListContent() {
  const { data, fetchedAt } = await fetchInitialFeed();

  return <FeedPage initialData={data} initialDataUpdatedAt={fetchedAt} />;
}
