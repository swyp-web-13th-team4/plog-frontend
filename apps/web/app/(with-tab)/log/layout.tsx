'use client';

import { ReactNode } from 'react';

import { AppBar } from '@plog/ui';
import { usePathname, useRouter } from 'next/navigation';

export default function CreateFeedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isPlaceSearchPage = pathname.startsWith('/log/place-search');
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title={isPlaceSearchPage ? '장소 검색' : '환경 기록'}
          onBack={
            isPlaceSearchPage
              ? () => router.push('/log')
              : () => router.push('/map')
          }
        />
      </header>
      <div className="pt-[var(--spacing-header)]">{children}</div>
    </>
  );
}
