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

  const isPlaceSearchPage = pathname.startsWith('/log/place');
  return (
    <>
      <AppBar
        variant="navigation"
        title={isPlaceSearchPage ? '장소 검색' : '환경 기록'}
        onBack={
          isPlaceSearchPage
            ? () => router.push('/log')
            : () => router.push('map')
        }
      />
      {children}
    </>
  );
}
