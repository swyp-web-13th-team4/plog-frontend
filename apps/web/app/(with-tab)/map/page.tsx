import { Suspense } from 'react';

import { MapPage } from '@/views/map';

export default function Page() {
  return (
    <Suspense>
      <MapPage />
    </Suspense>
  );
}
