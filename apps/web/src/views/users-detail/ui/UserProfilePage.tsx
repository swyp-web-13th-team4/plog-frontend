'use client';

import { useRouter } from 'next/navigation';

import { AppBar } from '@plog/ui';

import UserFeedSection from './UserFeedSection';
import UserProfileSection from './UserProfileSection';

export default function UserProfilePage({ userId }: { userId: string }) {
  const router = useRouter();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title="피드"
          onBack={() => router.push('/feed')}
        />
      </header>
      <div className="flex flex-col gap-3 pt-[var(--spacing-header)]">
        <UserProfileSection userId={userId} />
        <UserFeedSection userId={userId} />
      </div>
    </>
  );
}
