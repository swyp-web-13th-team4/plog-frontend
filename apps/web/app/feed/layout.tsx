'use client';

import { ReactNode } from 'react';

import { AppBar } from '@plog/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type FeedLayoutProps = {
  children: ReactNode;
};
export default function FeedLayout({ children }: FeedLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const segments = pathname.split('/').filter(Boolean);
  const isFeedDetailPage = segments[0] === 'feed' && segments.length === 2;

  const backTo = searchParams.get('backTo');
  const safeBackTo = backTo?.startsWith('/feed/users/') ? backTo : '/feed';

  return (
    <>
      <header>
        <AppBar
          variant="navigation"
          title="피드"
          onBack={isFeedDetailPage ? () => router.push(safeBackTo) : undefined}
        />
      </header>
      {children}
    </>
  );
}
