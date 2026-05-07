'use client';

import { ReactNode } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { AppBar } from '@plog/ui';

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
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar variant="navigation" title="피드" onBack={onBack} />
      </header>
      <div className="pt-[var(--spacing-header)]">{children}</div>
    </>
  );
}
