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
  const isUserProfilePage =
    segments[0] === 'feed' && segments[1] === 'users' && segments.length === 3;

  const backTo = searchParams.get('backTo');
  const safeBackTo = backTo?.startsWith('/feed/users/') ? backTo : '/feed';
  const onBack =
    isFeedDetailPage || isUserProfilePage
      ? () => router.push(isFeedDetailPage ? safeBackTo : '/feed')
      : undefined;

  return (
    <>
      <header>
        <AppBar variant="navigation" title="피드" onBack={onBack} />
      </header>
      {children}
    </>
  );
}
