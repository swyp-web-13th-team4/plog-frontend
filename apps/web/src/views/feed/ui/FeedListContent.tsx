import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getFeedList } from '@/entities/feed/api/server';
import {
  FEED_INITIAL_CURSOR,
  type FeedCursor,
} from '@/entities/feed/lib/feed-page';
import { feedQueryKeys } from '@/entities/feed/model/query-keys';

import { getQueryClient } from '@/shared/lib/query-client';

import FeedPage from './FeedPage';

export default async function FeedListContent() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: feedQueryKeys.all,
    queryFn: ({ pageParam }: { pageParam: FeedCursor }) =>
      getFeedList(pageParam.lastPostId),
    initialPageParam: FEED_INITIAL_CURSOR,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedPage />
    </HydrationBoundary>
  );
}
