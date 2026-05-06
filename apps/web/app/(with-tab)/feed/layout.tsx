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
  const isFeedDetailPage =
    pathname.startsWith('/feed/') &&
    pathname.split('/').filter(Boolean).length >= 2;

  return (
    <>
      <header>
        <AppBar
          variant="navigation"
          title="피드"
          onBack={isFeedDetailPage ? () => router.push('/feed') : undefined}
        />
      </header>
      {children}
    </>
  );
}
