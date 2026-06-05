import FeedDetailHeader from '@/views/feed-detail/ui/FeedDetailHeader';
import FeedDetailSkeleton from '@/views/feed-detail/ui/FeedDetailSkeleton';

export default function Loading() {
  return (
    <>
      <FeedDetailHeader />
      <FeedDetailSkeleton />
    </>
  );
}
