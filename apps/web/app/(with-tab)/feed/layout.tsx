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
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title="피드"
          onBack={isFeedDetailPage ? () => router.replace('/feed') : undefined}
        />
      </header>
      <div className="pt-[var(--spacing-header)]">{children}</div>
    </>
  );
}
