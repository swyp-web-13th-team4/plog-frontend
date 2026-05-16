import { Suspense } from 'react';

import type { Metadata } from 'next';

import { MapPage } from '@/views/map';

export const metadata: Metadata = { title: '지도' };

export default function Page() {
  return (
    <Suspense>
      <MapPage />
    </Suspense>
  );
}
