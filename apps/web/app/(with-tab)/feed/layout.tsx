'use client';

import { ReactNode } from 'react';

import { AppBar } from '@plog/ui';
import { usePathname, useRouter } from 'next/navigation';

type FeedLayoutProps = {
  children: ReactNode;
};
export default function FeedLayout({ children }: FeedLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split('/').filter(Boolean);
  const isFeedDetailPage = segments[0] === 'feed' && segments.length === 2;
  return (
    <>
      <header>
        <AppBar
          variant="navigation"
          title="피드"
          onBack={isFeedDetailPage ? () => router.replace('/feed') : undefined}
        />
      </header>
      {children}
    </>
  );
}
