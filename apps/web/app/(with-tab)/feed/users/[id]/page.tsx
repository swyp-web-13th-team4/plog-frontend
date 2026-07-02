import { Suspense } from 'react';

import type { Metadata } from 'next';

import { getUserProfile } from '@/views/users-detail/api/server';
import UserProfileContent from '@/views/users-detail/ui/UserProfileContent';
import UserProfileHeader from '@/views/users-detail/ui/UserProfileHeader';
import UserProfileSkeleton from '@/views/users-detail/ui/UserProfileSkeleton';

type UserProfilePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const profile = await getUserProfile(id);
    return { title: `${profile.memberInfo.nickname} 님의 프로필` };
  } catch {
    return { title: '프로필' };
  }
}

export default async function Page({ params }: UserProfilePageProps) {
  const { id } = await params;

  return (
    <>
      <UserProfileHeader />
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfileContent userId={id} />
      </Suspense>
    </>
  );
}
