'use client';

import { useRouter } from 'next/navigation';

import { AppBar } from '@plog/ui';

import { type FeedProfileViewResponse } from '../model/schemas';
import UserFeedSection from './UserFeedSection';
import UserProfileSection from './UserProfileSection';

type UserProfilePageProps = {
  userId: string;
  initialData?: FeedProfileViewResponse;
};

export default function UserProfilePage({
  userId,
  initialData,
}: UserProfilePageProps) {
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
        <UserProfileSection userId={userId} initialData={initialData} />
        <UserFeedSection userId={userId} />
      </div>
    </>
  );
}
