import { type ReactNode } from 'react';

import NavigationHeader from '@/shared/ui/NavigationHeader';

export default function UserProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavigationHeader title="피드" backTo="/feed" />
      {children}
    </>
  );
}
