import type { Metadata } from 'next';

import { FeedPage } from '@/views/feed';

import { getFeedList } from '@/entities/feed/api/server';

export const metadata: Metadata = { title: '피드' };

export default async function Page() {
  const initialData = await getFeedList().catch(() => undefined);
  return <FeedPage initialData={initialData} />;
}
