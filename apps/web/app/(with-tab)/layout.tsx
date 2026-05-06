import { type ReactNode } from 'react';

import BottomTab from '@/shared/ui/BottomTab';

export default function WithTabLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="pb-bottom-tab">{children}</div>
      <BottomTab />
    </>
  );
}
