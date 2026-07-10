import { type ReactNode } from 'react';

import UserProfileHeader from '@/views/users-detail/ui/UserProfileHeader';

export default function UserProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <UserProfileHeader />
      {children}
    </>
  );
}