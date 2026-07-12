import { getFeedList } from '@/entities/feed/api/server';

import FeedPage from './FeedPage';

export default async function FeedListContent() {
  const initialData = await getFeedList().catch(() => undefined);

  return <FeedPage initialData={initialData} />;
}
