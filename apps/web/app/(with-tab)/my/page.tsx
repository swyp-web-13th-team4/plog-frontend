import { Suspense } from 'react';

import type { Metadata } from 'next';

import { MyPage } from '@/views/my';

export const metadata: Metadata = { title: '마이페이지' };

export default function Page() {
  return (
    <Suspense>
      <MyPage />
    </Suspense>
  );
}
