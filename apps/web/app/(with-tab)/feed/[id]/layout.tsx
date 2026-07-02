import { type ReactNode } from 'react';

import FeedDetailHeader from '@/views/feed-detail/ui/FeedDetailHeader';

export default function FeedDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <FeedDetailHeader />
      {children}
    </>
  );
}
