import { Suspense } from 'react';

import type { Metadata } from 'next';

import FeedListContent from '@/views/feed/ui/FeedListContent';
import FeedListSkeleton from '@/views/feed/ui/FeedListSkeleton';

export const metadata: Metadata = { title: '피드' };

export default function Page() {
  return (
    <Suspense fallback={<FeedListSkeleton />}>
      <FeedListContent />
    </Suspense>
  );
}
