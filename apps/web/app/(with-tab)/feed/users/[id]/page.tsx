import type { Metadata } from 'next';

import { UserProfilePage } from '@/views/users-detail';

import { feedUserProfileResponseSchema } from '@/entities/feed';

import { serverApi } from '@/shared/api/server-api';

type UserProfilePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const profile = await serverApi.get(
      `/feed/profileView/${encodeURIComponent(id)}`,
      feedUserProfileResponseSchema,
    );
    return { title: `${profile.memberInfo.nickname} 님의 프로필` };
  } catch {
    return { title: '프로필' };
  }
}

export default async function Page({ params }: UserProfilePageProps) {
  const { id } = await params;
  return <UserProfilePage userId={id} />;
}
