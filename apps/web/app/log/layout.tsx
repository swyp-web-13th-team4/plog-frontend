'use client';

import { ReactNode } from 'react';

import { AppBar } from '@plog/ui';
import { useRouter } from 'next/navigation';

export default function CreateFeedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppBar
        variant="navigation"
        title="환경 기록"
        onBack={() => router.push('/map')}
      />
      {children}
    </>
  );
}
