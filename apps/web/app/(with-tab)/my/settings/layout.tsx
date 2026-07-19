import { type ReactNode } from 'react';

import NavigationHeader from '@/shared/ui/NavigationHeader';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavigationHeader title="설정" />
      {children}
    </>
  );
}
