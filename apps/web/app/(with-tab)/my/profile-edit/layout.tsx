import { type ReactNode } from 'react';

import NavigationHeader from '@/shared/ui/NavigationHeader';

export default function ProfileEditLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavigationHeader title="프로필 편집" />
      {children}
    </>
  );
}
